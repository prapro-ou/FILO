class CommandBattle{
    // キャラクターをインスタンス化する
    constructor(){
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
    /*this.characters.push(hero);     // 主人公
    //this.characters.push(tuna);     // 敵
    //this.characters.push(usi);      // 敵
    this.characters.push(enemy);     // 
    */
   
    // ゲーム管理クラスをインスタンス化する
    this.gameManage = new GameManage(this.characters);

    // コマンドクラスをインスタンス化する
    this.command = new Command();

    // コマンド選択の準備を整える
    this.command.preparation();

    update();
    }
}