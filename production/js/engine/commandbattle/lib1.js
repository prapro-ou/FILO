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
		this.characters = "";        // キャラクター配列

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
			let text = ['<div><b id="heroName">' + this.name + '</b></div>' +
			            '<div id="attackCommand">攻撃</div>' +
			            '<div id="recoveryCommand">薬草</div>'];
			return text.join('');
		}

		console.log("getCommand");
		// 選択されたコマンドのidまたはclassを取得する
		if (event.target.id) {
			this.command = event.target.id;
		} else if (event.target.className) {
			this.command = event.target.className;
		}

		// 攻撃コマンドが選択されたとき
		if(this.command === "attackCommand") {
			console.log(this.command);
			// 生存している敵の配列（characters配列の要素番号）を取得する
			let livedEnemy = searchLivedcharacterByType(this.characters, "enemy");
			console.log(livedEnemy)

			// 生存している敵をコマンドビューに表示するためのHTMLを生成する
			let livedEnemyHTML = livedEnemy.map(enemyIndex => 
				'<div class="enemyCommand" data-enemy-index="' + enemyIndex + '">' + this.characters[enemyIndex].name + '</div>'
			);

			// ヒーロー名を先頭に追加
			livedEnemyHTML.unshift('<div><b id="heroName">' + this.name + '</b></div>');

			// 配列を文字列に変換
			livedEnemyHTML = livedEnemyHTML.join('');   // .join('')とすることで配列を文字列に変換する際に区切り文字を指定
						
			return livedEnemyHTML;
		}

		// 薬草コマンドが選択されたとき
		else if(this.command === "recoveryCommand") {
			console.log(this.command);
			Message.clearMessage();
			return "end";
		}

		// 敵が選択されたとき
		if (this.command === "enemyCommand") {
			console.log("あああ");
			return this.getAttackOptionsHTML();
			//return "continue";
		}
		// 攻撃の種類が選択されたとき
		if(this.command === "panchiCommand" || this.command === "slashingCommand") {
			console.log(this.command);
			Message.clearMessage();
			return "end";
		}
	}
	
	// attackCommandが選択されたときに表示する攻撃オプションのHTMLを返す
	getAttackOptionsHTML() {
		const attackTypes = [
			{ type: '絞める', className: 'panchiCommand'},
			{ type: '捌く', className: 'slashingCommand'}
		];


		// 攻撃の種類を表示するためのHTMLを生成する
		let attackTypeHTML = attackTypes.map(attack => {
			return `<div class="${attack.className}">${attack.type}</div>`;
		});
			
		// ヒーロー名を先頭に追加
		attackTypeHTML.unshift('<div><b id="heroName">' + this.name + '</b></div>');
		console.log(this.command);
		return attackTypeHTML.join('');
	}

	// 攻撃コマンドが選択されたときに表示する攻撃オプションのHTMLを返す
	/*updateCommandViewWithAttackOptions(selectedEnemyIndex) {
		const attackOptionsHTML = this.getAttackOptionsHTML();
		document.querySelector('.commandView').innerHTML = attackOptionsHTML;
		document.querySelector('.panchiCommand').addEventListener('click', () => this.panchi(selectedEnemyIndex));
		document.querySelector('.slashingCommand').addEventListener('click', () => this.slashing(selectedEnemyIndex));
	}*/

	/*いらないかも
	// 表示されたコマンドにイベントハンドラを登録する
	setEventHandler(event)
	{
		console.log(event);
		// コマンドの初期状態の場合
		if(event === "start") {
			// 攻撃コマンドのイベントハンドラを設定する
			document.getElementById("attackCommand").addEventListener("click", (e) => this.command.callback(e));
			// 回復コマンドのイベントハンドラを設定する
			recoveryCommand.addEventListener("click", this.command.callback);
		}
		// 攻撃コマンドが選択された場合
		if(this.command === "attackCommand") {
			console.log("attackCommand");
			let element = document.getElementsByClassName("enemyCommand");
			for(let i = 0; i < element.length; ++i) {
				element[i].addEventListener("click", this.command.callback);
			}
		}
		// 敵が選択された場合
		if(this.command === "enemyCommand") {
			let element = document.getElementsByClassName("panchiCommand");
			for(let i = 0; i < element.length; ++i) {
				element[i].addEventListener("click", this.command.callback);
			}
		}
		if(this.command === "enemyCommand") {
			let element = document.getElementsByClassName("slashingCommand");
			for(let i = 0; i < element.length; ++i) {
				element[i].addEventListener("click", this.command.callback);
			}
		}

	}*/

	// 行動する
	action()
	{
    	if(this.hp > 0) {
        	// コマンドに応じた処理を行う
        	let attackType = "";
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
					Message.clearMessage();
					Message.printMessage(this.name + "はボーッとした<br>");
        	}
        	switch(attackType) {
            	// 打撃攻撃
            	case "panchiCommand":
					// 攻撃対象を敵に設定
					this.target = this.characters[searchLivedcharacterRamdom(this.characters, "enemy")];
					this.panchi();
					break;
            	// 斬撃攻撃
            	case "slashingCommand":
					// 攻撃対象を敵に設定
					this.target = this.characters[searchLivedcharacterRamdom(this.characters, "enemy")];
                	this.slashing();
                	break;
            	default:
        	}
    	}
	}

	// 打撃攻撃
	async panchi()
	{	
		//const enemy = this.characters[enemyIndex];
    	const attackType = "panchiCommand";
		console.log("打撃攻撃が" + this.target.name + "にヒットしました！");
		// 攻撃相手が生存していれば攻撃する
    	if(this.target.liveFlag) {
		
    	    this.move(attackType); // 攻撃時のキャラの移動

			// 攻撃対象のクラスがFishのときの条件式
			if(this.target instanceof Fish) {
				// 体力200に対して100pxで表現するため、0.5をかける　変数名を変える
				//let panchi_fish = this.offense*0.5;

				// 敵の体力から、自分の攻撃力を引く
				this.target.hp -= this.offense;

				Message.printMessage(this.name + "の水絞め<br>" + 
					this.target.name + "に" + this.offense + "のダメージを与えた！<br>");
			}
			else if(this.target instanceof Mollusk) {
				//let molluskhealth = this.offense;
				this.target.hp -= this.offense*2;
								
				Message.printMessage(this.name + "の水締め<br>効果抜群だ！" +
					this.target.name + "に" + this.offense*2 + "のダメージを与えた！<br>");
			}
    	    // 攻撃相手の体力がマイナスになる場合は、0にする
    	    if(this.target.hp < 0) {
				this.target.hp = 0;
    	    }
			// 敵の体力バーを変更する
				alterLife_enemy(this.target.hp, this.target.maxHp); 
		}
    	else {
    	    Message.printMessage(this.name + "の攻撃・・・<br>" + this.target.name + "は倒れている<br>");
    	}
	}

	// 斬撃攻撃する
	async slashing()
	{
		//const enemy = this.characters[enemyIndex];
		const attackType = "slashingCommand";
    	console.log("斬撃攻撃が" + this.target.name + "にヒットしました！");
    	// 攻撃相手が生存していれば攻撃する
		if(this.target.liveFlag) {

			this.move(attackType); // 攻撃時のキャラの移動

			// 攻撃対象のクラスがFishのときの条件式
			if(this.target instanceof Fish) {
				// 体力200に対して100pxで表現するため、0.5をかける　変数名を変える
				//let fishhealth = this.offense*0.5;

				console.log(this.target.hp);
				// 敵の体力から、自分の攻撃力を引く
				this.target.hp -= this.offense*2;
				console.log(this.target.hp);

				Message.printMessage(this.name + "の三枚おろし<br>効果抜群だ！" +
					this.target.name + "に" + this.offense*2 + "のダメージを与えた！<br>");
			}
			else if(this.target instanceof Mollusk) {
				//let molluskhealth = this.offense;
				this.target.hp -= this.offense;

				Message.printMessage(this.name + "の三枚おろし<br>" +
					this.target.name + "に" + this.offense + "のダメージを与えた！<br>");
			}
        	// 攻撃相手の体力がマイナスになる場合は、0にする
        	if(this.target.hp < 0) {
        	    this.target.hp = 0;
        	}
			// 敵の体力バーを変更する
				alterLife_enemy(this.target.hp, this.target.maxHp); 
		}
    	else {
        	Message.printMessage(this.name + "の攻撃・・・<br>" + this.target.name + "は倒れている<br>");
    	}
	}
	
	//攻撃時のキャラの移動
	async move(attackType) {
		// 打撃攻撃の場合
		if(attackType === "panchiCommand") {
			// wave.pngを表示する
			document.getElementById("wave").style.display = "block";
			// ice.pngを表示する
			document.getElementById("ice").style.display = "block";
			// wave.pngを右に移動させる
			for(let i = 0; i < 30; i++) {
				document.getElementById("wave").style.transform = "translateX(" + i + "px)";
				document.getElementById("ice").style.transform = "translateX(" + 2*i + "px)";
				await sleep(10);
			}
			// wave.pngを隠す
			document.getElementById("wave").style.display = "none";
			// ice.pngを隠す
			document.getElementById("ice").style.display = "none";
			// wave.pngを元の位置に戻す
			document.getElementById("wave").style.transform = "translateX(0px)";
			// ice.pngを元の位置に戻す
			document.getElementById("ice").style.transform = "translateX(0px)";
		}
		// 斬撃攻撃の場合
		else if(attackType === "slashingCommand") {
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
	async recovery()
	{
		// 薬草がない場合
		if(this.herb <= 0) {
			Message.printMessage(this.name + "は薬草を・・・<br>薬草がない！<br>");
			return;
		}

		document.getElementById("heal").style.display = "block";
		await sleep(1000);
		document.getElementById("heal").style.display = "none";

		// 体力が最大体力の場合
		if(this.maxHp == this.hp) {
			Message.printMessage(this.name + "は<br>これ以上回復できない！<br>");
			return;
		}
		
		// 回復する値
		let heal = this.herbPower;

		// 最大体力を超えて回復してしまいそうな場合
		if(this.maxHp - this.hp < this.herbPower) {
			heal = this.maxHp - this.hp;
		}

		// 体力を回復する
		this.hp += heal;

		// 攻撃対象の体力バーを変更する
		alterLife_hero(this.hp, this.maxHp);

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
	constructor(name, maxHp, offense, speed, path, itempath)
	{
		this.name = name;        // 名前
		this.type = "enemy";     // 敵味方種別
		this.maxHp = maxHp;          // 最大体力
		this.hp = maxHp;             // 体力
		this.liveFlag = true;    // 生存フラグ
		this.offense = offense;  // 攻撃力
		this.speed = speed;      // 素早さ
		this.path = path         // 画像の場所
		this.itempath = itempath // アイテムの画像の場所
		this.characters = "";    // キャラクター配列
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
	constructor(name, hp, offense, speed, path, itempath)
	{
		super(name, hp, offense, speed, path, itempath);
	}

	// 攻撃メソッド
	attack()
	{
		// 生存している味方をランダムに選択する
		let f = this.characters[searchLivedcharacterRamdom(this.characters, "hero")];

		// 攻撃対象の体力から、自分の攻撃力を引く
		f.hp -= this.offense;

		// 攻撃相手の体力がマイナスになる場合は0にする
		if(f.hp < 0) {
			f.hp = 0;
		}

		// 攻撃対象の体力バーを変更する
		alterLife_hero(f.hp, f.maxHp);

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
// 
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Mollusk extends Enemy
{
	// コンストラクタ
	constructor(name, hp, offense, speed, path, itempath)
	{
		super(name, hp, offense, speed, path, itempath);
	}

	// 攻撃メソッド
	attack()
	{
		// 生存している味方をランダムに選択する
		let f = this.characters[searchLivedcharacterRamdom(this.characters, "hero")];

		// 攻撃対象の体力から、自分の攻撃力を引く
		f.hp -= this.offense;

		// 攻撃相手の体力がマイナスになる場合は0にする
		if(f.hp < 0) {
			f.hp = 0;
		}

		// 攻撃対象の体力バーを変更する
		alterLife_hero(f.hp, f.maxHp);

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
		super(name, 0, 0, 1000, path);
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ゲーム管理クラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class GameManage
{
	// コンストラクタ
	constructor(characters)
	{
		this.characters = characters; // キャラクター配列

		this.parameterView = document.getElementsByClassName("parameterView")[0]; // パラメータ表示用のビュー
		this.ImageView = document.getElementsByClassName("ImageView")[0];         // 画像表示用のビュー
		this.Message = new Message(); // メッセージクラス
		this.command = new Command(); // コマンドクラス
		//this.HealthBar = new HealthBar(); // 体力バークラス
		this.winFlag = false;         // 勝利フラグ
		this.loseFlag = false;        // 敗北フラグ
		
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

		// 氷の画像を表示する
		this.showIceImage();

		// エフェクトの画像を表示する
		this.showEffectImage();

		// 回復エフェクトの画像を表示する
		this.showHealImage();

		// はじめのメッセージを表示する
		this.showFirstMessage();

		// Mを押すとBGMが流れる
		// BGM用のAudioオブジェクトを初期化
        // this.bgm = new Audio('./sound/battle1.mp3');
		// document.addEventListener('keydown', (event) => {
		// 	if(event.key === 'm') {
		// 		this.playBGM();
		// 		// 音量を設定
		// 		this.bgm.volume = 0.01;
		// 	}
		// });
		// // nを押すとBGMが止まる
		// document.addEventListener('keydown', (event) => {
		// 	if(event.key === 'n') {
		// 		this.stopBGM();
		// 	}
		// });
	}

	// 行動の順番を決める
	actionOrder()
	{
		// 素早さでソートする
		this.characters.sort(
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
		this.parameterView.innerHTML = "";

		// 味方のパラメータを表示する
		for(let c in this.characters) {
			if(this.characters[c].type === "hero") {
				this.parameterView.innerHTML += '<div class="parameter">' +
				                           this.characters[c].getMainParameter() + '</div>';
			}
		}

		// 敵のパラメータをコンソールに表示する
		for(let c in this.characters) {
			if(this.characters[c].type === "enemy" ) {
				this.parameterView.innerHTML += '<div class="parameter">' +
				                           this.characters[c].getMainParameter() + '</div>';
			}
		}
	}

    // 主人公の画像を表示する
    showHeroImage() {
        if (this.characters[0].type === "hero") {
            this.ImageView.innerHTML += '<img id="heroImage" src="' + this.characters[0].path 
            + '" style="position:absolute; left:100px; bottom:0px">';
        }
    }

	// 敵の画像を表示する
	showEnemyImage()
	{
		for(let c in this.characters) {
			if(this.characters[c].type === "enemy") {
				this.ImageView.innerHTML += '<img id="enemyImage' + c + '" src="' + this.characters[c].path
				+ '" style="position:absolute; left:350px; bottom: 50px">';
			}
		}
	}

	// 波の画像を表示する
	showWaveImage()
	{
		this.ImageView.innerHTML += '<img id="wave" src="./img/wave.png" style="position:absolute; left:250px; bottom:50px">';
		// wave.pngを隠す
		document.getElementById("wave").style.display = "none";
	}

	// 氷の画像を表示する
	showIceImage()
	{
		this.ImageView.innerHTML += '<img id="ice" src="./img/ice.png" style="position:absolute; left:350px; bottom:100px">';
		//this.ImageView.innerHTML += '<img id="ice" src="./img/ice.png" style="position:absolute; left:350px; bottom:0px">';
		// ice.pngを隠す
		document.getElementById("ice").style.display = "none";
	}

	// エフェクトの画像を表示する
	showEffectImage()
	{
		this.ImageView.innerHTML += '<img id="effect1" src="./img/effect1.png" style="position:absolute; left:350px; bottom:50px">';
		// effct1.pngを隠す
		document.getElementById("effect1").style.display = "none";
	}

	// 回復エフェクトの画像を表示する
	showHealImage()
	{
		this.ImageView.innerHTML += '<img id="heal" src="./img/heal.png" style="position:absolute; left:60px; bottom:0px">';
		document.getElementById("heal").style.display = "none";
	}

	// 戦闘開始時のメッセージを表示する
	showFirstMessage()
	{
		for(let c in this.characters) {
			if(this.characters[c].type === "enemy") {
				Message.printMessage("「" + this.characters[c].name + "」を調理するぞ！<br>");
			}
		}
	}

	// 倒れたキャラクターを処理する
	removeDiedCharacter()
	{
		for(let c in this.characters) {
			if(this.characters[c].hp <= 0 && this.characters[c].liveFlag === true) {

				// 生存フラグを落とす
				this.characters[c].liveFlag = false;

				// 敵の場合は画像を削除
				if(this.characters[c].type === "enemy") {
					// 画像を削除
					document.getElementById("enemyImage" + c).remove();
					
					// 敵のitempathを表示
					this.ImageView.innerHTML += '<img id="itemImage" src="' + this.characters[c].itempath + '" style="position:absolute; left:300px; bottom:0px">';

					// 新しい画像を表示する  魚とかによって変更する関数追加の必要あり
					//this.ImageView.innerHTML += '<img id="enemyImage" src="./img/maguro.png" style="position:absolute; left:350px; bottom:50px">';
					//this.ImageView.innerHTML += '<img id="enemyImage" src="./img/gyuniku.png" style="position:absolute; left:350px; bottom:50px">';
				}
			}
		}
	}

	// 勝敗の判定をする
	jadgeWinLose()
	{
		// 味方が残っていなければゲームオーバー
		if(! isAliveByType(this.characters, "hero")) {
			Message.addMessage("全滅しました・・・<br>");
			return "lose";
		}

		// 敵が残っていなければ勝利
		if(! isAliveByType(this.characters, "enemy")) {
			for(let c in this.characters) {
				if(this.characters[c].type === "enemy") {
					Message.printMessage(this.characters[c].name + "は倒れた<br>");
				}
			}
			return "win";
		}

		return "none";
	}

	// 1ターン
	async battle()
	{
		// 勝敗
		let winLose = "none";

		for(let c in this.characters) {
			// 倒れたキャラクターはスキップする
			if(this.characters[c].liveFlag === false) {
				continue;
			}

			await sleep(900);

			// 各キャラクターの行動
			console.log(this.characters[c].name + "の行動");
			this.characters[c].action();

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
				// this.stopBGM();

				// 別の画面を表示する処理を書く
				// 例えば、勝利画面を表示する場合
				if (winLose === "win") {
					// 勝利画面を表示する処理を書く
					console.log("You win!");
					// 勝利したことを示すグローバル変数
					this.winFlag = true;
				} else {
					// 敗北画面を表示する処理を書く
					//マウスをクリックをするとDrawLoseが呼ばれる
					document.addEventListener("click", ResetGame);
					console.log("You lose..!");
					// 敗北したことを示すグローバル変数
					this.loseFlag = true;
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
	constructor(characters, gameManage)
	{
		this.characters = characters;
		this.gameManage = gameManage;
		// コマンドを実行する味方
		this.heroElementNum = [];
		// 何人目の味方がコマンド選択中か（0が1人目）
		this.current = 0;
		this.isCalledPreparation = false;
	}

	// コマンド入力の準備をする
	preparation()
	{
		// コマンドを実行する味方の配列を空にする
		this.heroElementNum.splice(0);

		// コマンドを選択する味方を配列に詰める
		for(let c in this.characters) {
			if(this.characters[c].type === "hero" && this.characters[c].liveFlag === true) {
				this.heroElementNum.push(c);
			}
		}

		// 味方のコマンドを取得する
		let text = this.characters[this.heroElementNum[this.current]].getCommand("start");

		// コマンドを表示する
		this.showCommand(text);

		// イベントハンドラを登録する
		//this.characters[this.heroElementNum[this.current]].setEventHandler("start");
	
		//if (!this.isCalledPreparation) {
			document.getElementById("attackCommand").addEventListener("click", (e) => this.callback(e));
			document.getElementById("recoveryCommand").addEventListener("click", (e) => this.callback(e));
		//	this.isCalledPreparation = true;
		//}
	}

	// コマンドを表示する
	showCommand(commands)
	{
		document.getElementsByClassName("commandView")[0].innerHTML = commands;
		//commandView.innerHTML = commands.join("");
	}

	// コマンドをクリックしたときのコールバック関数
	callback(event)
	{
		console.log(event);
		// 味方のコマンド選択
		let result = this.commandTurn(event)
		console.log(result);

		// 味方全員のコマンド選択が終わった場合
		if(result) {
			// 戦闘開始
			let promise = this.gameManage.battle();

			// gameManage.battle()が終了したときに実行される
			promise.then(
				// boolは、gameManage.battle()の戻り値
				(bool) => {
					// 戦闘が終了していない場合、コマンドを表示する
					if(bool) {
						this.preparation();
					}
				}
			);
		}
	}

	// 味方全員のコマンド選択が終わったらtrueを返す
	commandTurn(event)
	{
		// 味方1人のコマンドを取得する
		let result = this.characters[this.heroElementNum[this.current]].getCommand(event);

		// 味方1人のコマンド入力が終わりの場合
		if (result === "end") {

			// コマンドを選択していない味方が残っている場合
			/*if(! (this.current === this.heroElementNum.length - 1)) {
				// 次の味方
				++this.current;
				// 味方のコマンドを取得する
				let text = characters[this.heroElementNum[this.current]].getCommand("start");
				// コマンドを表示する
				this.showCommand(text);
				// 表示されたコマンドにイベントハンドラを割り当てる
				this.characters[this.heroElementNum[this.current]].setEventHandler("start");
			}*/
			// 味方全員のコマンド選択が終わった場合
			//else {
				// コマンドビューを空白にする
				//this.commandView.innerHTML = "";
				document.getElementsByClassName("commandView")[0].innerHTML = "";
				this.current = 0;
				return true;
			//}
		}

		// 味方1人のコマンド入力が終わっていない場合
		else {
			console.log("bo");
			// 次のコマンドを表示して、イベントハンドラを登録する
			this.showCommand(result);
			// 表示されたコマンドにイベントハンドラを割り当てる
			//this.characters[this.heroElementNum[this.current]].setEventHandler();
			// クラス名がenemyCommandの要素すべてにイベントハンドラを追加
			let enemyCommands = document.getElementsByClassName("enemyCommand");
			for (let i = 0; i < enemyCommands.length; i++) {
				enemyCommands[i].addEventListener("click", (e) => this.callback(e));
			}
			// クラス名がpanchiCommandの要素すべてにイベントハンドラを追加
			let panchiCommands = document.getElementsByClassName("panchiCommand");
			for (let i = 0; i < panchiCommands.length; i++) {
				panchiCommands[i].addEventListener("click", (e) => this.callback(e));
			}
			// クラス名がslashingCommandの要素すべてにイベントハンドラを追加
			let slashingCommands = document.getElementsByClassName("slashingCommand");
			for (let i = 0; i < slashingCommands.length; i++) {
				slashingCommands[i].addEventListener("click", (e) => this.callback(e));
			}
			
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
		document.getElementsByClassName("messageView")[0].innerHTML += text;
		//messageView.innerHTML = text;
	}

	// メッセージを追加する
	static addMessage(text)
	{
		document.getElementsByClassName("messageView")[0].innerHTML += text;
		//messageView.innerHTML += text;
	}

	// メッセージを消去する
	static clearMessage()
	{
		document.getElementsByClassName("messageView")[0].innerHTML = "";
		//messageView.innerHTML = "";
	}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// characters配列関連
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 種別（type）で指定されたキャラクターが、全滅しているか調べる
function isAliveByType(characters, type)
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
		if(c.name === name) {
			characterElementNum.push(i);
		}
		++i;
	}

	return characterElementNum;
}

// 種別（type）で指定された生存しているキャラクターを探し、配列の要素番号を返す
function searchLivedcharacterByType(characters, type)
{
	// 種別（type）で指定された生存しているキャラクター配列の要素番号
	let characterElementNum = [];
	console.log(characters);
	// 種別（type）で指定された生存しているキャラクターを探す
	let i = 0;
	characters.forEach((c) => {
		console.log(c);
		if(c.type === type && c.liveFlag === true) {
			characterElementNum.push(i);
		}
		++i;
	});

	return characterElementNum;
}

// 種別（type）で指定された生存しているキャラクターの要素番号をランダムで返す
function searchLivedcharacterRamdom(characters, type)
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

// BGMを再生する関数
function playBGM() {
    // Audioオブジェクトを作成し、BGMファイルのパスを指定
    var bgm = new Audio('./music/battle1.mp3');
    
    // BGMを再生
    bgm.play()
        .then(() => console.log("BGMの再生を開始しました。"))
        .catch(error => console.error("BGMの再生に失敗しました。", error));
}

// BGMを停止する関数
function stopBGM() {
	// Audioオブジェクトを作成し、BGMファイルのパスを指定
	var bgm = new Audio('./music/battle1.mp3');
	
	// BGMを停止
	bgm.pause();
	bgm.currentTime = 0;
}

function ResetGame(){
	// modalを消す
	document.getElementById('modal').style.display = 'none';

}

// 敵の体力バーを変更する
function alterLife_enemy(hp, maxHp) {
    const lifeBars = document.getElementsByClassName("enemylife-bar");
    if (lifeBars.length === 0) {
        console.error("Error: enemylife-bar elements not found.");
        return;
    }
    const widthPercentage = (hp / maxHp) * 100;
    for (let i = 0; i < lifeBars.length; i++) {
        lifeBars[i].style.width = `${widthPercentage}%`;
    }
}

// 主人公の体力バーを変更する
function alterLife_hero(hp, maxHp) {
	const lifeBars = document.getElementsByClassName("herolife-bar");
	if (lifeBars.length === 0) {
		console.error("Error: herolife-bar elements not found.");
		return;
	}
	const widthPercentage = (hp / maxHp) * 100;
	for (let i = 0; i < lifeBars.length; i++) {
		lifeBars[i].style.width = `${widthPercentage}%`;
	}
}
