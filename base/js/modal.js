
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


const modalHTML = '<div class="modal-close"><div class="js-modal__bg"></div><div class="js-modal__wrapper"></div></div>';

class Modal {
    static id = 1;

    constructor() {
        this.open = false;
        


    }

    create() {
        const modal = document.createElement('div');
        modal.classList.add('close');
        modal.setAttribute('id', `modal${Modal.id}`);
        const modalBG = document.createElement('div');
        modal.classList.add('js-modal__bg');
        const modalWrapper = document.createElement('div');
        modal.classList.add('js-modal__wrapper');

        modal.appendChild(modalBG);
        modal.appendChild(modalWrapper);

        
    }

    destroy(id) {
        
    }
}