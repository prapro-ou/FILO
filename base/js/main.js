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
        field.setAttributeBySprite(6, 'freezer');
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
        /*const isFreezer = field.getAttribute(player.mapX + disMapX, player.mapY + disMapY).includes('freezer');
        if (isFreezer && input.isKeyDown('Enter')) {
            const subCanvas = new Canvas(CAN_WIDTH, CAN_HEIGHT, 'gameContainer');
            console.log('open freezer');
            const freezer = new Freezer(subCanvas);
            this.stackScene(freezer);
        }*/
    }
}

/*class Freezer extends Scene {
    constructor(canvas) {
        super(canvas, 'Freezer');

        const view = new View(null, canvas);

        const inputText = new TextInput(200, 100, 300, 30, 'Enter text');
        view.add(inputText);

        this.setView(view);
    }

    update() {
        if (!super.update()) return;

        const view = this.view;
        const inputText = view.children[0];

        if (input.isKeyDown('Enter')) {
            console.log('Entered text:', inputText.text);
        }
    }
}*/

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

        // <canvas>要素を取得して削除
        const canvasElement = document.querySelector('canvas.gameContainer');
        if (canvasElement) {
            canvasElement.remove();
        }

        const view = new View(null, canvas);

        console.log('open');
        //const commandbattle = new CommandBattle();
        // キャラクターをインスタンス化する
            this.hero = new Hero("シェフ", 200, 50, 100, 3, 60, "../img/itamae.png"  );  // 主人公

            //this.enemy  = new Fish("まぐろ", 100, 40, 10,       "../img/maguro.png");  // まぐろ
            this.enemy = new Mollusk("いか", 200, 50, 30,       "../img/ika.png");  // いか
            this.item  = new Item("まぐろ", "../img/maguro_sashimi.png");      // まぐろ刺身

            // どっかで食材をとる場所が必要
            // そこで食材ごとの変数を定義することで、食材を持っているかどうかを判定する
            /*if ( syokuzai == "まぐろ" ){
                // まぐろを持っているとき
                this.enemy  = new Fish("まぐろ", 100, 40, 10,       "../img/maguro.png");  // まぐろ

                this.item  = new Item("まぐろ", "../img/maguro_sashimi.png");      // まぐろ刺身

            } else if ( syokuzai == "いか" ){
                // いかを持っているとき
                this.enemy  = new Mollusk("いか", 200, 50, 30,       "../img/ika.png");  // いか
            
                this.item  = new Item("いか", "../img/ika_sashimi.png");      // いか刺身
            } else if ( syokuzai == "あじ" ){
                // あじを持っているとき
                this.enemy  = new Fish("あじ", 300, 200, 50,       "../img/aji.png");  // あじ
            
                this.item  = new Item("あじ", "../img/aji_sashimi.png");      // あじ刺身
            } else if ( syokuzai == "えび" ){
                // えびを持っているとき
                this.enemy  = new Mollusk("えび", 400, 300, 70,       "../img/ebi.png");  // えび
            
                this.item  = new Item("えび", "../img/ebi_sashimi.png");      // えび刺身
            } else if ( syokuzai == "サーモン" ){
                // サーモンを持っているとき
                this.enemy  = new Fish("サーモン", 500, 400, 90,       "../img/samon.png");  // サーモン
            
                this.item  = new Item("サーモン", "../img/samon_sashimi.png");      // サーモン刺身
            } else if ( syokuzai == "たい" ){
                // たいを持っているとき
                this.enemy  = new Fish("たい", 600, 500, 110,       "../img/tai.png");  // たい
            
                this.item  = new Item("たい", "../img/tai_sashimi.png");      // たい刺身
            } else if ( syokuzai == "とろ" ){
                // とろを持っているとき
                this.enemy  = new Fish("とろ", 700, 600, 130,       "../img/toro.png");  // とろ
            
                this.item  = new Item("とろ", "../img/toro_sashimi.png");      // とろ刺身
            } else {
                // 何も食材を持っていないとき
                console.log('error');
            }*/


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

        // ヘルスバーをインスタンス化する
        this.HealthBar = new HealthBar();
    
        // ゲーム管理クラスをインスタンス化する
        this.gameManage = new GameManage(this.characters, this.HealthBar);

        // コマンドクラスをインスタンス化する
        this.command = new Command(this.characters, this.gameManage);

        // コマンド選択の準備を整える
        this.command.preparation();

        /*const titleText = new Text('冷蔵庫', F_TITLE, 30, '#000', 'bold');    
        titleText.center();
        titleText.y = 50;
        view.add(titleText);*/

        //view.add(commandbattle);
        this.setView(view);
    }

    update() {
        if (!super.update()) return;
        // コマンドバトルで勝利ているかつシフトを押したとき
        if(input.isKeyDown('Shift') && this.gameManage.winFlag) {
            this.close();
            this.destroy();
            console.log('you got a maguro');
        }
        // コマンドバトルで敗北しているかつシフトを押したとき
        if(input.isKeyDown('Shift') && this.gameManage.loseFlag) {
            this.close();
            this.destroy();
            console.log('you lost a maguro');
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