class View {
    constructor(canvas) {
        this.belongScene = null;
        this.children    = [];
        
        this._bgColor   = null;
        this._bgImg     = null;
        this._canWidth  = canvas.width;
        this._canHeight = canvas.height;
    }

    add(child) {
        this.children.push(child);
    }

    setBgColor(bgColor) {
        this._bgColor = bgColor;
    }

    setBgImg(img, width, height) {
        this._bgImg = { src: img, width: width, height: height };
    }

    update(canvas) {
        this.render(canvas);
        this.children.forEach((child) => {
            child.update(canvas);
        });
    }

    render(canvas) {
        if (this._bgColor) {
            canvas.ctx.fillStyle = this._bgColor;
            canvas.ctx.fillRect(
                0, 0,
                this._canWidth, this._canHeight
            );
        }
        if (this._bgImg) {
            canvas.ctx.drawImage(
                this._bgImg.src,
                0, 0,
                this._bgImg.width, this._bgImg.height,
                0, 0,
                this._bgImg.width, this._bgImg.height
            );
        }
    }
}