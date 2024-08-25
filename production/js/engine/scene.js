class Scene extends EventDispatcher {
    // ----------------------------------------------------
    // canvas:    Canvas   ... Target canvas for drawing.
    // name:      string   ... Scene's name.
    // ----------------------------------------------------
    constructor(canvas, name, bgm = null) {
        super();
        this.canvas = canvas;
        this.name   = name;
        this.bgm = bgm
        if (bgm) bgm.loop = true;
        this.children = null;   // children: Field | View
        this.field = null;
        this.views = [];
        this.subScenes = new Map();
        this.currentSubScene = null;
        this.isActive = true;
        this.modal = null;
    }

    setModal(modal) {
        this.modal = modal;    
        this.canvas.set(this.modal.content);   
    }

    setField(field) {
        field.belongScene = this;
        field.player.belongScene = this;
        field.characters.forEach((character) => {
            character.belongScene = this;
        });
        this.field = field;
    }

    setView(view) {
        this.views.push(view);
    }

    changeScene(newScene) {
        const e = new Event(newScene);
        if (this.bgm) this.bgm.pause();
        this.dispatchEvent('changeScene', e);
    }

    stackScene(subScene) {
        const savedSubScene = this.subScenes.get(subScene.name);
        if (this.bgm) this.bgm.pause();
        if (savedSubScene === undefined) {
            subScene.addEventListener('changeScene', (e) => {
                this.stackScene(e.target);
            });
            subScene.addEventListener('destroy', (e) => {
                this.subScenes.delete(e.target.name);
                e.target.modal.destroy();
            });
            subScene.addEventListener('close', (e) => {
                e.target.modal.close();
                this.isActive = true;
                this.currentSubScene = null;
            });
            this.subScenes.set(subScene.name, subScene);
            this.currentSubScene = subScene;
            subScene.open();
        } else {
            subScene.modal.destroy();
            this.currentSubScene = savedSubScene;
            savedSubScene.open();
        }

        this.isActive = false;
    }

    open() {
        if (this.modal === null) return;
        this.modal.open();
    }

    close() {
        if (this.modal === null) return;
        const e = new Event(this);
        if (this.bgm) this.bgm.pause();
        this.dispatchEvent('close', e);
    }

    destroy() {
        const e = new Event(this);
        if (this.bgm) this.bgm.pause();
        this.dispatchEvent('destroy', e);
    }

    update() {
        if (this.field) this.field.update(this.canvas);
        this.views.forEach((view) => view.update(this.canvas))
        if (this.currentSubScene) this.currentSubScene.update();

        return this.isActive;
    }
}

class SubScene extends Scene {
    constructor(canvas, name) {
        super(canvas, name);
        this.modal = new Modal();
        this.canvas.set(this.modal.content);
    }
}
