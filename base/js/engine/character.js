class Character extends EventDispatcher {
    constructor(sheet, width, height, mapX, mapY, speed, animation) {
        super();
        this.belongScene = null;
        this.belongField = null;
        this.x = this.y = 0;
        this.defaultX = this.defaultY = 0;
        this.mapX = mapX;
        this.mapY = mapY;
        this.vmapX = this.vmapY = 0;
        this.speed = speed;     // A movement amount per a frame. (map space)
        this.direction = 2;     // 0: Up, 1: Right, 2: Down, 3: Left 
        this.animation    = animation;  // The order of animation.
        this.oneAnimeNum  = ~~(1 / (2 * speed));
        this.currentAnime = 0;  // Index of animation.
        this.animeCnt     = 0;
        // this.mapAttrs = [];     // mapAttr: string[] ... Is changed by parent.

        this._sheet  = sheet;
        this._width  = width;
        this._height = height;
        this._moveAmount = 0.5; // Smallest unit ov movement. (map space)
    }

    changeSpeed(speed) {
        const e = new Event(speed);
        this.speed = speed;
        this.oneAnimeNum = ~~(1 / (2 * speed));
        this.dispatchEvent('changeSpeed', e);
    }

    isInDefaultPosX() {
        return this.x === this.defaultX;
    }

    isInDefaultPosY() {
        return this.y === this.defaultY;
    }

    getAttribute(mapX, mapY, fit = false) {
        return this.belongField.getAttribute(mapX, mapY, fit);
    }

    render(canvas) {
        this.x = this.mapX * this._width  + this.belongField.x;
        this.y = this.mapY * this._height + this.belongField.y;
        
        if ((this.x + this._width  < 0 || canvas.width  < this.x) ||
            (this.y + this._height < 0 || canvas.height < this.y))
            return;

        canvas.ctx.drawImage(
            this._sheet,
            this.animation[this.currentAnime] * this._width, this.direction * this._height,
            this._width, this._height,
            this.x, this.y,
            this._width, this._height
        );
    }

    move() {
        if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
            this.vmapX = this.vmapY = 0;
            if (input.isKeyPress('ArrowUp')) {
                this.vmapY -= this.speed;
                // this.currentAnime = (this.currentAnime + 1) % this.animation.length;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (input.isKeyPress('ArrowRight')) {
                this.vmapX += this.speed;
                // this.currentAnime = (this.currentAnime + 1) % this.animation.length;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (input.isKeyPress('ArrowDown')) {
                this.vmapY += this.speed;
                // this.currentAnime = (this.currentAnime + 1) % this.animation.length;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (input.isKeyPress('ArrowLeft')) {
                this.vmapX -= this.speed;
                // this.currentAnime = (this.currentAnime + 1) % this.animation.length;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else {
                this.currentAnime = this.animeCnt = 0;
            }
        } else {
            // this.currentAnime = (this.currentAnime + 1) % this.animation.length;
            this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
        }
        this.mapX += this.vmapX;
        this.mapY += this.vmapY;
    }

    changeDirection() {
        if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
            if      (input.isKeyPress('ArrowUp'))    this.direction = 0;
            else if (input.isKeyPress('ArrowRight')) this.direction = 1;
            else if (input.isKeyPress('ArrowDown'))  this.direction = 2;
            else if (input.isKeyPress('ArrowLeft'))  this.direction = 3;
        }
    }
}

class Player extends Character {
    constructor(sheet, width, height, mapX, mapY, speed, animation) {
        super(sheet, width, height, mapX, mapY, speed, animation);
        this.reachedEdges = new Map();

        this.reachedEdges.set('top',    false);
        this.reachedEdges.set('right',  false);
        this.reachedEdges.set('bottom', false);
        this.reachedEdges.set('left',   false);
    }

    isTopMovable() {
        return (this.reachedEdges.get('top') || this.reachedEdges.get('bottom') && !this.isInDefaultPosY());
    }

    isRightMovable() {
        return (this.reachedEdges.get('right') || this.reachedEdges.get('left') && !this.isInDefaultPosX());
    }

    isBottomMovable() {
        return (this.reachedEdges.get('bottom') || this.reachedEdges.get('top') && !this.isInDefaultPosY());
    }

    isLeftMovable() {
        return (this.reachedEdges.get('left') || this.reachedEdges.get('right') && !this.isInDefaultPosX());
    }

    update(canvas, colligion) {
        if (!this.belongScene.isActive) {
            this.render(canvas);
            return;
        }

        this.changeDirection();
        if (!colligion) this.move();
        console.log(`${this.animeCnt}, ${this.currentAnime}`)
        // Switch the movement to Field
        if (this.isInDefaultPosY()) this.reachedEdges.set('bottom', false);
        if (this.isInDefaultPosX()) this.reachedEdges.set('left',   false);
        if (this.isInDefaultPosY()) this.reachedEdges.set('top',    false);
        if (this.isInDefaultPosX()) this.reachedEdges.set('right',  false);

        if (this.animeCnt === this.animation.length * this.oneAnimeNum) {
            console.log(this.animeCnt, 'a')
            this.animeCnt = 0;
        }

        this.render(canvas);
    }

    // _move() {
    //     if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
    //         this.vmapX = this.vmapY = 0;
    //         const e = new Event(-1);
    //         this.dispatchEvent('move', e);
    //         if (input.isKeyPress('ArrowUp') && input.isLastPressed('ArrowUp')) {
    //             const e = new Event({ mapX: this.mapX, mapY: this.mapY - 1 });
    //             this.dispatchEvent('getAttr', e);
    //             if (!(this.mapAttrs.includes('obstacle') && this.mapY % 1 === 0)) {
    //                 if (!this.isTopMovable()) {
    //                     const e = new Event(0);
    //                     this.dispatchEvent('move', e);
    //                 }
    //                 this.vmapY -= this.speed;
    //                 this.currentAnime = (this.currentAnime + 1) % this.animation.length;
    //             }
    //         } else if (input.isKeyPress('ArrowRight') && input.isLastPressed('ArrowRight')) {
    //             const e = new Event({ mapX: this.mapX + 1, mapY: this.mapY });
    //             this.dispatchEvent('getAttr', e);
    //             if (!(this.mapAttrs.includes('obstacle') && this.mapX % 1 === 0)) {
    //                 if (!this.isTopMovable()) {
    //                     const e = new Event(1);
    //                     this.dispatchEvent('move', e);
    //                 }
    //                 this.vmapX += this.speed;
    //                 this.currentAnime = (this.currentAnime + 1) % this.animation.length;
    //             }
    //         } else if (input.isKeyPress('ArrowDown') && input.isLastPressed('ArrowDown')) {
    //             const e = new Event({ mapX: this.mapX, mapY: this.mapY + 1 });
    //             this.dispatchEvent('getAttr', e);
    //             if (!(this.mapAttrs.includes('obstacle') && this.mapY % 1 === 0)) {
    //                 if (!this.isTopMovable()) {
    //                     const e = new Event(2);
    //                     this.dispatchEvent('move', e);
    //                 }
    //                 this.vmapY += this.speed;
    //                 this.currentAnime = (this.currentAnime + 1) % this.animation.length;
    //             }
    //         } else if (input.isKeyPress('ArrowLeft') && input.isLastPressed('ArrowLeft')) {
    //             const e = new Event({ mapX: this.mapX - 1, mapY: this.mapY });
    //             this.dispatchEvent('getAttr', e);
    //             if (!(this.mapAttrs.includes('obstacle') && this.mapX % 1 === 0)) {
    //                 if (!this.isTopMovable()) {
    //                     const e = new Event(3);
    //                     this.dispatchEvent('move', e);
    //                 }
    //                 this.vmapX -= this.speed;
    //                 this.currentAnime = (this.currentAnime + 1) % this.animation.length;
    //             }
    //         }
    //     } else {
    //         this.currentAnime = (this.currentAnime + 1) % this.animation.length;
    //     }
    //     this.mapX += this.vmapX;
    //     this.mapY += this.vmapY;
    // }
}

class NonPlayer extends Character {
    constructor(sprite, mapX, mapY) {
        super(sprite, mapX, mapY);
        this.isFixed = true;
    }

    // update(canvas) {
    //     this._move(0, input.isKeyPress('ArrowUp'));
    //     this._move(1, input.isKeyPress('ArrowRight'));
    //     this._move(2, input.isKeyPress('ArrowDown'));
    //     this._move(3, input.isKeyPress('ArrowLeft'));

    //     this.render(canvas)
    // }

    // CPUはフィールドとともに移動 + 自分のスピードで移動
}