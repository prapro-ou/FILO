class Character extends EventDispatcher {
    constructor(sheet, width, height, mapX, mapY, speed, animation) {
        super();
        this.belongScene = null;
        this.belongField = null;
        this.x = this.y = 0;
        this.mapX = mapX;
        this.mapY = mapY;
        this.vmapX = this.vmapY = 0;
        this.speed = speed;     // A movement amount per a frame. (map space)
        this.direction = 2;     // 0: Up, 1: Right, 2: Down, 3: Left 
        this.animation    = animation;  // The order of animation.
        this.oneAnimeNum  = ~~(1 / (2 * speed));
        this.currentAnime = 0;  // Index of animation.
        this.animeCnt     = 0;

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

    getAttribute(mapX, mapY, fit = false) {
        return this.belongField.getAttribute(mapX, mapY, fit);
    }

    changeDirection() {}

    render() {}

    update() {}

    move() {}
}

class Player extends Character {
    constructor(sheet, width, height, mapX, mapY, speed, animation) {
        super(sheet, width, height, mapX, mapY, speed, animation);
        this.defaultX = this.defaultY = 0;
        this.reachedEdges = new Map();

        this.reachedEdges.set('top',    false);
        this.reachedEdges.set('right',  false);
        this.reachedEdges.set('bottom', false);
        this.reachedEdges.set('left',   false);
    }

    isTopMovable() {
        return (this.reachedEdges.get('top') || this.reachedEdges.get('bottom') && !this._isInDefaultPosY());
    }

    isRightMovable() {
        return (this.reachedEdges.get('right') || this.reachedEdges.get('left') && !this._isInDefaultPosX());
    }

    isBottomMovable() {
        return (this.reachedEdges.get('bottom') || this.reachedEdges.get('top') && !this._isInDefaultPosY());
    }

    isLeftMovable() {
        return (this.reachedEdges.get('left') || this.reachedEdges.get('right') && !this._isInDefaultPosX());
    }

    changeDirection() {
        if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
            if      (input.isKeyPress('ArrowUp'))    this.direction = 0;
            else if (input.isKeyPress('ArrowRight')) this.direction = 1;
            else if (input.isKeyPress('ArrowDown'))  this.direction = 2;
            else if (input.isKeyPress('ArrowLeft'))  this.direction = 3;
        }
    }

    move() {
        if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
            this.vmapX = this.vmapY = 0;
            if (input.isKeyPress('ArrowUp')) {
                this.vmapY -= this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (input.isKeyPress('ArrowRight')) {
                this.vmapX += this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (input.isKeyPress('ArrowDown')) {
                this.vmapY += this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (input.isKeyPress('ArrowLeft')) {
                this.vmapX -= this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else {
                this.currentAnime = this.animeCnt = 0;
            }
        } else {
            this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
        }
        this.mapX += this.vmapX;
        this.mapY += this.vmapY;
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

    update(canvas, colligion) {
        if (!this.belongScene.isActive) {
            this.render(canvas);
            return;
        }

        this.changeDirection();
        if (!colligion) this.move();
        // console.log(`${this.animeCnt}, ${this.currentAnime}`)
        // Switch the movement to Field
        if (this._isInDefaultPosY()) this.reachedEdges.set('bottom', false);
        if (this._isInDefaultPosX()) this.reachedEdges.set('left',   false);
        if (this._isInDefaultPosY()) this.reachedEdges.set('top',    false);
        if (this._isInDefaultPosX()) this.reachedEdges.set('right',  false);

        if (this.animeCnt === this.animation.length * this.oneAnimeNum) {
            this.animeCnt = 0;
        }

        this.render(canvas);
    }

    _isInDefaultPosX() {
        return this.x === this.defaultX;
    }

    _isInDefaultPosY() {
        return this.y === this.defaultY;
    }
}

class NonPlayer extends Character {
    constructor(sheet, width, height, mapX, mapY, speed, animation) {
        super(sheet, width, height, mapX, mapY, speed, animation);
        this.route = [];
    }

    addDirection(direction) {
        this.route.push(direction); 
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

    update(canvas, colligion) {
        if (!this.belongScene.isActive) {
            this.render(canvas);
            return;
        }

        this.changeDirection();
        if (!colligion) this.move();

        if (this.animeCnt === this.animation.length * this.oneAnimeNum) {
            this.animeCnt = 0;
        }

        this.render(canvas);
    }

    changeDirection() {
        if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
            const direction = this.route[0];
            if      (direction === 0) this.direction = 0;
            else if (direction === 1) this.direction = 1;
            else if (direction === 2)  this.direction = 2;
            else if (direction === 3)  this.direction = 3;
        }
    }

    move() {
        if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
            this.vmapX = this.vmapY = 0;
            const direction = this.route[0];
            this.route.shift();
            if (direction === 0) {
                this.vmapY -= this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (direction === 1) {
                this.vmapX += this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (direction === 2) {
                this.vmapY += this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else if (direction === 3) {
                this.vmapX -= this.speed;
                this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
            } else {
                this.currentAnime = this.animeCnt = 0;
            }
        } else {
            this.currentAnime = ~~(this.animeCnt++ / this.oneAnimeNum);
        }
        this.mapX += this.vmapX;
        this.mapY += this.vmapY;
    }
}