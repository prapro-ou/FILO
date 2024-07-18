class Canvas {
    // ---------------------------------------------
    // width:     number        ... Canvas's width
    // height:    number        ... Canvas's height
    // modal:     boolean
    // className: string | null
    // ---------------------------------------------
    constructor(width, height, modal = false, className = null) {
        this.canvas = document.createElement('canvas');
        this.ctx    = this.canvas.getContext('2d');
        this.width  = width;
        this.height = height;

        this.canvas.width  = width;
        this.canvas.height = height;
        
        if (className) this.canvas.classList.add(className);

        if (modal) {
            document.getElementById('js-modal__wrapper').appendChild(this.canvas)
        } else{
            document.body.appendChild(this.canvas);
        }
    }
}