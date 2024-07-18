class Furniture extends Entity {
    constructor(sprite, mapX, mapY) {
        super(sprite, mapX, mapY);
        this.isFixed = true;
    }
}