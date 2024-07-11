//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 味方クラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Hero
{
	// コンストラクタ
	constructor(name, maxHp, offense, speed, herb, herbPower, path)
	{
		this.name = name;            // 名前
		this.type = "hero";        // 敵味方種別
		this.maxHp = maxHp;          // 最大体力
		this.hp = maxHp;             // 体力
		this.liveFlag = true;        // 生存フラグ
		this.offense = offense;      // 攻撃力
		this.speed = speed;          // 素早さ
		this.herb = herb;            // 薬草
		this.herbPower = herbPower;  // 薬草の回復力
        this.path = path;            // 画像の場所

		//this.Hpercent = 100/this.maxHp; // hero体力バーの1%の値
		//this.Epercent = 100/this.target.maxHp; // enemy体力バーの1%の値

		//this.HPoffense = offense*this.Hpercent; // hero体力バーの1%の値にするため、攻撃力をかける
		//this.EPoffense = offense*this.Epercent; // enemy体力バーの1%の値にするため、攻撃力をかける

		this.command = "";           // 選択されたコマンド
		this.target = "";            // ターゲット
	}

	// 表示用のパラメータを返す
	getMainParameter()
	{
		return "<b>" + this.name + "</b><br>"
		       + "体力 " + this.hp + "<br>"
		       + "薬草 " + this.herb + "<br>";
	}

	// コマンドビューに表示するコマンド（HTML）を返す
	//     eventが"start"の場合
	//         はじめに表示するコマンド（HTML）を返す
	//     eventがユーザのコマンド選択の結果の場合
	//         eventに応じて、表示するコマンド（HTML）を返す、
	//         または、味方1人のコマンド選択を終了させる"end"を返す
	getCommand(event)
	{
		// はじめに表示するコマンド
		if(event === "start") {
			let text = ['<div><b id="heroName">' + this.name + '</b></div>',
			            '<div id="attackCommand">攻撃</div>',
			            '<div id="recoveryCommand">薬草</div>'];
			return text;
		}

		// 選択されたコマンドのidまたはclassを取得する
		if(event.target.id != "") {
			this.command = event.target.id;
		}
		else {
			this.command = event.target.className;
		}

		// 攻撃コマンドが選択されたとき
		if(this.command === "attackCommand") {
			// 生存している敵の配列（characters配列の要素番号）を取得する
			let livedEnemy = searchLivedcharacterByType("enemy");
			// 生存している敵をコマンドビューに表示するためのHTML
			let livedEnemyHTML = [];

			// 生存している敵をコマンドビューに表示する
			for(let c in livedEnemy) {
				livedEnemyHTML.push('<div class="enemyCommand">' +
				                    characters[livedEnemy[c]].name + '</div>');
			}
			livedEnemyHTML.unshift('<div><b id="heroName">' + this.name + '</b></div>');

			return livedEnemyHTML;
		}

		// 薬草コマンドが選択されたとき
		else if(this.command === "recoveryCommand") {
			return "end";
		}
		// 敵が選択されたとき
		else if(this.command.includes("enemyCommand")) {
    		// 攻撃の種類を定義する
			const attackTypes = [
				{ type: '打撃', className: 'panchiCommand' },
				{ type: '斬撃', className: 'slashingCommand' }
			];

			// 攻撃の種類を表示するためのHTMLを生成する
			let attackTypeHTML = attackTypes.map(attack => {
				// div要素を作成
				let div = document.createElement('div');
				div.className = attack.className;
				div.textContent = attack.type;

				// クリックイベントリスナーを追加
				div.addEventListener('click', () => selectAttackType(attack.type));

				// outerHTMLを使用して文字列として返す
				return div.outerHTML;
			});

			// ヒーロー名を先頭に追加
			attackTypeHTML.unshift('<div><b id="heroName">' + this.name + '</b></div>');

			return attackTypeHTML;
		}
		// 攻撃の種類が選択されたとき
		else if(this.command === "panchiCommand" || this.command === "slashingCommand") {
			return "end";
		}
	}

	// 表示されたコマンドにイベントハンドラを登録する
	setEventHandler(event)
	{
		// コマンドの初期状態の場合
		if(event === "start") {
			// 攻撃コマンドのイベントハンドラを設定する
			attackCommand.addEventListener("click", command.callback);
			// 回復コマンドのイベントハンドラを設定する
			recoveryCommand.addEventListener("click", command.callback);
		}
		// 攻撃コマンドが選択された場合
		if(this.command === "attackCommand") {
			let element = document.getElementsByClassName("enemyCommand");
			for(let i = 0; i < element.length; ++i) {
				element[i].addEventListener("click", command.callback);
			}
		}
		// 敵が選択された場合
		if(this.command === "enemyCommand") {
			let element = document.getElementsByClassName("panchiCommand");
			for(let i = 0; i < element.length; ++i) {
				element[i].addEventListener("click", command.callback);
			}
		}
		if(this.command === "enemyCommand") {
			let element = document.getElementsByClassName("slashingCommand");
			for(let i = 0; i < element.length; ++i) {
				element[i].addEventListener("click", command.callback);
			}
		}

	}

	// 行動する
	action()
	{
    	if(this.hp > 0) {
        	// コマンドに応じた処理を行う
        	let attackType;
       		switch(this.command) {
            	// 攻撃
            	case "panchiCommand":
                	attackType = "panchiCommand";
                	break;
           		case "slashingCommand":
                	attackType = "slashingCommand";
                	break;
            	case "enemyCommand":
                	// ここでattackTypeの値を設定するロジックが必要
					if (this.command === "panchiCommand") {
						attackType = "panchiCommand";
					} else if (this.command === "slashingCommand") {
						attackType = "slashingCommand";
					}
            	    break;
            	// 回復
            	case "recoveryCommand":
            	    this.recovery();
            	    break;
				default:
					Message.printMessage(this.name + "はボーッとした<br>");
        	}
        	switch(attackType) {
            	// 打撃攻撃
            	case "panchiCommand":
					this.target = enemy; // 攻撃対象を敵に設定
                	this.panchi();
                	break;
            	// 斬撃攻撃
            	case "slashingCommand":
					this.target = enemy; // 攻撃対象を敵に設定
                	this.slashing();
                	break;
            	default:
        	}
    	}
	}

	// 打撃攻撃
	async panchi()
	{	
    	// 攻撃相手が生存していれば攻撃する
    	if(this.target.liveFlag) {
		
    	    this.move(); // 攻撃時のキャラの移動

			// 攻撃対象のクラスがFishのときの条件式
			if(this.target instanceof Fish) {
				// 体力200に対して100pxで表現するため、0.5をかける　変数名を変える
				let fishhealth = this.offense*0.5;

				// 敵の体力から、自分の攻撃力を引く
				this.target.hp -= this.offense;

				// 敵の体力バーを変更する
				alterLife_enemy(-fishhealth); 

				Message.printMessage(this.name + "の波乗り<br>効果抜群だ！" +
									this.target.name + "に" + this.offense + "のダメージを与えた！<br>");
			}
			else if(this.target instanceof Meat) {
				let meathealth = this.offense;
				this.target.hp -= this.offense*2;
				alterLife_enemy(-meathealth*2);
								
				Message.printMessage(this.name + "の波乗り<br>" +
									this.target.name + "に" + this.offense*2 + "のダメージを与えた！<br>");
			}

    	    // 攻撃相手の体力がマイナスになる場合は、0にする
    	    if(this.target.hp < 0) {
    	        this.target.hp = 0;
    	    }
		}
    	else {
    	    Message.printMessage(this.name + "の攻撃・・・<br>" + this.target.name + "は倒れている<br>");
    	}
	}

	// 斬撃攻撃する
	async slashing()
	{
    	// 攻撃相手が生存していれば攻撃する
    	if(this.target.liveFlag) {

			this.move(); // 攻撃時のキャラの移動

			// 攻撃対象のクラスがFishのときの条件式
			if(this.target instanceof Fish) {
				// 体力200に対して100pxで表現するため、0.5をかける　変数名を変える
				let fishhealth = this.offense*0.5;

				// 敵の体力から、自分の攻撃力を引く
				this.target.hp -= this.offense*2;

				// 敵の体力バーを変更する
				alterLife_enemy(-fishhealth*2); 

				Message.printMessage(this.name + "の斬撃<br>効果抜群だ！" +
									this.target.name + "に" + this.offense*2 + "のダメージを与えた！<br>");
			}
			else if(this.target instanceof Meat) {
				let meathealth = this.offense;
				this.target.hp -= this.offense;
				alterLife_enemy(-meathealth);

				Message.printMessage(this.name + "の斬撃<br>" +
									this.target.name + "に" + this.offense + "のダメージを与えた！<br>");
			}
        	// 攻撃相手の体力がマイナスになる場合は、0にする
        	if(this.target.hp < 0) {
        	    this.target.hp = 0;
        	}
		}
    	else {
        	Message.printMessage(this.name + "の攻撃・・・<br>" + this.target.name + "は倒れている<br>");
    	}
	}
	
	//攻撃時のキャラの移動
	async move() {
		// 打撃攻撃の場合
		if(this.command === "panchiCommand") {
			// wave.pngを表示する
			document.getElementById("wave").style.display = "block";
			// wave.pngを右に移動させる
			for(let i = 0; i < 30; i++) {
				document.getElementById("wave").style.transform = "translateX(" + i + "px)";
				await sleep(10);
			}
			// wave.pngを隠す
			document.getElementById("wave").style.display = "none";
			// wave.pngを元の位置に戻す
			document.getElementById("wave").style.transform = "translateX(0px)";
		}
		// 斬撃攻撃の場合
		else if(this.command === "slashingCommand") {
			for(let i = 0; i < 100; i++) {
				document.getElementById("heroImage").style.transform = "translateX(" + i + "px)";
				await sleep(10);
			}
		}
		
		// effct1.pngを表示する
		document.getElementById("effect1").style.display = "block";

		// 主人公の画像を上に移動させる
		document.getElementById("heroImage").style.transform = "translateY(-50px)";
	
		// 1秒待つ
		await sleep(1000);
	
		// 主人公の画像を元に戻す
		document.getElementById("heroImage").style.transform = "translateY(0)";
	
		// effct1.pngを隠す
		document.getElementById("effect1").style.display = "none";

	}

	// 回復する
	recovery()
	{
		// 薬草がない場合
		if(this.herb <= 0) {
			Message.printMessage(this.name + "は薬草を・・・<br>薬草がない！<br>");
			return;
		}

		// 体力が最大体力の場合
		if(this.maxHp == this.hp) {
			Message.printMessage(this.name + "は<br>これ以上回復できない！<br>");
			return;
		}
		
		// 回復する値
		let heal = this.herbPower;

		// 自分の体力バーを変更する
		alterLife_hero(+heal*0.5);

		// 最大体力を超えて回復してしまいそうな場合
		if(this.maxHp - this.hp < this.herbPower) {
			heal = this.maxHp - this.hp;
		}

		// 体力を回復する
		this.hp += heal;

		// 薬草をひとつ減らす
		--this.herb;

		Message.printMessage(this.name + "は薬草を使った<br>体力が" + heal + "回復した！<br>");
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 敵クラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Enemy
{
	// コンストラクタ
	constructor(name, hp, offense, speed, path)
	{
		this.name = name;        // 名前
		this.type = "enemy";     // 敵味方種別
		this.hp = hp;            // 体力
		this.liveFlag = true;    // 生存フラグ
		this.offense = offense;  // 攻撃力
		this.speed = speed;      // 素早さ
		this.path = path         // 画像の場所
	}

	// 表示用のパラメータを返す
	getMainParameter()
	{
		return "<b>" + this.name + "</b><br>"
		       + "体力 " + this.hp + "<br>";
	}

	// 行動する
	action()
	{
		if(this.hp > 0) {
			this.attack();
		}
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// フィッシュクラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Fish extends Enemy
{
	// コンストラクタ
	constructor(name, hp, offense, speed, path)
	{
		super(name, hp, offense, speed, path);
	}

	// 攻撃メソッド
	attack()
	{
		// 生存している味方をランダムに選択する
		let f = characters[searchLivedcharacterRamdom("hero")];

		// 攻撃対象の体力から、自分の攻撃力を引く
		f.hp -= this.offense;

		// 攻撃対象の体力バーを変更する
		alterLife_hero(-this.offense*0.5);

		// 攻撃相手の体力がマイナスになる場合は0にする
		if(f.hp < 0) {
			f.hp = 0;
		}

		// 攻撃相手が生存していれば攻撃
		if(f.liveFlag) {
			Message.printMessage(this.name + "が襲いかかってきた<br>" +
			                     f.name + "は" + this.offense + "のダメージを受けた！<br>");
		}
		else {
			Message.printMessage(this.name + "の攻撃・・・<br>" + f.name + "は倒れている<br>");
		}
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ミートクラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Meat extends Enemy
{
	// コンストラクタ
	constructor(name, hp, offense, speed, path)
	{
		super(name, hp, offense, speed, path);
	}

	// 攻撃メソッド
	attack()
	{
		// 生存している味方をランダムに選択する
		let f = characters[searchLivedcharacterRamdom("hero")];

		// 攻撃対象の体力から、自分の攻撃力を引く
		f.hp -= this.offense;

		// 攻撃対象の体力バーを変更する
		alterLife_hero(-this.offense*0.5);

		// 攻撃相手の体力がマイナスになる場合は0にする
		if(f.hp < 0) {
			f.hp = 0;
		}

		// 攻撃相手が生存していれば攻撃
		if(f.liveFlag) {
			Message.printMessage(this.name + "が襲いかかってきた<br>" +
			                     f.name + "は" + this.offense + "のダメージを受けた！<br>");
		}
		else {
			Message.printMessage(this.name + "の攻撃・・・<br>" + f.name + "は倒れている<br>");
		}
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 調理後画像クラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Item extends Enemy
{
	// コンストラクタ
	constructor(name, path)
	{
		super(name, 0, 0, 0, path);
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ゲーム管理クラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class GameManage
{
	// コンストラクタ
	constructor()
	{
		// 行動の順番を決める
		this.actionOrder();

		// パラメータを表示する
		this.showParameter();

        // 主人公の画像を表示する
        this.showHeroImage();

		// 敵の画像を表示する
		this.showEnemyImage();

		// 波の画像を表示する
		this.showWaveImage();

		// エフェクトの画像を表示する
		this.showEffectImage();

		// はじめのメッセージを表示する
		this.showFirstMessage();

		// Mを押すとBGMが流れる
		// BGM用のAudioオブジェクトを初期化
        this.bgm = new Audio('../music/battle1.mp3');
		document.addEventListener('keydown', (event) => {
			if(event.key === 'm') {
				this.playBGM();
			}
		});
	}

	// 行動の順番を決める
	actionOrder()
	{
		// 素早さでソートする
		characters.sort(
			function (a, b)
			{
				return b.speed - a.speed;
			}
		);
	}

	// パラメータを表示または更新する
	showParameter()
	{
		// パラメータを消去する
		parameterView.innerHTML = "";

		// 味方のパラメータを表示する
		for(let c in characters) {
			if(characters[c].type === "hero") {
				parameterView.innerHTML += '<div class="parameter">' +
				                           characters[c].getMainParameter() + '</div>';
			}
		}

		// 敵のパラメータをコンソールに表示する
		for(let c in characters) {
			if(characters[c].type === "enemy" ) {
				parameterView.innerHTML += '<div class="parameter">' +
				                           characters[c].getMainParameter() + '</div>';
			}
		}
	}

    // 主人公の画像を表示する
    showHeroImage() {
        if (characters[0].type === "hero") {
            ImageView.innerHTML += '<img id="heroImage" src="' + characters[0].path 
            + '" style="position:absolute; left:100px; bottom:0px">';
        }
    }

	// 敵の画像を表示する
	showEnemyImage()
	{
		for(let c in characters) {
			if(characters[c].type === "enemy") {
				ImageView.innerHTML += '<img id="enemyImage' + c + '" src="' + characters[c].path
				+ '" style="position:absolute; left:350px; bottom: 50px">';
			}
		}
	}

	// 波の画像を表示する
	showWaveImage()
	{
		ImageView.innerHTML += '<img id="wave" src="../img/wave.png" style="position:absolute; left:250px; bottom:50px">';
		// wave.pngを隠す
		document.getElementById("wave").style.display = "none";
	}

	// エフェクトの画像を表示する
	showEffectImage()
	{
		ImageView.innerHTML += '<img id="effect1" src="../img/effect1.png" style="position:absolute; left:350px; bottom:50px">';
		// effct1.pngを隠す
		document.getElementById("effect1").style.display = "none";
	}

	// 戦闘開始時のメッセージを表示する
	showFirstMessage()
	{
		Message.printMessage("モンスターが現れた<br>");
	}

	// 倒れたキャラクターを処理する
	removeDiedCharacter()
	{
		for(let c in characters) {
			if(characters[c].hp <= 0 && characters[c].liveFlag === true) {

				Message.addMessage(characters[c].name + "は倒れた<br>");
				// 生存フラグを落とす
				characters[c].liveFlag = false;

				// 敵の場合は画像を削除
				if(characters[c].type === "enemy") {
					document.getElementById("enemyImage" + c).remove();
					
					// 新しい画像を表示する  魚とかによって変更する関数追加の必要あり
					ImageView.innerHTML += '<img id="enemyImage" src="../img/maguro.png" style="position:absolute; left:350px; bottom:50px">';
					//ImageView.innerHTML += '<img id="enemyImage" src="../img/gyuniku.png" style="position:absolute; left:350px; bottom:50px">';
				}
			}
		}
	}

	// 勝敗の判定をする
	jadgeWinLose()
	{
		// 味方が残っていなければゲームオーバー
		if(! isAliveByType("hero")) {
			Message.addMessage("全滅しました・・・<br>");
			return "lose";
		}

		// 敵が残っていなければ勝利
		if(! isAliveByType("enemy")) {
			Message.addMessage("モンスターをやっつけた<br>");
			return "win";
		}

		return "none";
	}

	// 1ターン
	async battle()
	{
		// 勝敗
		let winLose = "none";

		for(let c in characters) {
			// 倒れたキャラクターはスキップする
			if(characters[c].liveFlag === false) {
				continue;
			}

			await sleep(900);

			// 各キャラクターの行動
			characters[c].action();

			await sleep(1100);

			// パラメータを更新する
			this.showParameter();

			await sleep(900);

			// 倒れたキャラクターを処理する
			this.removeDiedCharacter();

			await sleep(300);

			// 勝敗の判定をする
			winLose = this.jadgeWinLose();

			// 決着がついた場合
			if (winLose === "win" || winLose === "lose") {
				// BGMを止める
				this.stopBGM();

				// 別の画面を表示する処理を書く
				// 例えば、勝利画面を表示する場合
				if (winLose === "win") {
					// 勝利画面を表示する処理を書く
					//マウスをクリックをするとDrawWinが呼ばれる
					document.addEventListener("click", DrawWin);
					console.log("You win!");
				} else {
					// 敗北画面を表示する処理を書く
					//マウスをクリックをするとDrawLoseが呼ばれる
					document.addEventListener("click", DrawLose);
					console.log("You lose...!");
				}
				return false;
			}
		}
		return true;
	}

	// BGMを再生する
	playBGM() {
		if (this.bgm.paused) {
			this.bgm.play();
		}
	}

	// BGMを停止する（必要に応じて）
	stopBGM() {
		this.bgm.pause();
		this.bgm.currentTime = 0;
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// コマンドクラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Command
{
	// コンストラクタ
	constructor()
	{
		// コマンドを実行する味方
		this.heroElementNum = [];
		// 何人目の味方がコマンド選択中か（0が1人目）
		this.current = 0;
	}

	// コマンド入力の準備をする
	preparation()
	{
		// コマンドを実行する味方の配列を空にする
		this.heroElementNum.splice(0);

		// コマンドを選択する味方を配列に詰める
		for(let c in characters) {
			if(characters[c].type === "hero" && characters[c].liveFlag === true) {
				this.heroElementNum.push(c);
			}
		}

		// 味方のコマンドを取得する
		let text = characters[this.heroElementNum[this.current]].getCommand("start");

		// コマンドを表示する
		this.showCommand(text);

		// イベントハンドラを登録する
		characters[this.heroElementNum[this.current]].setEventHandler("start");
	}

	// コマンドを表示する
	showCommand(commands)
	{
		commandView.innerHTML = commands.join("");
	}

	// コマンドをクリックしたときのコールバック関数
	callback(event)
	{
		// 味方のコマンド選択
		let result = command.commandTurn(event)

		// 味方全員のコマンド選択が終わった場合
		if(result) {
			// 戦闘開始
			let promise = gameManage.battle();

			// gameManage.battle()が終了したときに実行される
			promise.then(
				// boolは、gameManage.battle()の戻り値
				function(bool)
				{
					// 戦闘が終了していない場合、コマンドを表示する
					if(bool) {
						command.preparation();
					}
				}
			);
		}
	}

	// 味方全員のコマンド選択が終わったらtrueを返す
	commandTurn(event)
	{
		// 味方1人のコマンドを取得する
		let result = characters[this.heroElementNum[this.current]].getCommand(event);

		// 味方1人のコマンド入力が終わりの場合
		if (result === "end") {

			// コマンドを選択していない味方が残っている場合
			if(! (this.current === this.heroElementNum.length - 1)) {
				// 次の味方
				++this.current;
				// 味方のコマンドを取得する
				let text = characters[this.heroElementNum[this.current]].getCommand("start");
				// コマンドを表示する
				this.showCommand(text);
				// 表示されたコマンドにイベントハンドラを割り当てる
				characters[this.heroElementNum[this.current]].setEventHandler("start");
			}
			// 味方全員のコマンド選択が終わった場合
			else {
				// コマンドビューを空白にする
				commandView.innerHTML = "";

				this.current = 0;
				return true;
			}
		}
		// 味方1人のコマンド入力が終わっていない場合
		else {
			// 次のコマンドを表示して、イベントハンドラを登録する
			this.showCommand(result);
			// 表示されたコマンドにイベントハンドラを割り当てる
			characters[this.heroElementNum[this.current]].setEventHandler();
		}

		return false;
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// メッセージクラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Message
{
	// メッセージを表示する
	static printMessage(text)
	{
		messageView.innerHTML = text;
	}

	// メッセージを追加する
	static addMessage(text)
	{
		messageView.innerHTML += text;
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// characters配列関連
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 種別（type）で指定されたキャラクターが、全滅しているか調べる
function isAliveByType(type)
{
	for(let c in characters) {
		// 1人でも生存していればtrueを返す
		if(characters[c].type === type && characters[c].liveFlag === true) {
			return true;
		}
	}
	// 全滅しているときはfalseを返す
	return false;
}

// 名前でキャラクターを探索し、配列の要素番号を返す
function searchCharacterByName(name)
{
	// 探索した配列の要素番号
	let characterElementNum = [];

	// 指定されたキャラクターを探す
	let i = 0;
	for(let c in characters) {
		if(characters[c].name === name) {
			characterElementNum.push(i);
		}
		++i;
	}

	return characterElementNum;
}

// 種別（type）で指定された生存しているキャラクターを探し、配列の要素番号を返す
function searchLivedcharacterByType(type)
{
	// 種別（type）で指定された生存しているキャラクター配列の要素番号
	let characterElementNum = [];

	// 種別（type）で指定された生存しているキャラクターを探す
	let i = 0;
	for(let c in characters) {
		if(characters[c].type === type && characters[c].liveFlag === true) {
			characterElementNum.push(i);
		}
		++i;
	}

	return characterElementNum;
}

// 種別（type）で指定された生存しているキャラクターの要素番号をランダムで返す
function searchLivedcharacterRamdom(type)
{
	// 生存しているキャラクター
	let livedcharacter = [];

	// 生存しているキャラクターを探して、その要素番号を配列に詰める
	let i = 0;
	for(let c in characters) {
		if(characters[c].type === type && characters[c].liveFlag === true) {
			livedcharacter.push(i)
		}
		++i;
	}

	// 生存しているキャラクターのなかからランダムで1人選ぶ
	let randomValue = getRandomIntInclusive(0, livedcharacter.length - 1);

	return livedcharacter[randomValue];
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ツール
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// msミリ秒スリープする
function sleep(ms)
{
	return new Promise(
		function(resolve)
		{
			// msミリ秒スリープする
			setTimeout(resolve, ms);
		}
	);
}

// minからmaxまでのランダムな整数を返す
function getRandomIntInclusive(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}