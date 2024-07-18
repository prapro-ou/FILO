class Entity {
    // ----------------------------------------------
    // sprite:     Sprite ... A sprite to be drawn.
    // mapX, mapY: number ... Map space.
    // tags: string[]     ... Informations of entity.
    // ----------------------------------------------
    constructor(sprite, mapX, mapY, tags = []) {
        this.mapX = mapX;
        this.mapY = mapY;
        this.tags = tags;
        
        this.fieldOriginX = this.fieldOriginY = 0;  // Canvas space.
        
        this._sprite = sprite;
    }

    setFieldOrigin(x, y) {
        this.fieldOriginX = x;
        this.fieldOriginY = y;
    }

    hasTag(tagName) {
        return this.tags.includes(tagName);
    }    

    update(canvas) {
        this.render(canvas);
    }

    render(canvas) {
        const x = this.mapX * this._sprite.area.width  + this.fieldOriginX;
        const y = this.mapY * this._sprite.area.height + this.fieldOriginY;
        
        if ((x + this._sprite.area.width  < 0 || canvas.width  < x) ||
            (y + this._sprite.area.height < 0 || canvas.height < y))
            return;

        this._sprite.render(canvas, x, y);
    }
}