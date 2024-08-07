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
        field.setAttributeBySprite(6, 'plate');
        field.setAttributeBySprite(7, 'dish');
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
            const subCanvas = new Canvas(CAN_WIDTH, CAN_HEIGHT, 'gameContainer');
            const refrigerator = new Refrigerator(subCanvas);
            this.stackScene(refrigerator);
        }
    }
}

class Refrigerator extends Scene {
    constructor(canvas) {
        /*const kari = new kari();*/
        super(canvas, 'Refrigerator');
        const kari = new Kari();
        kari.create();
        this.setModal(kari);
        
        // クラスがKariなら<canvas width="640" height="320" class="gameContainer"></canvas>を消す
        if (kari.constructor.name === 'Kari') {
            const gameContainer = document.querySelector('canvas.gameContainer');
            if (gameContainer) {
                gameContainer.remove();
            }
        }
        
        const view = new View(null, canvas);

        console.log('open');
        //const commandbattle = new CommandBattle();
        // キャラクターをインスタンス化する
            this.hero = new Hero("シェフ", 200, 50, 20, 3, 30, "../img/chef.png"  );  // 主人公

            this.enemy  = new Fish("さかな", 100, 40, 10,       "../img/sakana.png");  // まぐろ

            //this.enemy = new Meat("うし"  , 100, 40, 10,       "../img/usi.png"   );  // うし

            this.item  = new Item("まぐろ", "../img/maguro.png");      // まぐろ刺身

            //this.item2 = new Item("牛肉"  , "../img/gyuniku.png");     // 牛肉

            // キャラクター配列をつくる
            this.characters = [
                this.hero,     // 主人公
                this.enemy     // 敵
            ];

            this.hero.characters = this.characters;
            console.log(this.hero.characters);
            this.enemy.characters = this.characters;
        /*this.characters.push(hero);     // 主人公
        //this.characters.push(tuna);     // 敵
        //this.characters.push(usi);      // 敵
        this.characters.push(enemy);     // 
        */
    
        // ゲーム管理クラスをインスタンス化する
        this.gameManage = new GameManage(this.characters);

        // コマンドクラスをインスタンス化する
        this.command = new Command(this.characters, this.gameManage);

        // コマンド選択の準備を整える
        this.command.preparation();

        // hpバーの表示
        this.healthBar = new HealthBar();


        /*const titleText = new Text('冷蔵庫', F_TITLE, 30, '#000', 'bold');    
        titleText.center();
        titleText.y = 50;
        view.add(titleText);*/

        //view.add(commandbattle);
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