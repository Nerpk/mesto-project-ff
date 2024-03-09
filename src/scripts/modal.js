function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escapeCheck);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeCheck);
}

function escapeCheck(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

const closePopupByOverlay = evt => {
    if (evt.target === evt.currentTarget) { 
        closePopup(evt.currentTarget) 
    } 
}

function loading(isLoad, button) {
    if (isLoad) {
        button.textContent = "Сохранение..."
    }
    else {
        button.textContent = "Сохранить"
    }
}

export {openPopup, closePopup, closePopupByOverlay, loading}