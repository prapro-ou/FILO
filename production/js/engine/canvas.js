class Canvas {
    // ---------------------------------------------
    // width:     number        ... Canvas's width
    // height:    number        ... Canvas's height
    // className: string | null
    // ---------------------------------------------
    constructor(width, height, className = null, id = null, div = false) {
        this.canvas = !div ? document.createElement('canvas') : document.createElement('div');
        this.ctx    = !div ? this.canvas.getContext('2d') : null;
        this.width  = width;
        this.height = height;

        this.canvas.width  = width;
        this.canvas.height = height;
        
        if (className) this.canvas.classList.add(className);
        if (id) this.canvas.setAttribute('id', id);
    }

    set(elm) {
        elm.appendChild(this.canvas);
    }

    destroy() {
        this.canvas.remove();
    }
}