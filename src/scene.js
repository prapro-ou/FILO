function DrawWin() {
	// #gameContainerを変更する
	document.getElementById("gameContainer").innerHTML = '<div id="win"><div id="winMessage"></div></div>';
	// #winmessageに表示させる
	document.getElementById("winMessage").innerHTML = "You get a maguro!";
	// Escapeキーを押すと、DrawStartが呼ばれる
	document.addEventListener("keydown", function(event) {
		if(event.key === "Escape") {
			DrawStart();
		}
	});
}

function DrawLose() {
	// #gameContainerを変更する
	document.getElementById("gameContainer").innerHTML = '<div id="lose"><div id="loseMessage"></div></div>';
	// #losemessageに表示させる
	document.getElementById("loseMessage").innerHTML = "Game Over...";
	// Escapeキーを押すと、DrawStartが呼ばれる
	document.addEventListener("keydown", function(event) {
		if(event.key === "Escape") {
			DrawStart();
		}
	});
}

function DrawStart() {
	// #gameContainerを変更する
	 document.getElementById("gameContainer").innerHTML = '<div id="start"><div id="startMessage"></div><div id="startButton"></div></div>';
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
	document.getElementById("gameContainer").innerHTML = `
	<div ="gameContainer">
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

	// ゲームを開始する
	gameManage = new GameManage();
	// コマンドを表示する
	command = new Command();
	command.preparation();

	// メッセージを表示する
	Message = new Message();

	// 体力バーの初期値を設定する
	alterLife_hero(0);
	alterLife_enemy(0);
	
	// スライダーの値を取得する
	const inputSlider = document.getElementById("inputSlider");
	const inputSliderResult = document.getElementById("inputSliderResult");
	inputSlider.addEventListener("input", function() {
		inputSliderResult.textContent = inputSlider.value;
	});

	// 画像の取得
	const heroImage = document.getElementById("heroImage");
	const enemyImage = document.getElementById("enemyImage");
	const wave = document.getElementById("wave");
	const effect1 = document.getElementById("effect1");

}