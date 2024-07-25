class Scene extends EventDispatcher {
    // ----------------------------------------------------
    // canvas:    Canvas   ... Target canvas for drawing.
    // name:      string   ... Scene's name.
    // ----------------------------------------------------
    constructor(canvas, name, isSub = false) {
        super();
        this.canvas = canvas;
        this.name   = name;
        this.children = null;   // children: Field | OptionalView

        this.subScenes = new Map();
        this.currentSubScene = null;
        this.isActive = true;
        this.modal = null;

        if (isSub) {
            this.modal = new Modal();
            this.canvas.set(this.modal.content);
        }
    }

    setField(field) {
        this.children = field;
        this.children.belongScene = this;
        this.children.player.belongScene = this;
    }

    setView(view) {
        this.children = view;
        // this.children.belongScene = this;
    }

    changeScene(newScene) {
        const e = new Event(newScene);
        this.dispatchEvent('changeScene', e);
    }

    stackScene(subScene) {
        const savedSubScene = this.subScenes.get(subScene.name);
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
console.log(this.name)
        const e = new Event(this);
        this.dispatchEvent('close', e);
    }

    destroy() {
        const e = new Event(this);
        this.dispatchEvent('destroy', e);
    }

    update() {
        // console.log(`${this.name}: ${this.isActive}`)
        // console.log(this.subScenes)
        this.children.update(this.canvas);
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