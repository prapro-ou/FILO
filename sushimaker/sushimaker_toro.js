    (function makeToro() {        
        //落ちるスピード
        const DROP_SPEED = 130;
        const GAME_SPEED = 20;

        //フィールドサイズ
        const FIELD_COL = 40;
        const FIELD_ROW = 23;

        //ブロック一つのサイズ（ピクセル）
        const BLOCK_SIZE = 20;

        //キャンバスサイズ
        const SCREEN_W = BLOCK_SIZE * FIELD_COL;
        const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

        //テトロミノのサイズ
        const TETRO_SIZE = 4;

        //色
        const TETRO_COLORS = [
            "#FFF",             //0白
            "#C90"              //1茶
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
        '../sushi_img/toro_sashimi1.png',
        '../sushi_img/toro_sashimi2.png',
        '../sushi_img/toro_sashimi3.png',
        '../sushi_img/toro_sashimi4.png'
        ];

        imagePaths.forEach((path, index) => {
        blockImages[index] = new Image();
        blockImages[index].src = path;
        });

        // 画像パスを配列に格納
        const sushiRiceImages = ['../sushi_img/shari1_1.png', '../sushi_img/shari1_2.png', '../sushi_img/shari1_3.png', '../sushi_img/shari1_4.png',
                                 '../sushi_img/shari1_5.png', '../sushi_img/shari1_6.png', '../sushi_img/shari1_7.png', '../sushi_img/shari1_8.png',
                                 '../sushi_img/baran.png'];

        // 画像オブジェクトを格納する配列を初期化
        let sushiRiceImg = sushiRiceImages.map(path => {
            let img = new Image();
            img.src = path;
            return img;
        });

        

        //初期位置
        const START_X = FIELD_COL/2 - TETRO_SIZE/2;
        const START_Y = 0;

        //障害物の初期位置
        const START_BX = FIELD_COL/2 - TETRO_SIZE/2;
        const START_BY = FIELD_ROW/2;

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

        let direction = 1; // 1:右, 0:停止，-1:左

        let Good = 0;

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
            //シャリ
            field[21][19] =1;
            field[21][20] =2;
            field[21][21] =3;
            field[21][22] =4;
            field[22][19] =5;
            field[22][20] =6;
            field[22][21] =7;
            field[22][22] =8;

            //障害物に画像を割り当てる 後で適切に変更する
            field[4][0] =9;
            field[4][6] =9;
            field[4][7] =9;
            field[4][8] =9;
            field[4][9] =9;
            field[4][10] =9;
            field[4][11] =9;
            field[4][12] =9;
            field[4][13] =9;
            field[4][14] =9;
            field[4][15] =9;
            field[4][16] =9;
            field[4][17] =9;
            field[4][18] =9;
            field[4][19] =9;
            field[4][20] =9;
            field[4][21] =9;
            field[4][22] =9;
            field[4][23] =9;
            field[4][24] =9;
            field[4][25] =9;
            field[4][26] =9;
            field[4][27] =9;
            field[4][28] =9;
            field[4][29] =9;
            field[4][30] =9;
            field[4][31] =9;
            field[4][32] =9;
            field[4][33] =9;
            field[4][34] =9;
            field[4][35] =9;
            field[4][36] =9;
            field[4][37] =9;
            field[4][38] =9;
            field[4][39] =9;

            field[8][0] =9;
            field[8][1] =9;
            field[8][2] =9;

            field[7][10] =9;
            field[7][11] =9;
            field[7][12] =9;
            field[7][13] =9;
            field[7][14] =9;
            field[7][15] =9;
            field[7][16] =9;
            field[7][17] =9;
            field[7][18] =9;
            field[7][19] =9;

            field[12][0] =9;
            field[12][1] =9;
            field[12][2] =9;
            field[12][3] =9;
            field[12][4] =9;
            field[12][5] =9;
            field[12][6] =9;
            field[12][7] =9;

            field[12][12] =9;
            field[12][13] =9;
            field[12][14] =9;
            field[12][15] =9;
            field[12][16] =9;
            field[12][17] =9;
            field[12][18] =9;
            field[12][19] =9;
            field[12][20] =9;
            field[12][21] =9;
            field[12][22] =9;
            field[12][23] =9;
            field[12][24] =9;
            field[12][25] =9;
            field[12][26] =9;
            field[12][27] =9;
            field[12][28] =9;
            field[12][29] =9;
            field[12][30] =9;
            field[12][31] =9;
            field[12][32] =9;
            field[12][33] =9;
            field[12][34] =9;
            field[12][35] =9;
            field[12][36] =9;
            field[12][37] =9;
            field[12][38] =9;
            field[12][39] =9;

            field[14][15] =9;
            field[14][16] =9;
            field[14][17] =9;

            field[16][23] =9;
            field[16][24] =9;
            field[16][25] =9;
            field[16][26] =9;
            field[16][27] =9;
            field[16][28] =9;
            field[16][29] =9;
            field[16][30] =9;
            field[16][31] =9;
            field[16][32] =9;
            field[16][33] =9;
            field[16][34] =9;
            field[16][35] =9;
            field[16][36] =9;
            field[16][37] =9;
            field[16][38] =9;
            field[16][39] =9;

            field[10][33] =9;
            field[10][34] =9;
            field[10][35] =9;

            field[17][0] =9;
            field[17][1] =9;
            field[17][2] =9;
            field[17][3] =9;
            field[17][4] =9;
            field[17][5] =9;
            field[17][6] =9;
            field[17][7] =9;
            field[17][8] =9;
            field[17][9] =9;
            field[17][10] =9;

            field[17][20] =9;
            field[17][21] =9;
            field[17][22] =9;

            field[20][2] =9;
            field[20][3] =9;
            field[20][4] =9;
            field[20][5] =9;
            field[20][6] =9;
            field[20][7] =9;
            field[20][8] =9;
            field[20][9] =9;
            field[20][10] =9;
            field[20][11] =9;
            field[20][12] =9;
            field[20][13] =9;
            field[20][14] =9;
            field[20][15] =9;


            field[19][27] =9;
            field[19][28] =9;
            field[19][29] =9;
            field[19][30] =9;

        }

        //ブロック一つを描画する
        function drawBlock(x, y, c)
        {
            let px = x * BLOCK_SIZE;
            let py = y * BLOCK_SIZE;
            if (field[y][x] == 1 || field[y][x] == 2 || field[y][x] == 3 || field[y][x] == 4 ||
                field[y][x] == 5 || field[y][x] == 6 || field[y][x] == 7 || field[y][x] == 8 || field[y][x] == 9) {
                // シャリの画像を描画
                con.drawImage(sushiRiceImg[field[y][x] - 1], px, py, BLOCK_SIZE, BLOCK_SIZE);
            } 
            else {
                // 通常のブロックを描画
                con.fillStyle=TETRO_COLORS[c];
                con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
            }

        }

        //全部描画する
        function drawAll()
        {
            con.clearRect(0, 0, SCREEN_W, SCREEN_H);
        
            // 背景色を設定
            con.fillStyle = "#b8860b" // ここで好きな背景色を指定
            con.fillRect(0, 0, SCREEN_W, SCREEN_H);

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
            console.log("tetro_x = " + tetro_x + " tetro_y = " + tetro_y);
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

        //ブロックの左右の移動
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
                context.drawImage(img, (BLOCK_SIZE*FIELD_COL)/2-35, (BLOCK_SIZE*FIELD_ROW)/2-15, BLOCK_SIZE*3, BLOCK_SIZE*3);
            };
            // シャリにネタが乗ったとき
            if (Good == 1){
                img.src = '../sushi_img/sushi_nigiri_toro.png'; // 表示する画像のパス
                console.log("showImage");

                // 効果音を再生
                let audio = new Audio('../sushi_sound/cheers.mp3');
                audio.play();
            } 
        }

        function set_drop(){
            // テトラミノをスライドさせる動きを停止
            clearInterval(slideTetro);
            setInterval(dropTetro, DROP_SPEED)
            dropTetro();
        }


        //ブロックの落ちる処理
        function dropTetro()
        { 
            direction = 0;
            // tetroがnullでないことを確認
            if (tetro !== null){
                // tetroがnullでない場合のみcheckMoveを実行
                if (checkMove(0, 0, tetro)){
                    tetro_y++;
                    drawAll();
                } else {
                    // tetroがシャリに乗ったときGood=1に
                    if (tetro_y === FIELD_ROW - 3) {
                        Good = 1;
                        console.log("Good");
                    } else {
                        //シャリにネタが乗らなかったとき効果音を鳴らし，restGAME()を呼び出す
                        let crashAudio = new Audio('../sushi_sound/crash.mp3');
                        crashAudio.play();
                        setTimeout(() => {
                            resetGame();
                        }, 1000); //一秒後にリロード
                    }
                    // テトラミノの消去
                    clearTetrominos();
                    // テトラミノが消えた後、2秒後に画像を表示する
                    setTimeout(showImage, 1000); // 1000ミリ秒 = 1秒
                }       
            } 
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
                case 13: //Enter
                    set_drop();
                    // 効果音を再生
                    let dropAudio = new Audio('../sushi_sound/drop.mp3');
                    dropAudio.play();
                    break;
            }
        }
    })();

        // drawAllですべてが描画されているので、クリアする際は値をクリアした後にもう1度だけ
        // drawAllを呼び出す必要があった。また、新しく画像を表示した後にクリアすると画像が消えてしまう
        // ため、画像を表示する直前にクリアする必要がある。setIntervalも使用しているため、
        // tetroがnullでない場合のみcheckMoveを実行するように条件分岐を追加した。