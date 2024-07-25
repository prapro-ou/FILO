class Text {
    constructor(text, font, size, color, weight) {
        this.x = this.y = 0;
        this.text     = text;
        this.font     = font
        this.size     = size;
        this.color    = color;
        this.weight   = weight;
        this.baseline = 'top'

        this._width  = 0;
        this._height = 0;
        this._isCenter = false;
        this._isMiddle = false;
    }

    center() {
        this._isCenter = true;
        return this;
    }

    middle() {
        this.baseline = 'middle';
        this._isMiddle = true;
        return this;
    }

    update(canvas) {
        if (this._isCenter) this.x = (canvas.width - this._width) / 2;
		if (this._isMiddle) this.y = canvas.height / 2;

        this.render(canvas);
    }

    render(canvas) {
        if ((this.x + this._width  < 0 || canvas.width  < this.x) ||
            (this.y + this._height < 0 || canvas.height < this.y))
            return;
        
        canvas.ctx.font = `${this.weight} ${this.size}px ${this.font}`;
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.textBaseline = this.baseline;

        this._width  = canvas.ctx.measureText(this.text).width;
        this._height = Math.abs(canvas.ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(canvas.ctx.measureText(this.text).actualBoundingBoxDescent);

        canvas.ctx.fillText(this.text, this.x, this.y);
    }
}