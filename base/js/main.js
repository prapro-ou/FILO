// class Refrigerator extends 

class TitleScene extends Scene {
    constructor(canvas) {
        super(canvas, 'Title');

        const field = new Field(fieldData.ex2, canvas, assets.get('tile'));
        field.setAttributeBySprite(0, 'obstacle');
        field.shiftX(-4);
        field.shiftY(-2);
        
        const player = new Player(
            assets.get('cat'),
            32, 32, 
            8, 5,
            FAST
        );
        player.animation = [1, 0, 1, 2];
        field.setPlayer(player);

        this.field = field;
    }

    update() {
        super.update();
        if(input.isKeyDown(' ')) {
            const mainScene = new StreetScene(this.canvas);
            this.changeScene(mainScene);
            this.destroy();
        }
    }
}

class Cat extends Player {
    constructor(mapX, mapY) {
        super(
            assets.get('cat'),
            32, 32, 
            mapX, mapY,
            SLOW
        );
    }

    update(canvas, colligion) {
        super.update(canvas, colligion);

        // Change scene
        this.getAttribute(this.mapX, this.mapY, true);
        const warpToMain = this.mapAttrs.includes('warpToMain');
        if (warpToMain) {
            this.dispatchEvent('warpToMain');
            this.mapX -= 0.5;
            this.direction = 3;
        }

        // Open refrigerator
        const [disMapX, disMapY] = getDisplacementByDir(this.direction);
        this.getAttribute(this.mapX + disMapX, this.mapY + disMapY);
        const refrigerator = this.mapAttrs.includes('refrigerator');
        if (refrigerator && input.isKeyDown('Enter')) {
            // Refrigeratorインスタンスを作成し，Scene遷移
            console.log('Open refrigerator.')
        }
    }
}

class StreetScene extends Scene {
    constructor(canvas) {
        super(canvas, 'Street scene');

        const field = new Field(fieldData.street, canvas, assets.get('tile'));
        field.setAttributeBySprite(4, 'obstacle');
        field.setAttribute(15, 3, 'warpToMain');
        field.shiftX(-2.5);

        const player = new Cat(12, 2);
        player.animation = [1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2];
        player.addEventListener('warpToMain', () => {
            const mainScene = new MainScene(this.canvas);
            this.changeScene(mainScene);
        });
        field.setPlayer(player);

        this.field = field;
    }

    update() {
        super.update();
        if(input.isKeyDown(' ')) {
            const mainScene = new MainScene(this.canvas);
            this.changeScene(mainScene);
        }
        if(input.isKeyDown('Enter')) {
            this.field.player.changeSpeed(FAST);
        }
    }
}

class MainScene extends Scene {
    constructor(canvas) {
        super(canvas, 'Main scene');

        const field = new Field(fieldData.ex1, canvas, assets.get('tile'));
        field.setAttributeBySprite(0, 'obstacle');
        field.setAttributeBySprite(3, 'obstacle');
        field.setAttributeBySprite(3, 'refrigerator');
        field.shiftX(-4);
        field.shiftY(-2);

        // const tableLeft  = new Sprite(assets.get('woods'), new Rectangle(0, 0, 32, 32));
        // const tableRight = new Sprite(assets.get('woods'), new Rectangle(0, 32, 32, 32));
        // for (let i = 5; i < 10; i++) {
        //     field.add(new Furniture(tableLeft, i, 7));
        // }
        // field.add(new Furniture(tableRight, 10, 7));

        // const cat = new Sprite(assets.get('cat'), new Rectangle(0, 0, 32, 32));
        // const player = new Player(cat, 8, 5);
        const player = new Cat(8, 5);
        player.animation = [1, 0, 1, 2];
        field.setPlayer(player);

        this.field = field;
    }

    update() {
        super.update();
        if(input.isKeyDown(' ')) {
            const mainScene = new TitleScene(this.canvas);
            this.changeScene(mainScene);
        }
    }
}

window.onload = async () => {
    // const can = document.getElementById('can');
    const mainCanvas = new Canvas(CAN_WIDTH, CAN_HEIGHT, 'mainCanvas');

    // Load images
    assets.addImage('tile',   './img/tile.png');
    assets.addImage('woods',   './img/woods.png');
    assets.addImage('cat', './img/cat.png');
    await assets.loadAllAssets();

    const game  = new Game();
    const scene = new TitleScene(mainCanvas);
    
    game.changeScene(scene);
    game.start();
}