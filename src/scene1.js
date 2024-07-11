// 初期状態を描画
DrawStart();

function DrawWin() {
	// #gameContainerを変更する
	document.getElementById("gameContainer").innerHTML = '<div id="win"><div id="winMessage"></div></div>';
	// #winmessageに表示させる
	document.getElementById("winMessage").innerHTML = "You get a maguro!";
	// Escapeキーを押すと、DrawStartが呼ばれる
	document.addEventListener("keydown", function(event) {
		if(event.key === "Escape") {
			ResetGame();
		}
	});
}

function DrawLose() {
	// #gameContainerを変更する
	document.getElementById("gameContainer").innerHTML = '<div id="lose"><div id="loseMessage"></div></div>';
	// #losemessageに表示させる
	document.getElementById("loseMessage").innerHTML = "Game Over...";
	// Escapeキーを押すと、何も起こっていない初期状態に戻す
	document.addEventListener("keydown", function(event) {
		if(event.key === "Escape") {
			ResetGame();
		}
	});
}

function ResetGame() {
    // #gameContainerの内容をクリア
    // #gameContainerを変更する
	document.getElementById("win").innerHTML = '<div id="start"><div id="startMessage"></div><div id="startButton"></div></div>';
    // ゲームを初期状態に戻す
    DrawStart();
}

function DrawStart() {
	// #startmessageに表示させる
	document.getElementById("startMessage").innerHTML = "Click the button to start the game!";
	// ボタン要素を作成
    var startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    // ボタンにクリックイベントリスナーを追加
    startButton.onclick = DrawGame;
    // #startButtonにボタンを追加
    document.getElementById("startButton").appendChild(startButton);
}

function DrawGame() {
	// #gameContainerを変更する
	document.getElementById("start").innerHTML = `
	<div id="gameContainer">
		<div id="parameterView"></div>
    	<div id="imageContainer">
        	<div id="ImageView" style="position: relative">
            	<div id="herolife-frame">
                	<div id="herolife-bar"></div>
                	<div id="herolife-mark"></div>
            	</div>
            	<div id="enemylife-frame">
                	<div id="enemylife-bar"></div>
                	<div id="enemylife-mark"></div>
            	</div>
        	</div>
    	</div>
    	<div id="CMContainer">
        	<div id="commandView"></div>
        	<div id="messageView"></div>
    	</div>
    	<div>
			<input type="range" min="0" max="100" value="20"id="inputSlider" />
    	</div>
    	<div>
        	<p id="inputSliderResult"></p>
    	</div>
	</div>`;
	// lib1.jsを読み込む
	var scriptLib1 = document.createElement('script');
	scriptLib1.type = 'text/javascript';
	scriptLib1.src = 'lib1.js';
	document.body.appendChild(scriptLib1);

	// game1.jsを読み込む
	var scriptGame1 = document.createElement('script');
	scriptGame1.type = 'text/javascript';
	scriptGame1.src = 'game1.js';
	document.body.appendChild(scriptGame1);

	// hpbar1.jsを読み込む
	var scriptHpbar1 = document.createElement('script');
	scriptHpbar1.type = 'text/javascript';
	scriptHpbar1.src = 'hpbar1.js';
	document.body.appendChild(scriptHpbar1);
}