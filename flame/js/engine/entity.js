class Entity {
    // ----------------------------------------------
    // sprite:     Sprite ... A sprite to be drawn.
    // mapX, mapY: number ... Map space.
    // tags: string[]     ... Informations of entity.
    // ----------------------------------------------
    constructor(sprite, mapX, mapY, tags = []) {
        this.belongField = null;
        this.mapX = mapX;
        this.mapY = mapY;
        this.tags = tags;
        
        this._sprite = sprite;
    }

    hasTag(tag) {
        return this.tags.includes(tag);
    }

    update(canvas) {
        this.render(canvas);
    }

    render(canvas) {
        const x = this.mapX * this._sprite.area.width  + this.belongField.x;
        const y = this.mapY * this._sprite.area.height + this.belongField.y;
        
        if ((x + this._sprite.area.width  < 0 || canvas.width  < x) ||
            (y + this._sprite.area.height < 0 || canvas.height < y))
            return;

        this._sprite.render(canvas, x, y);
    }
}