// ユーザー入力を受け取る
const sushiType = prompt("寿司ネタの名前をカタカナで入力してください");

let currentSushiType = null; // 現在の寿司ネタ名を保持
let gameScript = null;

// 寿司ネタに対応するJavaScriptファイルを動的にロードする関数
function loadSushiGame(sushiName) {
    if (gameScript) {
        document.head.removeChild(gameScript); // 前回のゲームファイルを削除
    }
    gameScript = document.createElement('script');
    gameScript.src = `./sushimaker_${sushiName}.js`; // 対応するファイルをロード
    gameScript.onload = function() {
        console.log(`${sushiName}のゲームをロードしました。`);
    };
    gameScript.onerror = function() {
        console.error(`${sushiName}のゲームファイルが見つかりません。`);
        alert("ゲームの読み込みに失敗しました。寿司ネタの名前を確認してください。");
    };
    document.head.appendChild(gameScript);
}

// ゲームをリセットする関数
function resetGame() {
    if (gameScript) {
        document.head.removeChild(gameScript); // 現在のゲームファイルを削除
        gameScript = null;
    }
    loadSushiGame(currentSushiType); // 同じ寿司ネタのゲームを再度ロード
}

// ユーザー入力に基づいて対応するゲームをロード
switch (sushiType) {
    case "サーモン":
        loadSushiGame("salmon");
        currentSushiType = "salmon";
        break;
    case "マグロ":
        loadSushiGame("maguro");
        currentSushiType= "maguro";
        break;
    case "エビ":
        loadSushiGame("ebi");
        currentSushiType= "ebi";
        break;
    case "イカ":
        loadSushiGame("ika");
        currentSushiType= "ika";
        break;
    case "アジ":
        loadSushiGame("aji");
        currentSushiType= "aji";
        break;
    case "トロ":
        loadSushiGame("toro");
        currentSushiType= "toro";
        break;
        
    // 追加の寿司ネタに対応するケースを追加
    default:
        alert("その寿司ネタはありません。もう一度入力してください。");
        break;
}
