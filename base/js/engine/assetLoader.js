class AssetLoader {
    constructor() {
        this._assets   = new Map();
        this._promises = [];
    }

    addImage(name, path) {
        const img = new Image();
        img.src = path;

        const promise = new Promise((resolve) => {
            img.onload = () => {
                this._assets.set(name, img);
                resolve(img);
            }
        });

        this._promises.push(promise);
    }

    async loadAllAssets() {
        await Promise.all(this._promises);
        return this._assets;
    }

    get(name) {
        return this._assets.get(name);
    }
}

const assets = new AssetLoader();