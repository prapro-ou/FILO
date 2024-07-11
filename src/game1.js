// キャラクターをインスタンス化する
let hero  = new Hero("シェフ", 200, 50, 20, 3, 30, "../img/chef.png"  );  // 主人公
let enemy  = new Fish("さかな", 100, 40, 10,       "../img/sakana.png");  // まぐろ
//let enemy = new Meat("うし"  , 100, 40, 10,       "../img/usi.png"   );  // うし
let item  = new Item("まぐろ", "../img/maguro.png");      // まぐろ刺身
//let item2 = new Item("牛肉"  , "../img/gyuniku.png");     // 牛肉

// キャラクター配列をつくる
let characters = [];
characters.push(hero);     // 主人公
//characters.push(tuna);     // 敵
//characters.push(usi);      // 敵
characters.push(enemy);     // 

// ゲーム管理クラスをインスタンス化する
let gameManage = new GameManage();

// コマンドクラスをインスタンス化する
let command = new Command();

// コマンド選択の準備を整える
command.preparation();

// BGMを再生する関数
function playBGM() {
    // Audioオブジェクトを作成し、BGMファイルのパスを指定
    var bgm = new Audio('../music/battle1.mp3');
    
    // BGMを再生
    bgm.play()
        .then(() => console.log("BGMの再生を開始しました。"))
        .catch(error => console.error("BGMの再生に失敗しました。", error));
}