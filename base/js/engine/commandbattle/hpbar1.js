class HealthBar {
    constructor() {
        // 体力バーの表示
        //this.inputSlider = document.querySelector("#inputSlider");
        //this.inputSlider.src = "../img/hp.png";
        //this.inputSliderResult = document.querySelector("#inputSliderResult");

        // ヒーローのライフバーの表示
        this.lifeBar_hero = document.getElementsByClassName('herolife-bar')[0]; // ライフバー
        this.lifeMark_hero = document.getElementsByClassName('herolife-mark')[0]; // ライフの光部分
        this.life_hero = 100; // ライフ初期値
        this.lifeBar_hero.style.width = "100%"; // ライフ初期幅

        // 敵のライフバーの表示
        this.lifeBar_enemy = document.getElementsByClassName('enemylife-bar')[0]; // ライフバー
        this.lifeMark_enemy = document.getElementsByClassName('enemylife-mark')[0]; // ライフの光部分
        this.life_enemy = 100; // ライフ初期値
        this.lifeBar_enemy.style.width = "100%"; // ライフ初期幅

        // イベントリスナーの設定
        //this.setupEventListeners();
    }
/*
    setupEventListeners() {
        // changeイベントはゲージの操作が終わってから値を取得する
        this.inputSlider.addEventListener("change", (e) => {
            const value = e.target.value; // inputSliderの値を取得
            this.inputSliderResult.innerHTML = value;
        });
    }*/

    // *** ヒーローのライフ変更処理 ***
    alterLife_hero(value) {
        // lifeの値を算出する
        this.life_hero += value;
        if (this.life_hero <= 0) {
            // 算出の結果 0 以下になった場合
            this.life_hero = 0;
            // 0.3秒後に光部分を非表示にする
            setTimeout(() => {
                this.lifeMark_hero.style.visibility = 'hidden';
            }, 300);
        } else {
            // 算出の結果 100 を超過した場合
            if (this.life_hero > 100) {
                this.life_hero = 100;
            }
        }
        // ライフバーの幅を更新
        this.lifeBar_hero.style.width = `${this.life_hero}%`;
    }

    // *** 敵のライフ変更処理 ***
    alterLife_enemy(value) {
        // lifeの値を算出する
        this.life_enemy += value;
        if (this.life_enemy <= 0) {
            // 算出の結果 0 以下になった場合
            this.life_enemy = 0;
            // 0.3秒後に光部分を非表示にする
            setTimeout(() => {
                this.lifeMark_enemy.style.visibility = 'hidden';
            }, 300);
        } else {
            // 算出の結果 100 を超過した場合
            if (this.life_enemy > 100) {
                this.life_enemy = 100;
            }
            // 光部分を表示する
            this.lifeMark_enemy.style.visibility = 'visible';
        }
        // スタイル(幅)を更新する
        this.lifeBar_enemy.style.width = `${this.life_enemy}%`;
    }
}


/*
// 体力バーの表示
const inputSlider = document.querySelector
("#inputSlider");
inputSlider.src = "../img/hp.png";
const inputSliderResult = document.querySelector
("#inputSliderResult");

//inputSlider.value = 100;

// changeイベントはゲージの操作中も値を取得する
//inputSlider.addEventListener("input", (e) => {
//    const value = e.target.value; // inputSliderの値を取得
//    inputSliderResult.innerHTML = value;
//});

// changeイベントはゲージの操作が終わってから値を取得する
inputSlider.addEventListener("change", (e) => {
    const value = e.target.value; // inputSliderの値を取得
    inputSliderResult.innerHTML = value;
});

// 体力バーの表示
const lifeBar_hero = document.getElementsByClassName('herolife-bar')         // ライフバー
const lifeMark_hero = document.getElementsByClassName('herolife-mark')       // ライフの光部分
let life_hero = 100                                            // ライフ初期値
lifeBar_hero.style.width = "100%"                                // ライフ初期幅

// *** ライフ変更処理 ***
function alterLife_hero( value ){
    // lifeの値を算出する
    life_hero += value 
    if ( life_hero <= 0 ){
        // 算出の結果 0 以下になった場合
        life_hero = 0
        // 0.3秒後に光部分を非表示にする
        setTimeout(function(){
            lifeMark_hero.style.visibility = 'hidden'
        }, 300)
    } else {
        // 算出の結果 100 を超過した場合
        if ( life_hero > 100 ) {
            life_hero = 100
        }
        // 光部分を表示する
        lifeMark_hero.style.visibility = 'visible'
    }
    // スタイル(幅)を更新する
    lifeBar_hero.style.width = life_hero + "%"
}

// 敵の体力バーの表示
const lifeBar_enemy = document.getElementsByClassName('enemylife-bar')         // ライフバー
const lifeMark_enemy = document.getElementsByClassName('enemylife-mark')       // ライフの光部分
let life_enemy = 100                                                  // ライフ初期値
lifeBar_enemy.style.width = "100%"                                // ライフ初期幅

// *** ライフ変更処理 ***
function alterLife_enemy( value ){
    // lifeの値を算出する
    life_enemy += value 
    if ( life_enemy <= 0 ){
        // 算出の結果 0 以下になった場合
        life_enemy = 0
        // 0.3秒後に光部分を非表示にする
        setTimeout(function(){
            lifeMark_enemy.style.visibility = 'hidden'
        }, 300)
    } else {
        // 算出の結果 100 を超過した場合
        if ( life_enemy > 100 ) {
            life_enemy = 100
        }
        // 光部分を表示する
        lifeMark_enemy.style.visibility = 'visible'
    }
    // スタイル(幅)を更新する
    lifeBar_enemy.style.width = life_enemy + "%"
}*/