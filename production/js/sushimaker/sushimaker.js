class Sushimaker {
    constructor(neta, dropSpeed, gameSpeed, bgColor = '#b8860b') {
        this.width = 40;
        this.height = 23;
        this.blockSize = 15;
        this.canvas = new Canvas(this.blockSize * this.width, this.blockSize * this.height, null, 'can');
        this.field = [];
        this.tetro = [];
        this.tetroX = 0;
        this.tetroY = 0;
        this.tetroSize = 4
        this.bgColor = bgColor;
        this.dropSpeed = dropSpeed;
        this.gameSpeed = gameSpeed;
        this.direction = 1; // 1:右, 0:停止，-1:左
        this.isDropping = false;
        this.clear = false;
        this.neta = neta
        this.blockImages = [];
        this.sushiRiceImg = [];
        this.slideTimerId = null;
        this.dropTimerId  = null;

        for (let i = 0; i < this.height; i++) this.field.push(Array(this.width).fill(0));
    }

    setRice(x) {
        for (let i = 0; i < 4; i++) {
            this.field[this.height - 2][x + i] = i + 1;
            this.field[this.height - 1][x + i] = i + 5;
        }
    }

    setBaran(x, y) {
        this.field[y][x] = 9;
    }

    initImg() {
        for (let i = 1; i <= 8; i++) this.sushiRiceImg.push(assets.get(`shari${i}`));
        this.sushiRiceImg.push(assets.get('baran'));
    }

    start() {
        this._init();
        this.slideTimerId = setInterval(() => this._slideTetro(), this.gameSpeed);
    }

    update() {
        if (input.isKeyDown('Enter') && !this.isDropping) {
            clearInterval(this.slideTimerId);
            this.isDropping = true;
            this.dropTimerId = setInterval(() => this._dropTetro(), this.dropSpeed);
            assets.get('drop').play();
        }
        if (input.isKeyDown('ArrowRight') && !this._isColigion(1, 0)) {
            this.tetroX++;
            this._drawAll();
        }
        if (input.isKeyDown('ArrowLeft') && !this._isColigion(-1, 0)) {
            this.tetroX--;
            this._drawAll();
        }
    }

    _init() {
        // for (let i = 0; i < this.height; i++) this.field.push(Array(this.width).fill(0));
        this.tetro = [
            [0, 0, 0, 0],
            [1, 2, 3, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.tetroX = 0;
        this.tetroY = 0;
        this.isDropping = false;
        this.direction = 1;
    }

    _drawBlock(x, y) {
        let px = x * this.blockSize;
        let py = y * this.blockSize;
        if (1 <= this.field[y][x] && this.field[y][x] <= 9) {
            this.canvas.ctx.drawImage(this.sushiRiceImg[this.field[y][x] - 1], px, py, this.blockSize, this.blockSize);
        }
    }

    _drawAll() {
        this.canvas.ctx.fillStyle = this.bgColor;
        this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this._drawBlock(x, y, 0);
            }
        }
        
        for (let y = 0; y < this.tetroSize; y++) {
            for (let x = 0; x < this.tetroSize; x++) {
                const imageIndex = this.tetro[y][x] - 1;
                if (imageIndex >= 0 && imageIndex < this.blockImages.length) {
                    this.canvas.ctx.drawImage(
                        this.blockImages[imageIndex],
                        (this.tetroX + x) * this.blockSize, (this.tetroY + y) * this.blockSize,
                        this.blockSize, this.blockSize
                    );
                }
            }
        }
    }

    _drawSushi() {
        this.canvas.ctx.drawImage(
            assets.get(this.neta),
            (this.blockSize*this.width)/2-35, (this.blockSize*this.height)/2-15,
            this.blockSize*3, this.blockSize*3
        );
        assets.get('cheer').play();
    }

    _isColigion(mx, my) {
        for (let y = 0; y < this.tetroSize; y++) {
            for (let x = 0; x < this.tetroSize; x++) {
                if (this.tetro[y][x]) {
                    let nx = this.tetroX + mx + x;
                    let ny = this.tetroY + my + y;
                    if (ny < 0 || nx < 0 || ny >= this.height || nx >= this.width || this.field[ny][nx]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    _clearTetro() {
        this.tetro = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        // this._drawAll();
        
        this._init();
    }

    _slideTetro() {
        if (this._isColigion(this.direction, 0)){
            this.direction = -this.direction;
        }
        this.tetroX += this.direction;
        this._drawAll();    
    }

    _dropTetro() { 
        this.direction = 0;
        if (!this._isColigion(0, 0)){
            this.tetroY++;
            this._drawAll();
        } else {
            clearInterval(this.dropTimerId);
            if (this.tetroY === this.height - 3) {
                setTimeout(() => this._drawSushi(), 1000);
                setTimeout(() => this.clear = true, 3000);
            } else {
                assets.get('crash').play();
                setTimeout(() => this.start(), 1000);
            }
            this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            // clearInterval(this.dropTimerId);
            // this._init();
        }       
    }
}
