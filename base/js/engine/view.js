class View {
    constructor(bgColor, canvas) {
        this.belongScene = null;
        this.children    = [];
        
        this._bgColor   = bgColor;
        this._canWidth  = canvas.width;
        this._canHeight = canvas.height;
    }

    add(child) {
        this.children.push(child);
    }

    update(canvas) {
        this.render(canvas);
        this.children.forEach((child) => {
            child.update(canvas);
        });
    }

    render(canvas) {
        if(this._bgColor === null) return;
        canvas.ctx.fillStyle = this._bgColor;
        canvas.ctx.fillRect(
            0, 0,
            this._canWidth, this._canHeight
        );
    }
}