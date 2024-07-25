class Cat extends Player {
    constructor(mapX, mapY) {
        super(
            assets.get('cat'),
            32, 32, 
            mapX, mapY,
            NORMAL,
            [1, 0, 1, 2]
        );
    }
}

class TitleScene extends Scene {
    constructor(canvas) {
        super(canvas, 'Title');

        const view = new View('#eeeeee', canvas); 

        const titleText = new Text('シミュレーションゲーム', F_TITLE, 30, '#000', 'bold');    
        titleText.center();
        titleText.y = 100
        view.add(titleText);

        const optionText = [
            new Text('START', F_TITLE, 20, '#000', 'normal'),
            new Text('HELP',  F_TITLE, 20, '#000', 'normal')
        ];
        for (let i = 0; i < optionText.length; i++) {
            optionText[i].center();
            optionText[i].y = (i + 1) * 50 + 120;
            view.add(optionText[i]);
        }
        
        this.setView(view);
    }

    update() {
        if (!super.update()) return;

        if(input.isKeyDown(' ')) {
            const mainScene = new StreetScene(this.canvas);
            this.changeScene(mainScene);
            this.destroy();
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

        field.setPlayer(player);
        this.setField(field);
    }

    update() {
        if (!super.update()) return;

        const field  = this.children;
        const player = field.player;

        if (input.isKeyDown(' ')) {
            const mainScene = new MainScene(this.canvas);
            this.changeScene(mainScene);
        }
        if (field.getAttribute(player.mapX, player.mapY, true).includes('warpToMain')) {
            const mainScene = new MainScene(this.canvas);
            this.changeScene(mainScene);
            player.mapX -= 0.5;
            player.direction = 3;
        }
        if (input.isKeyDown('Enter')) {
            player.changeSpeed(FAST);
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

        const tableLeft  = new Sprite(assets.get('woods'), new Rectangle(0, 0, 32, 32));
        const tableRight = new Sprite(assets.get('woods'), new Rectangle(0, 32, 32, 32));
        for (let i = 5; i < 10; i++) {
            field.addEntity(new Entity(tableLeft, i, 7, ['table']));
        }
        field.addEntity(new Entity(tableRight, 10, 7, ['table']));
        
        const player = new Cat(8, 5);
        field.setPlayer(player);

        this.setField(field);
    }

    update() {
        if (!super.update()) return;

        const field  = this.children;
        const player = field.player;

        if(input.isKeyDown(' ')) {
            const mainScene = new TitleScene(this.canvas);
            this.changeScene(mainScene);
        }

        const [disMapX, disMapY] = getDisplacementByDir(player.direction);
        const isRefrigerator = field.getAttribute(player.mapX + disMapX, player.mapY + disMapY).includes('refrigerator');
        if (isRefrigerator && input.isKeyDown('Enter')) {
            const subCanvas = new Canvas(CAN_WIDTH, CAN_HEIGHT, 'subCanvas');
            const refrigerator = new Refrigerator(subCanvas);
            this.stackScene(refrigerator);
        }
    }
}

class Refrigerator extends Scene {
    constructor(canvas) {
        super(canvas, 'Refrigerator', true);

        const view = new View('#dc143c', canvas);

        const titleText = new Text('冷蔵庫', F_TITLE, 30, '#000', 'bold');    
        titleText.center();
        titleText.y = 50;
        view.add(titleText);

        this.setView(view);
    }

    update() {
        if (!super.update()) return;

        if(input.isKeyDown('Shift')) {
            this.close();
            this.destroy();
        }
    }
}

window.onload = async () => {
    // Load images
    assets.addImage('tile',   './img/tile.png');
    assets.addImage('woods',   './img/woods.png');
    assets.addImage('cat', './img/cat.png');
    await assets.loadAllAssets();

    const mainCanvas = new Canvas(CAN_WIDTH, CAN_HEIGHT, 'mainCanvas');
    mainCanvas.set(document.body);
    
    const game = new Game();
    const scene = new TitleScene(mainCanvas);
    
    game.changeScene(scene);
    game.start();
}