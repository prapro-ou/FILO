        //落ちるスピード
        const GAME_SPEED = 300;

        //フィールドサイズ
        const FIELD_COL = 22;
        const FIELD_ROW = 25;

        //ブロック一つのサイズ（ピクセル）
        const BLOCK_SIZE = 30;

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
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

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
        setInterval(dropTetro, GAME_SPEED);

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
            field[24][10] =1;
            field[24][11] =1;
        }

        //ブロック一つを描画する
        function drawBlock(x, y, c)
        {
            let px = x * BLOCK_SIZE;
            let py = y * BLOCK_SIZE;
            con.fillStyle=TETRO_COLORS[c];
            con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
            con.strokeStyle="black";
            con.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

        }

        //全部描画する
        function drawAll()
        {
            con.clearRect(0, 0, SCREEN_W, SCREEN_H);
        
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
            for (let y=0; y<TETRO_SIZE; y++)
            {
                for (let x = 0; x<TETRO_SIZE; x++)
                {
                    if ( tetro[y][x] )
                    {
                        drawBlock(tetro_x + x, tetro_y + y, 1);
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
        function dropTetro()
        {
            if (checkMove(direction, 0, tetro)){
                tetro_x += direction;
            } else {
                direction = -direction;
                tetro_x += direction;
            }
            //else
            //{
              //  fixTetro();


                //tetro_t = Math.floor(Math.random() * (TETRO_TYPES.length-1)) + 1;
                //tetro = TETRO_TYPES[ tetro_t ];
                //tetro_x = START_X;
                //tetro_y = START_Y;
            //}

            drawAll();
        }

        //テトラミノを動かす（キーボードが押されたとき）
        document.onkeydown = function(e)
        {
            //onkeydown keycode 検索
            switch( e.keyCode )
            {
                case 37: //左
                    if ( checkMove(-1, 0, tetro) ) tetro_x--;
                    break;
                case 39: //右
                    if ( checkMove(1, 0, tetro) ) tetro_x++;
                    break;
                case 40: //下
                    if ( checkMove(0, 1, tetro) ) tetro_y++;
                    break;
                case 32: //スペース
                    let ntetro = rotate();
                    if (checkMove(0, 0, ntetro)) tetro = ntetro;
                    break;
            }
            drawAll();
        }
