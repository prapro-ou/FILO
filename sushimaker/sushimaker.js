        //落ちるスピード
        const GAME_SPEED = 300;
        const DROP_SPEED = 100;

        //フィールドサイズ
        const FIELD_COL = 20;
        const FIELD_ROW = 25;

        //ブロック一つのサイズ（ピクセル）
        const BLOCK_SIZE = 32;

        //キャンバスサイズ
        const SCREEN_W = BLOCK_SIZE * FIELD_COL;
        const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

        //テトロミノのサイズ
        const TETRO_SIZE = 4;

        //色
        const TETRO_COLORS = [
            "#FFF",             //0白
            "#F00"              //1赤
        ];

        let tetro = [
            [0, 0, 0, 0],
            [1, 2, 3, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        // Imageオブジェクトを作成
        const blockImages = [];
        const imagePaths = [
        '../sushi_img/maguro_sashimi1.png',
        '../sushi_img/maguro_sashimi2.png',
        '../sushi_img/maguro_sashimi3.png',
        '../sushi_img/maguro_sashimi4.png'
        ];

        imagePaths.forEach((path, index) => {
        blockImages[index] = new Image();
        blockImages[index].src = path;
        });

        // 画像パスを配列に格納
        const sushiRiceImages = ['../sushi_img/shari1_1.png', '../sushi_img/shari1_2.png'];

        // 画像オブジェクトを格納する配列を初期化
        let sushiRiceImg = sushiRiceImages.map(path => {
            let img = new Image();
            img.src = path;
            return img;
        });

        //初期位置
        const START_X = FIELD_COL/2 - TETRO_SIZE/2;
        const START_Y = 0;

        //テトロミノの座標
        let tetro_x = START_X;
        let tetro_y = START_Y;

        //フィールド本体
        let field = [];

        let can = document.getElementById("can");
        let con = can.getContext("2d");

        can.width = SCREEN_W;
        can.height = SCREEN_H;
        can.style.border = "4px solid #555"

        init();
        drawAll();

        let direction = 1; // 1:右、-1:左

        // テトロが存在するならば、テトロをスライドさせる動きを開始
        if (tetro !== null) {
            setInterval(slideTetro, GAME_SPEED);
        }

        //初期化
        function init()
        {
            //フィールドのクリア
            for (let y=0; y<FIELD_ROW; y++)
            {
                field[y] = [];
                for (let x=0; x<FIELD_COL ; x++)
                {
                    field[y][x] = 0;
                }
            }
            //シャリに画像を割り当てる
            field[23][10] =1;
            field[23][11] =2; 
            field[24][10] =1;
            field[24][11] =2;

        }

        //ブロック一つを描画する
        function drawBlock(x, y, c)
        {
            let px = x * BLOCK_SIZE;
            let py = y * BLOCK_SIZE;
            if (field[y][x] > 0) {
                // シャリの画像を描画
                con.drawImage(sushiRiceImg[field[y][x] - 1], px, py, BLOCK_SIZE, BLOCK_SIZE);
            } else {
                // 通常のブロックを描画
                con.fillStyle=TETRO_COLORS[c];
                con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
            }

        }

        //全部描画する
        function drawAll()
        {
            con.clearRect(0, 0, SCREEN_W, SCREEN_H);
            console.log("clear");
        
            //フィールドを描画する
            for (let y=0; y<FIELD_ROW; y++)
            {
                for (let x = 0; x<FIELD_COL; x++)
                {
                    if ( field[y][x] )
                    {
                        drawBlock(x, y, 0);
                    }

                }
            }

            //テトロミノを描画する
            const canvas = document.getElementById('can');
            const ctx = canvas.getContext('2d');
            
            for (let y = 0; y < TETRO_SIZE; y++) {
                for (let x = 0; x < TETRO_SIZE; x++) {
                    const imageIndex = tetro[y][x] - 1;
                    if (imageIndex >= 0 && imageIndex < blockImages.length) {
                        ctx.drawImage(blockImages[imageIndex], (tetro_x + x) * BLOCK_SIZE, (tetro_y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                }
            }
        }

        //ブロックの衝突判定
        function checkMove(mx, my, ntetro)
        {
            if(ntetro == undefined) ntetro = tetro;

            for (let y=0; y<TETRO_SIZE; y++)
                {
                    for (let x = 0; x<TETRO_SIZE; x++)
                    {
                        if (ntetro[y][x])
                        {
                            let nx = tetro_x + mx + x;
                            let ny = tetro_y + my + y;
                        
                            if ( 
                            ny < 0 ||
                            nx < 0 ||
                            ny >= FIELD_ROW ||
                            nx >= FIELD_COL ||
                            field[ny][nx] )  
                            {
                                return false;
                            }
                        }
                    }
                }
                return true;
        }

            //テトロの回転
        function rotate()
        {
            let ntetro = [];
            for (let y=0; y<TETRO_SIZE; y++)
                {
                    ntetro[y] = [];
                    for (let x = 0; x<TETRO_SIZE; x++)
                    {
                        ntetro[y][x] = tetro[TETRO_SIZE-x-1][y];
                    }
                }
            return ntetro;
        }

        //テトロを固定する処理
        function fixTetro()
        {
            for (let y=0; y<TETRO_SIZE; y++)
                {
                    for (let x = 0; x<TETRO_SIZE; x++)
                    {
                        if (tetro[y][x])
                        {   
                            field[tetro_y + y][tetro_x + x] = 1;
                        }
                    }
                }   

        }

        //ブロックの落ちる処理
        function slideTetro()
        {
            // tetroがnullでないことを確認
            if (tetro !== null){
                // tetroがnullでない場合のみcheckMoveを実行
                if (checkMove(direction, 0, tetro)){
                    tetro_x += direction;
                    drawAll();
                } else {
                    direction = -direction;
                    tetro_x += direction;
                    drawAll();
                } 
            }
            console.log("slide");
        }

        // テトラミノをすべて消去する関数
        function clearTetrominos() {
            // テトラミノが格納されている配列またはオブジェクトをクリア
            tetro = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            console.log("clearTetrominos");
            for(let y = 0; y < FIELD_ROW; y++) {
                for(let x = 0; x < FIELD_COL; x++) {
                    field[y][x] = 0; // フィールドの各セルを空に設定
                }
            }
            drawAll();
            //テトロを消す
            tetro = null;
        }

        // 画像を表示する関数
        function showImage() {
            const canvas = document.getElementById('can');
            const context = canvas.getContext('2d');
            let img = new Image();
            img.onload = function() {
                // 画像が読み込まれたら描画
                context.drawImage(img, 300, 700, BLOCK_SIZE*3, BLOCK_SIZE*3);
            };
            img.src = '../sushi_img/sushi_nigiri_maguro.png'; // 表示する画像のパス
        }

        //テトロを下に落とす
        function dropTetro() {
            direction = 0;
            // tetroがnullでないことを確認
            if (tetro !== null){
                // tetroがnullでない場合のみcheckMoveを実行
                if (checkMove(0, 0, tetro)){
                    tetro_y++;
                    drawAll();
                } else {
                    // テトラミノの消去
                    clearTetrominos();
                    // テトラミノが消えた後、2秒後に画像を表示する
                    setTimeout(showImage, 1000); // 1000ミリ秒 = 2秒
                }       
            } 
        }

        function setdrop(){
            // テトラミノをスライドさせる動きを停止
            clearInterval(slideTetro);
            setInterval(dropTetro, DROP_SPEED)
            dropTetro();
        }

        //テトラミノを動かす（キーボードが押されたとき）
        document.onkeydown = function(e)
        {
            //onkeydown keycode 検索
            switch( e.keyCode )
            {
                case 37: //左
                    if ( checkMove(-1, 0, tetro) ) tetro_x--;
                    drawAll();
                    break;
                case 39: //右
                    if ( checkMove(1, 0, tetro) ) tetro_x++;
                    drawAll();
                    break;
                //case 40: //下
                    //if ( checkMove(0, 1, tetro) ) tetro_y++;
                    //break;
                case 32: //スペース
                    let ntetro = rotate();
                    if (checkMove(0, 0, ntetro)) tetro = ntetro;
                    drawAll();
                    break;
                case 13: //Enter
                    setdrop();
                    break;
            }
        }

        // drawAllですべてが描画されているので、クリアする際は値をクリアした後にもう1度だけ
        // drawAllを呼び出す必要があった。また、新しく画像を表示した後にクリアすると画像が消えてしまう
        // ため、画像を表示する直前にクリアする必要がある。setIntervalも使用しているため、
        // tetroがnukkでない場合のみcheckMoveを実行するように条件分岐を追加した。