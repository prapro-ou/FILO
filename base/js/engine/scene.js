class Scene extends EventDispatcher {
    // ----------------------------------------------------
    // canvas:    Canvas   ... Target canvas for drawing.
    // name:      string   ... Scene's name.
    // ----------------------------------------------------
    constructor(canvas, name) {
        super();
        this.canvas = canvas;
        this.name   = name;
        this.field  = null;   // field: Field | null
    }

    changeScene(newScene) {
        const e = new Event(newScene);
        this.dispatchEvent('changeScene', e);
    }

    destroy() {
        const e = new Event(this);
        this.dispatchEvent('destroy', e);
    }

    update() {
        this.field.update(this.canvas);
    }
}