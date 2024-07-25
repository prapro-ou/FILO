class Kari extends Modal{
    constructor(){
        super();
    }
    create(){
        super.create();
        document.getElementsByClassName("js-modal__wrapper")[0].innerHTML = `
        <div class="gameContainer">
            <div class="parameterView"></div>
            <div class="imageContainer">
                <div class="ImageView" style="position: relative">
                    <div class="herolife-frame">
                        <div class="herolife-bar"></div>
                        <div class="herolife-mark"></div>
                    </div>
                    <div class="enemylife-frame">
                        <div class="enemylife-bar"></div>
                        <div class="enemylife-mark"></div>
                    </div>
                </div>
            </div>
            <div class="CMContainer">
                <div class="commandView"></div>
                <div class="messageView"></div>
            </div>
        </div>`;
    }
}
