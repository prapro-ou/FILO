class Game{
    constructor(maxFps = 60) {
        this.maxFps       = maxFps;
        this.currentFps   = 0;
        this.scenes = new Map();
        this.currentScene = null;

        this._prevTimestamp = 0;
    }

    // -----------------
    // newScene: Scene
    // -----------------
    changeScene(newScene) {
        const savedScene = this.scenes.get(newScene.name);
        if (savedScene === undefined) {
            newScene.addEventListener('changeScene', (e) => {
                this.changeScene(e.target)
            });
            newScene.addEventListener('destroy', (e) => {
                this.scenes.delete(e.target.name);
            });
            this.scenes.set(newScene.name, newScene);
            this.currentScene = newScene;
        } else {
            this.currentScene = savedScene;
        }
    }

    start() {
        requestAnimationFrame(this._loop.bind(this));
    }

    _loop(timestamp) {
        const elapsedTime = (timestamp - this._prevTimestamp) / 1000;
        const accuracy    = 0.9;
        const frameTime   = 1 / this.maxFps * accuracy;
        if (elapsedTime <= frameTime) {
            requestAnimationFrame(this._loop.bind(this));
            return;
        }

        this.currentScene.update();
        input.update();
        
        this._prevTimestamp = timestamp;
        this.currentFps = 1 / elapsedTime;
        requestAnimationFrame(this._loop.bind(this));
    }
}