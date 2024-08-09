class Modal {
    static id = 1;

    constructor() {
        this.id = Modal.id;
        this.modal = null;
        this.content = null;

        Modal.id++;
    }

    create() {
        const modal = document.createElement('div');
        modal.classList.add('js-modal');
        modal.setAttribute('id', `modal${this.id}`);
        const modalBG = document.createElement('div');
        modalBG.classList.add('js-modal__bg');
        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('js-modal__wrapper');

        modal.appendChild(modalBG);
        modal.appendChild(modalWrapper);
        document.body.appendChild(modal);

        this.modal = modal;
        this.content = this.modal.lastElementChild;

        return modal;
    }

    destroy() {
        const modal = document.getElementById(`modal${this.id}`);
        modal.remove();
    }

    open() {
        this.modal.classList.add('open');
    }

    close() {
        this.modal.classList.remove('open');
    }
}