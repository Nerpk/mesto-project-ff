const popups = document.querySelectorAll('.popup');

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', escapeCheck);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeCheck);
    console.log('hero')
}

function escapeCheck(key) {
    if (key.keyCode === 27) {
        key.preventDefault();
        popups.forEach(function (item) {
            if (item.classList.contains('popup_is-opened')) {
                closePopup(item);
            }
        })
    }
}

export {popups, openPopup, closePopup}