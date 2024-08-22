class Event {
    //-------------
    // target: any
    //-------------
    constructor(target) {
        this.target = target;
    }
}

class EventDispatcher {
    constructor() {
        this._eventListeners = {};
    }

    addEventListener(type, callback) {
        if(this._eventListeners[type] == undefined) {
            this._eventListeners[type] = [];
        }

        this._eventListeners[type].push(callback);
    }

    // --------------
    // type: string
    // e:    Event
    // --------------
    dispatchEvent(type, e = null) {
        const listeners = this._eventListeners[type];
        if(listeners !== undefined) listeners.forEach((callback) => callback(e));
    }
}