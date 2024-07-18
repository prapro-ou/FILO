class Sprite {
    // -------------------------------------------------------
    // sheet: Image     ... Sprite sheet.
    // area:  Rectangle ... It shows the area of a sprite.
    // -------------------------------------------------------
    constructor(sheet, area) {
        this._sheet = sheet;
        this.area  = area;
    }

    // -------------------------------
    // Draw myself at (x, y).
    // x, y: number ... Canvas space.
    // -------------------------------
    render(canvas, x, y) {
        canvas.ctx.drawImage(
            this._sheet,
            this.area.x, this.area.y,
            this.area.width, this.area.height,
            x, y,
            this.area.width, this.area.height,
        );
    }
}