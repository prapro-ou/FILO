// Define characters
class Itamae extends Player {
    constructor(mapX, mapY) {
        super(
            assets.get('itamae'),
            32, 32, 
            mapX, mapY,
            FAST,
            [1, 0, 1, 2]
        );
    }
}

class Customer extends NonPlayer {
    constructor(type, seat, sushi) {
        super(
            assets.get(type),
            32, 32, 
            29, 3,
            NORMAL,
            [1, 0, 1, 2],
        );
        this.seat = seat;
        this.sushi = sushi;
        this.bubble = null; // bubble: Entity
    }

    update(canvas) {
        super.update(canvas);
        if (this.isSitting()) this.order();
        if (this.isInExit())  this.despawn();
        if (this.bubble) this.bubble.update(canvas);
    }

    isSitting() {
        return this.belongField.getAttribute(this.mapX, this.mapY, true).includes(`seat-${this.seat}`);
    }

    isInExit() {
        return this.mapX === 28 && this.mapY === 3;
    }

    sit() {
        switch (this.seat) {
            case 'C1':
                this.walk(29, 13);
                this.walk(0, 13);
                this.walk(0, 4);
                this.walk(1, 4);
                break;
            case 'C2':
                this.walk(29, 13);
                this.walk(0, 13);
                this.walk(0, 6);
                this.walk(1, 6);
                break;
            case 'C3':
                this.walk(29, 13);
                this.walk(0, 13);
                this.walk(0, 8);
                this.walk(1, 8);
                break;
            case 'C4':
                this.walk(29, 13);
                this.walk(0, 13);
                this.walk(0, 10);
                this.walk(1, 10);
                break;
            case 'C6':
                this.walk(29, 13);
                this.walk(7, 13);
                this.walk(7, 11);
                break;
            case 'C8':
                this.walk(29, 13);
                this.walk(13, 13);
                this.walk(13, 11);
                break;
            case 'C10':
                this.walk(29, 13);
                this.walk(19, 13);
                this.walk(19, 11);
                break;
            case 'C11':
                this.walk(29, 13);
                this.walk(22, 13);
                this.walk(22, 11);
                break;
            case 'C13':
                this.walk(29, 9);
                this.walk(27, 9);
                break;
            case 'A1':
                this.walk(29, 13);
                this.walk(2, 13);
                this.walk(2, 16);
                this.route.push(-1);
                break;
            case 'A2':
                this.walk(29, 13);
                this.walk(5, 13);
                this.walk(5, 16);
                this.route.push(-3);
                break;
            case 'A5':
                this.walk(29, 13);
                this.walk(16, 13);
                this.walk(16, 16);
                this.route.push(-1);
                break;
        }
    }

    order() {
        if (this.bubble) return;

        let spX, spY;
        switch (this.sushi) {
            case 'aji':        spX = 0;   spY = 0;  break;
            case 'anago':      spX = 32;  spY = 0;  break;
            case 'ebi':        spX = 64;  spY = 0;  break;
            case 'ika':        spX = 96;  spY = 0;  break;
            case 'maguro':     spX = 128; spY = 0;  break;
            case 'salmon':     spX = 0;   spY = 32; break;
            case 'tai':        spX = 32;  spY = 32; break;
            case 'tamago':     spX = 64;  spY = 32; break;
            case 'toro':       spX = 96;  spY = 32; break;
            case 'torosalmon': spX = 128; spY = 32; break;
        }
        const bubble = new Sprite(assets.get('bubble'), new Rectangle(spX, spY, 32, 32));
        this.bubble = new Entity(bubble, this.mapX, this.mapY - 1);
        this.bubble.belongField = this.belongField;
    }

    leave() {
        switch (this.seat) {
            case 'C1':                
                this.walk(0, 4);
                this.walk(0, 12);
                this.walk(28, 12);
                break;
            case 'C2':
                this.walk(0, 6);
                this.walk(0, 12);
                this.walk(28, 12);
                break;
            case 'C3':
                this.walk(0, 8);
                this.walk(0, 12);
                this.walk(28, 12);
                break;
            case 'C4':
                this.walk(0, 10);
                this.walk(0, 12);
                this.walk(28, 12);
                break;
            case 'C6':
                this.walk(7, 12);
                this.walk(28, 12);
                break;
            case 'C8':
                this.walk(13, 12);
                this.walk(28, 12);
                break;
            case 'C10':
                this.walk(19, 12);
                this.walk(28, 12);
                break;
            case 'C11':
                this.walk(22, 12);
                this.walk(28, 12);
                break;
            case 'C13':
                this.walk(28, 9);
                break;
            case 'A1':
                this.walk(2, 12);
                this.walk(28, 12);
                break;
            case 'A2':
                this.walk(5, 12);
                this.walk(28, 12);
                break;
            case 'A5':
                this.walk(16, 12);
                this.walk(28, 12);
                break;
        }
        this.walk(28, 3);
        this.bubble = null;
    }
}

// Define Scenes
class TitleScene extends Scene {
    constructor(canvas) {
        super(canvas, 'Title');

        const view = new View(canvas); 
        view.setBgImg(assets.get('title'), TITLE_CAN_W, TITLE_CAN_H);

        this.setView(view);

        
        setTimeout(() => {
            openCurtainAnime();
        }, 500);
    }

    update() {
        if (!super.update()) return;

        if(input.isKeyDown(' ')) {
            closeCurtainAnime();
            setTimeout(() => {
                const mainCanvas = new Canvas(MAIN_CAN_W, MAIN_CAN_H, 'mainCanvas');
                mainCanvas.set(MAINCAN_WRAPPER);
                const mainScene = new Sushiya(mainCanvas);
                this.changeScene(mainScene);
                this.destroy();
                this.canvas.destroy();
            }, 1000);
        }
    }
}

class Sushiya extends Scene {
    constructor(canvas) {
        super(canvas, 'Sushiya', assets.get('main_bgm'));
        this.frameCnt = 0;
        this.customers = [];
        this.customerPos = ['C1', 'C3', 'C6', 'C8', 'C10', 'C11', 'C13', 'A1', 'A2', 'A5'];
        this.stock = ['aji', 'anago', 'ebi', 'ika', 'maguro', 'salmon', 'tamago', 'tai', 'toro', 'torosalmon'];
        // this.customerPos = ['C13']
        // this.stock = ['aji']
        this.inventory = { neta: null, type: null };
        this.isOpenedRefrigirator = false;
        this.startTime   = null;
        this.currentTime = null;
        this.cleared = false;

        const field = new Field(fieldData.sushiya, canvas, assets.get('sushiya_tile'));
        field.shiftX(-4);
        field.shiftY(-2);

        this._setEntities(field);
        this._setAttrs(field);

        const player = new Itamae(9, 5);
        field.setPlayer(player);

        this.setField(field);

        GAME_INFO_BOX.classList.remove('js-hidden');
        INVENTORY.classList.remove('js-hidden');
        setTimeout(() => {
            openCurtainAnime();
            this.startTime = Date.now();
        }, 500) 
        setTimeout(() => {
            this.bgm.play();
        }, 700) 
    }

    changeScene(newScene) {
        super.changeScene(newScene);
        GAME_INFO_BOX.classList.add('js-hidden');
        INVENTORY.classList.add('js-hidden');
    }

    update() {
        if (!super.update()) return;
        if (!this.cleared) this._displayTime();
        this._displayQuota();

        // Customer is spawn once every 3 seconds.
        if (this.frameCnt++ % 180 === 0 && this.customerPos.length > 0) {
            this._spawnCustomer().sit();
        }

        const field  = this.field;
        const player = field.player;
        const [disMapX, disMapY] = getDisplacementByDir(player.direction);

        if (this._isClear() && !this.cleared) {
            this.cleared = true;
            const clearTime = this.currentTime;
            openClearOverlay(clearTime);
            this.bgm.pause();
        }

        if (this.cleared && input.isKeyDown(' ')) {
            closeCurtainAnime();
            setTimeout(() => {
                INVENTORY.classList.remove('js-hidden');
                closeClearOverlay();
                const titleCanvas = new Canvas(TITLE_CAN_W, TITLE_CAN_H, 'titleCanvas');
                titleCanvas.set(CAN_WRAPPER);
                const titleScene = new TitleScene(titleCanvas);
                this.changeScene(titleScene);
                this.destroy();
                this.canvas.destroy();
            }, 2000);
        }

        // Serving sushi action
        this.customers.forEach((customer) => {
            const isCustomer = field.getAttribute(player.mapX + disMapX, player.mapY + disMapY).includes(`seat-${customer.seat}`) && customer.isSitting();
            const haveOrderdSushi =  customer.sushi === this.inventory.neta && this.inventory.type === 'nigiri';
            if (isCustomer && haveOrderdSushi && input.isKeyDown('Enter')) {
                assets.get('cheer').play();
                clearInventory();
                this.inventory.neta = this.inventory.type = null;
                customer.leave();
                this.customers = this.customers.filter((c) => c !== customer);
            }
        });

        // Refrigirator action
        const isRefrigirator = field.getAttribute(player.mapX + disMapX, player.mapY + disMapY).includes('refrigirator');
        if (isRefrigirator && input.isKeyDown('Enter') && !this.isOpenedRefrigirator) {
            const refCanvas = new Canvas(500, 300, 'refrigirator__wrapper', null, true);
            const refrigirator = new Refrigirator(refCanvas);
            refrigirator.addEventListener('pushInventory', (e) => {
                this.inventory.neta = e.target;
                this.inventory.type = 'sakana';
                clearInventory();
                let sakana = this.inventory.neta;
                if (sakana === 'toro')       sakana = 'maguro';
                if (sakana === 'torosalmon') sakana = 'salmon';
                pushInventory(assets.get(`${sakana}_row`));
            });
            refrigirator.addEventListener('closeRef', () => {
                this.isOpenedRefrigirator = false;
                this.bgm.play();
            });
            this.isOpenedRefrigirator = true;
            this.stackScene(refrigirator)
        }
        

        // Pond action -> Command battle
        const isPond = field.getAttribute(player.mapX + disMapX, player.mapY + disMapY).includes('pond');
        const haveSakana = this.inventory.neta && this.inventory.type === 'sakana';
        if (isPond && haveSakana && input.isKeyDown('Enter')) {
            const subCanvas = new Canvas(COMMANDCAN_W, COMMANDCAN_H, 'gameContainer');
            const pond = new Pond(subCanvas, this.inventory.neta);
            pond.addEventListener('clear', () => {
                this.inventory.type = 'kirimi';
                clearInventory();
                pushInventory(assets.get(`${this.inventory.neta}_kirimi`), 5, 15);
                this.bgm.play();
            });
            pond.addEventListener('gameover', () => {
                this.inventory.neta = this.inventory.type = null;
                clearInventory();
                this.bgm.play();
            });
            this.stackScene(pond);
        }

        // Cutting board action -> Sushimaker
        const isCuttingBoard = field.getAttribute(player.mapX + disMapX, player.mapY + disMapY, true).includes('cuttingBoard');
        const haveKirimi = this.inventory.neta && this.inventory.type === 'kirimi';
        if (isCuttingBoard && haveKirimi && input.isKeyDown('Enter')) {
            let sushimaker;
            switch (this.inventory.neta) {
                case 'aji':        sushimaker = new Aji();        break;
                case 'anago':      sushimaker = new Anago();      break;
                case 'ebi':        sushimaker = new Ebi();        break;
                case 'ika':        sushimaker = new Ika();        break;
                case 'maguro':     sushimaker = new Maguro();     break;
                case 'salmon':     sushimaker = new Salmon();     break;
                case 'tai':        sushimaker = new Tai();        break;
                case 'tamago':     sushimaker = new Tamago();     break;
                case 'toro':       sushimaker = new Toro();       break;
                case 'torosalmon': sushimaker = new Torosalmon(); break;
            }
            const cuttingBoard = new CuttingBoard(sushimaker);
            cuttingBoard.addEventListener('pushInventory', () => {
                this.inventory.type = 'nigiri';
                pushInventory(assets.get(this.inventory.neta), 5);
                this.bgm.play();
            });
            this.stackScene(cuttingBoard);
        }
    }

    _isClear() {
        return this.customers.length === 0 && this.customerPos.length === 0;
    }

    _spawnCustomer() {
        const customerTypes = ['man', 'woman', 'student', 'president'];
        const rand1 = getRandom(0, 3);
        const rand2 = getRandom(0, this.customerPos.length - 1);
        const rand3 = getRandom(0, this.stock.length - 1);

        const customer = new Customer(customerTypes[rand1], this.customerPos[rand2], this.stock[rand3]);
        this.field.setCharacter(customer);
        this.customers.push(customer);

        this.customerPos.splice(rand2, 1);
        this.stock.splice(rand3, 1);

        return customer;
    }

    _getCustomer(seat) {
        const { seatX, seatY } = this.field.getCoordsByAttr(`seat-${seat}`)[0];

        for (const customer of this.field.characters) {
            if (customer.mapX === seatX && customer.mapY === seatY) return customer;
        }

        return null;
    }

    _displayTime() {
        this.currentTime = new Date(Date.now() - this.startTime);
        const [m, s, ms] = getTimeElm(this.currentTime);
        document.getElementsByClassName('js-timer')[0].textContent = `${m}分${s}秒${ms}`;
    }

    _displayQuota() {
        document.getElementsByClassName('js-quota')[0].textContent = `残り${this.customers.length}人`;
    }

    _setEntities(field) {
        const chair1 = new Sprite(assets.get('sushiya_object'), new Rectangle(0,  0, 32, 32));
        const chair2 = new Sprite(assets.get('sushiya_object'), new Rectangle(32, 0, 32, 32));
        const chair3 = new Sprite(assets.get('sushiya_object'), new Rectangle(64, 0, 32, 32));
        for (let i = 0; i < 8; i++) {
            field.addEntity(new Entity(chair1, 4 + i * 3, 11, ['chair', `seat-C${i + 5}`]));
        }
        for (let i = 0; i < 2; i++) {
            field.addEntity(new Entity(chair2, 27, 9 - i * 2, ['chair', `seat-C${i + 13}`]));
        }
        for (let i = 0; i < 4; i++) {
            field.addEntity(new Entity(chair3, 1, 4 + i * 2, ['chair', `seat-C${i + 1}`]));
        }
        const seasoning1 = new Sprite(assets.get('sushiya_object'), new Rectangle(96, 0, 32, 32));
        const seasoning2 = new Sprite(assets.get('sushiya_object'), new Rectangle(128, 0, 32, 32));
        const seasoning3 = new Sprite(assets.get('sushiya_object'), new Rectangle(160, 0, 32, 32));
        const seasoning4 = new Sprite(assets.get('sushiya_object'), new Rectangle(192, 0, 32, 32));
        const seasoning5 = new Sprite(assets.get('sushiya_object'), new Rectangle(224, 0, 32, 32));
        field.addEntity(new Entity(seasoning1, 16, 2, ['seasoning']));
        field.addEntity(new Entity(seasoning1, 5, 10, ['seasoning']));
        field.addEntity(new Entity(seasoning4, 26, 7, ['seasoning']));
        field.addEntity(new Entity(seasoning5, 26, 8, ['seasoning']));
        for (let i = 0; i < 3; i++) {
            field.addEntity(new Entity(seasoning1, 12 + i * 6, 10, ['seasoning']));
            field.addEntity(new Entity(seasoning2, 2, 2 + i * 3, ['seasoning']));
            field.addEntity(new Entity(seasoning3, 2, 3 + i * 3, ['seasoning']));
            
        }
        for (let i = 0; i < 4; i++) {
            field.addEntity(new Entity(seasoning2, 3 + i * 7, 16, ['seasoning']));
            field.addEntity(new Entity(seasoning3, 3 + i * 7, 17, ['seasoning']));
            field.addEntity(new Entity(seasoning4, 4 + i * 7, 16, ['seasoning']));
            field.addEntity(new Entity(seasoning5, 4 + i * 7, 17, ['seasoning']));
        }
        const clock    = new Sprite(assets.get('sushiya_object'), new Rectangle(0, 32, 32, 32));
        const woodNote = new Sprite(assets.get('sushiya_object'), new Rectangle(128, 64, 32, 32));
        field.addEntity(new Entity(clock, 12, 0));
        for (let i = 0; i < 4; i++) {
            field.addEntity(new Entity(woodNote, 20 + i, 1));
        }
        const door1 = new Sprite(assets.get('sushiya_object'), new Rectangle(32, 32, 32, 32));
        const door2 = new Sprite(assets.get('sushiya_object'), new Rectangle(64, 32, 32, 32));
        const door3 = new Sprite(assets.get('sushiya_object'), new Rectangle(96, 32, 32, 32));
        const door4 = new Sprite(assets.get('sushiya_object'), new Rectangle(128, 32, 32, 32));
        field.addEntity(new Entity(door1, 28, 1), ['door']);
        field.addEntity(new Entity(door2, 28, 2), ['door']);
        field.addEntity(new Entity(door3, 29, 1), ['door']);
        field.addEntity(new Entity(door4, 29, 2), ['door']);
        const cuttingBoard1 = new Sprite(assets.get('sushiya_object'), new Rectangle(160, 32, 32, 32));
        const cuttingBoard2 = new Sprite(assets.get('sushiya_object'), new Rectangle(192, 32, 32, 32));
        const plate1        = new Sprite(assets.get('sushiya_object'), new Rectangle(224, 32, 32, 32));
        const plate2        = new Sprite(assets.get('sushiya_object'), new Rectangle(0, 64, 32, 32));
        const sink          = new Sprite(assets.get('sushiya_object'), new Rectangle(96, 64, 32, 32));
        field.addEntity(new Entity(cuttingBoard1, 17, 6));
        field.addEntity(new Entity(cuttingBoard2, 18, 6, ['cuttingBoard']));
        field.addEntity(new Entity(plate1, 15, 5, ['plate']));
        field.addEntity(new Entity(plate2, 15, 6, ['plate']));
        field.addEntity(new Entity(sink, 13, 6, ['sink']));
        const register1 = new Sprite(assets.get('sushiya_object'), new Rectangle(32, 64, 32, 32));
        const register2 = new Sprite(assets.get('sushiya_object'), new Rectangle(64, 64, 32, 32));
        field.addEntity(new Entity(register1, 26, 2, ['register']));
        field.addEntity(new Entity(register2, 26, 3));
    }

    _setAttrs(field) {
        const obstacles = [8, 9, 14, 16, 17, 18, 19, 20, 21, 22, 26, 27, 28, 31, 36, 37, 40, 43, 48, 49, 54, 57, 60, 68, 69, 78, 82];
        obstacles.forEach((i) => {
            field.setAttributeBySprite(i, 'obstacle');
        });
        const topObstacles = [3, 4, 50, 51, 63, 65, 81];
        topObstacles.forEach((i) => {
            field.setAttributeBySprite(i, 'topObstacle');
        });
        const bottomObstacles = [11, 12, 13, 39, 42, 46, 47, 66, 67, 83];
        bottomObstacles.forEach((i) => {
            field.setAttributeBySprite(i, 'bottomObstacle');
        });
        field.getCoordsByAttr('chair').forEach(({ mapX, mapY }) => {
            field.setAttribute(mapX, mapY, 'obstacle');
        });

        field.setAttributeBySprite(54, 'refrigirator');
        field.setAttributeBySprite(57, 'refrigirator');
        field.setAttribute(5, 7, 'pond');
        field.setAttribute(5, 8, 'pond');
        field.setAttribute(6, 7, 'pond');
        field.setAttribute(6, 8, 'pond');
        field.setAttribute( 2, 16, 'seat-A1');
        field.setAttribute( 5, 16, 'seat-A2');
        field.setAttribute( 9, 16, 'seat-A3');
        field.setAttribute(12, 16, 'seat-A4');
        field.setAttribute(16, 16, 'seat-A5');
        field.setAttribute(19, 16, 'seat-A6');
        field.setAttribute(23, 16, 'seat-A7');
        field.setAttribute(26, 16, 'seat-A8');
    }
}

class Refrigirator extends Scene{
    constructor(canvas) {
        super(canvas, 'Refrigirator');
        const question = document.createElement('p');
        question.classList.add('question');
        question.textContent = '?? 作りたいお寿司は ??';
        canvas.canvas.appendChild(question);
        const input = document.createElement('input');
        input.classList.add('text-input');
        input.setAttribute('type', 'text');
        canvas.canvas.appendChild(input);
        const modal = new Modal();
        modal.create();
        this.setModal(modal);
        setTimeout(() => {
            input.focus();
        }, 0);
        this.input = input;
    }

    update() {
        if (!super.update()) return;
        let neta = null;
        if (input.isKeyDown('Enter')) {
            switch (this.input.value) {
                case 'まぐろ':       neta = 'maguro'; break;
                case 'えび':         neta = 'ebi'; break;
                case 'とろ':         neta = 'toro'; break;
                case 'とろさーもん': neta = 'torosalmon'; break;
                case 'さーもん':     neta = 'salmon'; break;
                case 'たい':         neta = 'tai'; break;
                case 'あなご':       neta = 'anago'; break;
                case 'いか':         neta = 'ika'; break;
                case 'たまご':       neta = 'tamago'; break;
                case 'あじ':         neta = 'aji'; break;
            }
            if (neta) {
                const e = new Event(neta);
                this.dispatchEvent('pushInventory', e);
                setTimeout(() => {
                    this.dispatchEvent('closeRef');
                    this.destroy();
                }, 100);
                this.close();
            }
        }
    }
}

class Pond extends Scene {
    constructor(canvas, syokuzai) {
        super(canvas, 'Refrigerator', assets.get('battle_bgm'));
        this.syokuzai = syokuzai
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

        const view = new View(canvas);
    
        this.hero = new Hero("シェフ", 200, 50, 100, 3, 60, "./img/chef.png"  );  

        switch (syokuzai) {
            case 'maguro':     this.enemy = new Fish("まぐろ", 100, 40, 10, "./img/maguro.png", "./img/maguro_sashimi.png");           break;
            case "ika":        this.enemy = new Mollusk("いか", 200, 50, 30, "./img/ika.png", "./img/ika_sashimi.png");                break;
            case "aji":        this.enemy = new Fish("あじ", 100, 60, 50, "./img/aji.png", "./img/aji_sashimi.png");                   break;
            case "ebi":        this.enemy = new Mollusk("えび", 80, 120, 70, "./img/ebi.png", "./img/ebi_sashimi.png");                break;
            case "salmon":     this.enemy = new Fish("サーモン", 150, 70, 90, "./img/salmon.png", "./img/salmon_sashimi.png");         break;
            case "tai":        this.enemy  = new Fish("たい", 250, 70, 10,       "./img/tai.png", "./img/tai_sashimi.png");            break;
            case "toro":       this.enemy  = new Fish("とろ", 300, 40, 10,       "./img/maguro.png", "./img/toro_sashimi.png");        break;
            case "tamago":     this.enemy = new Mollusk("たまご", 60, 150, 10, "./img/tamago.png", "./img/tamago_sashimi.png");        break;
            case "anago":      this.enemy = new Mollusk("あなご", 200, 40, 10, "./img/anago.png", "./img/anago_sashimi.png");          break;
            case "torosalmon": this.enemy = new Fish("とろサーモン", 200, 70, 10, "./img/salmon.png", "./img/torosalmon_sashimi.png"); break;
        }

        this.characters = [
            this.hero,    
            this.enemy 
        ];

        this.hero.characters = this.characters;
        this.enemy.characters = this.characters;

        this.HealthBar = new HealthBar();
        this.gameManage = new GameManage(this.characters, this.HealthBar);
        this.command = new Command(this.characters, this.gameManage);
        this.command.preparation();

        this.setView(view);
        this.bgm.play();
    }

    update() {
        if (!super.update()) return;
        
        if (this.gameManage.winFlag) {
            setTimeout(()=> {
                this.dispatchEvent('clear');
                this.close();
                this.destroy();
            }, 1500);
        }
        if (this.gameManage.loseFlag) {
            this.dispatchEvent('gameover');
            this.close();
            this.destroy();
        }
    }
}

class CuttingBoard extends Scene {
    constructor(sushimaker) {
        super(sushimaker.canvas, 'CuttingBoard', assets.get('sushimaker_bgm'));
        const modal = new Modal();
        modal.create();
        this.setModal(modal);
        this.sushimaker = sushimaker;
        sushimaker.start();
        this.bgm.play();
    }

    update() {
        if (!super.update()) return;
        this.sushimaker.update();

        if(this.sushimaker.clear) { 
            this.bgm.pause();
            this.dispatchEvent('pushInventory');
            this.close();
            this.destroy();
        }
    }
}

class ResultScene extends Scene {
    constructor(canvas, clearTime) {
        super(canvas, 'Result');
        this.clearTime = clearTime;

        const view = new View(canvas); 
        // TODO: finish this scene.
        // view.setBgImg(assets.get('result'), MAIN_CAN_W, MAIN_CAN_H);
        view.setBgColor('#39aabc')

        const [m, s, ms] = getTimeElm(clearTime);
        const timeText = new Text(`${m}分${s}秒${ms}`, F_TITLE, 30, '#000', 'bold');    
        timeText.center();
        timeText.y = 50;
        view.add(timeText);

        this.setView(view);

        setTimeout(() => {
            hideMsg('clear');
        }, 600);
        setTimeout(() => {
            openCurtainAnime();
        }, 800);
    }

    update() {
        if (!super.update()) return;

        if(input.isKeyDown(' ')) {
            const titleCanvas = new Canvas(TITLE_CAN_W, TITLE_CAN_H, 'titleCanvas');
            titleCanvas.set(CAN_WRAPPER);
            const titleScene = new TitleScene(titleCanvas);
            this.changeScene(titleScene);
            this.destroy();
            this.canvas.destroy();
        }
    }
}


window.onload = async () => {
    assets.addImage('title', './img/title.png');
    assets.addImage('sushiya_tile',   './img/tileset.png');
    assets.addImage('sushiya_object', './img/objects.png');
    assets.addImage('itamae',    './img/itamae.png');
    assets.addImage('man',       './img/man.png');
    assets.addImage('woman',     './img/woman.png');
    assets.addImage('student',   './img/student.png');
    assets.addImage('president', './img/president.png');
    assets.addImage('bubble', './img/bubbles.png');
    for (let i = 1; i <= 8; i++) assets.addImage(`shari${i}`, `./img/sushi_img/shari1_${i}.png`);
    for (let i = 1; i <= 4; i++) {
        assets.addImage(`aji${i}`,        `./img/sushi_img/aji_sashimi${i}.png`);
        assets.addImage(`anago${i}`,      `./img/sushi_img/anago_sashimi${i}.png`);
        assets.addImage(`ebi${i}`,        `./img/sushi_img/ebi_sashimi${i}.png`);
        assets.addImage(`ika${i}`,        `./img/sushi_img/ika_sashimi${i}.png`);
        assets.addImage(`maguro${i}`,     `./img/sushi_img/maguro_sashimi${i}.png`);
        assets.addImage(`salmon${i}`,     `./img/sushi_img/salmon_sashimi${i}.png`);
        assets.addImage(`tai${i}`,        `./img/sushi_img/tai_sashimi${i}.png`);
        assets.addImage(`tamago${i}`,     `./img/sushi_img/tamago${i}.png`);
        assets.addImage(`toro${i}`,       `./img/sushi_img/toro_sashimi${i}.png`);
        assets.addImage(`torosalmon${i}`, `./img/sushi_img/torosalmon_sashimi${i}.png`);
    }
    assets.addImage('aji_kirimi',        './img/sushi_img/aji_sashimi.png');
    assets.addImage('anago_kirimi',      './img/sushi_img/anago_sashimi.png');
    assets.addImage('ebi_kirimi',        './img/sushi_img/ebi_sashimi.png');
    assets.addImage('ika_kirimi',        './img/sushi_img/ika_sashimi.png');
    assets.addImage('maguro_kirimi',     './img/sushi_img/maguro_sashimi.png');
    assets.addImage('salmon_kirimi',     './img/sushi_img/salmon_sashimi.png');
    assets.addImage('tai_kirimi',        './img/sushi_img/tai_sashimi.png');
    assets.addImage('tamago_kirimi',     './img/sushi_img/tamago.png');
    assets.addImage('toro_kirimi',       './img/sushi_img/toro_sashimi.png');
    assets.addImage('torosalmon_kirimi', './img/sushi_img/torosalmon_sashimi.png');
    assets.addImage('aji',        './img/sushi_img/sushi_nigiri_aji.png');
    assets.addImage('anago',      './img/sushi_img/sushi_nigiri_anago.png');
    assets.addImage('ebi',        './img/sushi_img/sushi_nigiri_ebi.png');
    assets.addImage('ika',        './img/sushi_img/sushi_nigiri_ika.png');
    assets.addImage('maguro',     './img/sushi_img/sushi_nigiri_maguro.png');
    assets.addImage('salmon',     './img/sushi_img/sushi_nigiri_salmon.png');
    assets.addImage('tai',        './img/sushi_img/sushi_nigiri_tai.png');
    assets.addImage('tamago',     './img/sushi_img/sushi_nigiri_tamago.png');
    assets.addImage('toro',       './img/sushi_img/sushi_nigiri_toro.png');
    assets.addImage('torosalmon', './img/sushi_img/sushi_nigiri_torosalmon.png');
    assets.addImage('baran', './img/sushi_img/baran.png');
    assets.addImage('aji_row',    './img/aji.png');
    assets.addImage('anago_row',  './img/anago.png');
    assets.addImage('ebi_row',    './img/ebi.png');
    assets.addImage('ika_row',    './img/ika.png');
    assets.addImage('maguro_row', './img/maguro.png');
    assets.addImage('salmon_row', './img/salmon.png');
    assets.addImage('tai_row',    './img/tai.png');
    assets.addImage('tamago_row', './img/tamago.png');
    // assets.addAudio('title_bgm',  './sound/title_bgm.mp3');
    assets.addAudio('main_bgm',  './sound/ninja-mura.mp3');
    assets.addAudio('battle_bgm', './sound/battle1.mp3')
    assets.addAudio('sushimaker_bgm',  './sound/odango-douchu.mp3');
    assets.addAudio('cheer',  './sound/cheer.mp3');
    assets.addAudio('crash',  './sound/crash.mp3');
    assets.addAudio('drop',   './sound/drop.mp3');
    await assets.loadAllAssets();
    document.getElementsByClassName('loading-msg')[0].classList.add('js-hidden');

    const titleCanvas = new Canvas(TITLE_CAN_W, TITLE_CAN_H, 'titleCanvas');
    titleCanvas.set(CAN_WRAPPER);
    
    const game = new Game();
    const scene = new TitleScene(titleCanvas);
    
    game.changeScene(scene);
    game.start();
}
