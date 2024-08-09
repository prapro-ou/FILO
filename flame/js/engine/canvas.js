class Canvas {
    // ---------------------------------------------
    // width:     number        ... Canvas's width
    // height:    number        ... Canvas's height
    // className: string | null
    // ---------------------------------------------
    constructor(width, height, className = null) {
        this.canvas = document.createElement('canvas');
        this.ctx    = this.canvas.getContext('2d');
        this.width  = width;
        this.height = height;

        this.canvas.width  = width;
        this.canvas.height = height;
        
        if (className) this.canvas.classList.add(className);
    }

    set(elm) {
        elm.appendChild(this.canvas);
    }
}