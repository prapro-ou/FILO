class InputManager {
    constructor() {
        this._prevKeys = new Map();
        this._keys     = new Map();
        // this._lastKey  = null;

        addEventListener('keydown', (k) => {
            this._keys.set(k.key, true);
            this._lastKey = k.key;
        });
        addEventListener('keyup', (k) => {
            this._keys.set(k.key, false);
        });
    }

    isKeyDown(keyName) {
        const prevDown = this._getKey(this._prevKeys, keyName);
        const currentDown = this._getKey(this._keys, keyName);
        return !prevDown && currentDown;
    }

    isKeyPress(keyName) {
        return this._getKey(this._keys, keyName);
    }

    isKeyUp(keyName) {
        const prevDown = this._getKey(this._prevKeys, keyName);
        const currentDown = this._getKey(this._keys, keyName);
        return prevDown && !currentDown;
    }

    // isLastPressed(keyName) {
    //     return keyName === this._lastKey;
    // }

    update() {
        this._prevKeys = new Map(this._keys);
    }

    _getKey(keyMap, keyName) {
        return keyMap.has(keyName) ? keyMap.get(keyName) : false;
    }
}

const input = new InputManager();