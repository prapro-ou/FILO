class Field {
    // --------------------------------------------------------
    // field:     number[]     ... Array of Map data.
    // canvas:    Canvas       ... Target canvas for drawing.
    // sheet:     Image        ... Sprite sheet of field image.
    // pieceSize: number       ... Size of a piece of sprite.
    // --------------------------------------------------------
    constructor(fieldData, canvas, sheet, pieceSize = 32) {
        this.belongScene = null;
        this.x = this.y = 0;    // Origin of field.(canvas space)
        this.vx = this.vy = 0;
        this.player     = null; // player:     Player
        this.characters = [];   // characters: NonPlayer[]
        this.entities   = [];   // entities: Entity[]       

        this._data       = fieldData.map(row => row.map(snum => [snum, []]));
        this._width      = fieldData[0].length * pieceSize;
        this._height     = fieldData.length * pieceSize;
        this._canWidth   = canvas.width;
        this._canHeight  = canvas.height;
        this._sheet      = sheet;
        this._pieceSize  = pieceSize;
        this._moveAmount = pieceSize / 2;   // Smallest unit ov movement. (canvas space)
        this._speed      = 0;   // A movement amount per a frame. (canvas space)
    }

    setPlayer(player) {
        player.belongField = this;
        player.x = this._map2canvas(player.mapX, this.x);
        player.y = this._map2canvas(player.mapY, this.y);
        player.defaultX = player.x;
        player.defaultY = player.y;
        player.addEventListener('changeSpeed', (e) => {
            this._setSpeed(e.target);
        });
        // this.player.addEventListener('move', (e) => {
        //     this._move(e.target);
        // });
        this.player = player;

        this._setSpeed(this.player.speed);
    }

    addEntity(entity) {
        entity.belongField = this;
        this.entities.push(entity);

        this.setAttribute(entity.mapX, entity.mapY, 'obstacle');
    }

    setAttribute(mapX, mapY, attr) {
        this._data[mapY][mapX][1].push(attr);
    }

    setAttributeBySprite(spriteNum, attr) {
        for (let mapY = 0; mapY < this._data.length; mapY++) {
            for (let mapX = 0; mapX < this._data[mapY].length; mapX++) {
                if (this._data[mapY][mapX][0] === spriteNum)  {
                    this._data[mapY][mapX][1].push(attr);
                }
            }
        }
    }

    getAttribute(mapX, mapY, fit = false) {
        if (mapY < 0 || mapY >= this._data.length ||
            mapX < 0 || mapX >= this._data[0].length)
            return [];

        if (fit) {
            return (mapX % 1 === 0 && mapY % 1 === 0) ? this._data[mapY][mapX][1] : [];
        } else {
            const mapX1 = Math.floor(mapX);
            const mapY1 = Math.floor(mapY);
            const mapX2 = Math.ceil(mapX);
            const mapY2 = Math.ceil(mapY);
            const attrs1 = this._data[mapY1][mapX1][1];
            const attrs2 = this._data[mapY2][mapX2][1];
            return Array.from(new Set([...attrs1, ...attrs2]));
        }
    }

    update(canvas) {
        if (!this.belongScene.isActive) {
            this.render(canvas);
            this.player.update(canvas, false);
            return;
        }

        const colligion = this._colligionDetect();

        if (!colligion) this._move();
        this.render(canvas);

        // Switch the movement to Player
        this.player.reachedEdges.set('top',    this._isReachedTopEdge());
        this.player.reachedEdges.set('right',  this._isReachedRightEdge());
        this.player.reachedEdges.set('bottom', this._isReachedBottomEdge());
        this.player.reachedEdges.set('left',   this._isReachedLeftEdge());
        
        this.entities.forEach((entity) => {
            entity.update(canvas);
        });

        // this.player.setFieldOrigin(this.x, this.y);
        this.player.update(canvas, colligion);
    }

    render(canvas) {
        for (let mapY = 0; mapY < this._data.length; mapY++) {
            const y = this._map2canvas(mapY, this.y);
            // A piece is not drawn, if it stick out from canvas.
            if (y + this._pieceSize < 0 || canvas.height < y) continue;

            for (let mapX = 0; mapX < this._data[mapY].length; mapX++) {
                const x = this._map2canvas(mapX, this.x);
                if (x + this._pieceSize < 0 || canvas.width < x) continue;
                
                const [chipX, chipY] = this._calcSpriteChipCoord(this._data[mapY][mapX][0]);
                canvas.ctx.drawImage(
                    this._sheet,
                    this._pieceSize * chipX, this._pieceSize * chipY,
                    this._pieceSize, this._pieceSize,
                    x, y,
                    this._pieceSize, this._pieceSize
                );
            }
        }
    }

    // -----------------------------------------------------
    // grid: number ... It shows how many grid are shifted.
    // -----------------------------------------------------
    shiftX(grid) {
        const shiftAmount = grid * this._pieceSize;
        const newX = this.x + shiftAmount;
        if (shiftAmount % this._moveAmount !== 0 || newX > 0) return;

        this.x = newX;        
    }

    shiftY(grid) {
        const shiftAmount = grid * this._pieceSize;
        const newY = this.y + shiftAmount;
        if (shiftAmount % this._moveAmount !== 0 || newY > 0) return;

        this.y = newY;        
    }

    _move() {
        // Start movement
        if (this.x % this._moveAmount === 0 && this.y % this._moveAmount === 0) {
            this.vx = this.vy = 0;
            if (input.isKeyPress('ArrowUp') && !this._isReachedTopEdge()) {
                this.vy += this._speed;
            } else if (input.isKeyPress('ArrowRight') && !this._isReachedRightEdge()) { 
                this.vx -= this._speed;
            } else if (input.isKeyPress('ArrowDown')  && !this._isReachedBottomEdge()) {
                this.vy -= this._speed;
            } else if (input.isKeyPress('ArrowLeft')  && !this._isReachedLeftEdge()) {
                this.vx += this._speed;
            }
        }

        // Movement by player
        if (this.player.isTopMovable() || this.player.isBottomMovable()) {
            this.vy = 0;
        }
        if (this.player.isRightMovable() || this.player.isLeftMovable()) {
            this.vx = 0;
        }
        
        this.x += this.vx;
        this.y += this.vy;
    }

    // _move(direction) {
    //     if (direction === 0) {
    //         this.vy += this._speed;
    //     } else if (direction=== 1) {
    //         this.vx -= this._speed;
    //     } else if (direction=== 2) {
    //         this.vy -= this._speed;
    //     } else if (direction=== 3) {
    //         this.vx += this._speed;
    //     } else {
    //         this.vx = this.vy = 0;
    //     }
        
    //     this.x += this.vx;
    //     this.y += this.vy;
    // }

    _isReachedTopEdge() {
        return this.y === 0;
    }

    _isReachedBottomEdge() {
        return this.y === this._canHeight - this._height;
    }

    _isReachedRightEdge() {
        return this.x === this._canWidth - this._width;
    }

    _isReachedLeftEdge() {
        return this.x === 0;
    }

    _isObstacle(mapX, mapY) {
        if (mapY < 0 || mapY >= this._data.length ||
            mapX < 0 || mapX >= this._data[0].length)
            return false;

        const mapX1 = Math.floor(mapX);
        const mapY1 = Math.floor(mapY);
        const mapX2 = Math.ceil(mapX);
        const mapY2 = Math.ceil(mapY);
        const attrs1 = this._data[mapY1][mapX1][1];
        const attrs2 = this._data[mapY2][mapX2][1];
        
        return attrs1.includes('obstacle') || attrs2.includes('obstacle');
    }

    _colligionDetect() {
        const mapX = this.player.mapX;
        const mapY = this.player.mapY;
        if (mapX % 1 === 0) {
            if (input.isKeyPress('ArrowRight') && this._isObstacle(mapX + 1, mapY) ||
                input.isKeyPress('ArrowLeft')  && this._isObstacle(mapX - 1, mapY))
                return true;
        }
        if (mapY % 1 === 0) {
            if (input.isKeyPress('ArrowUp')   && this._isObstacle(mapX, mapY - 1) ||
                input.isKeyPress('ArrowDown') && this._isObstacle(mapX, mapY + 1))
                return true;
        }

        return false;
    }

    _setSpeed(playerSpeed) {
        this._speed = playerSpeed * this._pieceSize;
    }

    // ---------------------------------------------------------
    // Calc a coordinate in canvas space.
    // mapCoord:    number ... Coordinates in map's space.
    // fieldOrigin: number ... Origin of field.(canvas's space)
    // ---------------------------------------------------------
    _map2canvas(mapCoord, fieldOrigin) {
        return mapCoord * this._pieceSize + fieldOrigin;
    }    

    // -----------------------------------------------------
    // Calc a coordinate in sprite-chip space.
    // chipNum: number ... Sprite-chip's continuous number.
    // -----------------------------------------------------
    _calcSpriteChipCoord(chipNum) {
        const t = this._sheet.width / this._pieceSize;
        const chipX = chipNum % t;
        const chipY = ~~(chipNum / t);

        return [chipX, chipY];
    }
}