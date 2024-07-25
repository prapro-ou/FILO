
// const id = document.getElementById('js-modal__open').dataset.modal;
// const modal = document.getElementById(id);

// const openModal = () => {
//     // const id = this.dataset.modal;
//     // const modal = document.getElementById(id);
//     document.body.classList.add('noScroll');
//     modal.classList.remove('close');
//     modal.classList.add('cl');
// }

// const closeModal = () => {
//     document.body.classList.remove('noScroll');
//     modal.classList.add('close');
// }

// document.getElementById('js-modal__open').addEventListener('click', openModal);
// document.getElementById('js-modal__close').addEventListener('click', closeModal);
// document.getElementById('js-modal__bg').addEventListener('click', closeModal);


class Modal {
    static id = 1;

    constructor() {
        this.id = Modal.id;
        //this.modal = this.create();
        this.modal = null;
        //this.content = this.modal.lastElementChild;
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