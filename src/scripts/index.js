import '../pages/index.css';
import { openPopup, closePopup, closePopupByOverlay, loading } from './modal';
import { createCard, removeCard, likingCard } from './card';
import { enableValidation, clearValidation } from './validation';
import { getUser, getCards, pushUser, pushCard, changeAvatar } from './api';

//валидация
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button__disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }; 
enableValidation(validationConfig);

const placesList = document.querySelector('.places__list');
function lookingCloser(evt) {
    openPopup(imagePopup)
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
}



Promise.all([getUser(), getCards()])
.then(([me, cards]) => {
    document.querySelector('.profile__title').textContent = me.name;
    document.querySelector('.profile__description').textContent = me.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${me.avatar})`;

    cards.forEach(card => {
        placesList.append(createCard(card, removeCard, likingCard, lookingCloser, me._id))
    })
})
.catch(err => {console.log(err)})



const popups = document.querySelectorAll('.popup');
popups.forEach(item => {
    item.classList.add('popup_is-animated'); 
    item.addEventListener('click', closePopupByOverlay)
})



const edit = document.querySelector('.profile__edit-button')
const editPopup = document.querySelector('.popup_type_edit')
const editPopupClose = editPopup.querySelector('.popup__close')
const editForm = editPopup.querySelector('.popup__form')
const formName = document.querySelector('.profile__title')
const formJob = document.querySelector('.profile__description')
edit.addEventListener('click', () => {
    openPopup(editPopup);
    editForm.elements.name.value = formName.textContent;
    editForm.elements.description.value = formJob.textContent;
    clearValidation(editForm, validationConfig);
})
editPopupClose.addEventListener('click', () => {
    closePopup(editPopup)
})


function handleEditFormSubmit(evt) {
    evt.preventDefault();
    loading(true, editForm.querySelector('.popup__button'))
    formName.textContent = editForm.elements.name.value;
    formJob.textContent = editForm.elements.description.value;
    pushUser(editForm)
        .then(() => closePopup(editPopup))
        .catch(err => {console.log(err)})
        .finally(() => {loading(false, editForm.querySelector('.popup__button'))})
    
}
editForm.addEventListener('submit', handleEditFormSubmit)



const add = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_new-card')
const addPopupClose = addPopup.querySelector('.popup__close')
const addForm = addPopup.querySelector('.popup__form')
add.addEventListener('click', () => {
    openPopup(addPopup);
    addForm.elements.place.value = "";
    addForm.elements.link.value = "";
    clearValidation(addForm, validationConfig);
})
addPopupClose.addEventListener('click', () => {
    closePopup(addPopup)
})


function addCardFromPopup(evt) {
    evt.preventDefault();
    loading(true, addForm.querySelector('.popup__button'))
    pushCard(addForm)
        .then(card => {
            placesList.prepend(createCard(card, removeCard, likingCard, lookingCloser, card.owner._id))
            closePopup(addPopup);
            addForm.reset();
        })
        .catch(err => {console.log(err)})
        .finally(() => loading(false, addForm.querySelector('.popup__button')))
    
}
addForm.addEventListener('submit', addCardFromPopup)



const imagePopup = document.querySelector('.popup_type_image')
const imagePopupClose = imagePopup.querySelector('.popup__close')
let popupImage = imagePopup.querySelector('.popup__image')
let popupCaption = imagePopup.querySelector('.popup__caption')
imagePopupClose.addEventListener('click', () => {
    closePopup(imagePopup)
})



const avatar = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_avatar')
const avatarPopupClose = avatarPopup.querySelector('.popup__close')
const avatarForm = avatarPopup.querySelector('.popup__form')
avatar.addEventListener('click', () => {
    openPopup(avatarPopup);
    avatarForm.elements.ava.value = avatar.style.backgroundImage.slice(4, -1).replace(/["']/g, "");
    clearValidation(avatarForm, validationConfig);

})
avatarPopupClose.addEventListener('click', () => {
    closePopup(avatarPopup)
})

function changeAvatarFromPopup(evt) {
    evt.preventDefault();
    loading(true, avatarForm.querySelector('.popup__button'))
    avatar.style.backgroundImage = `url(${avatarForm.elements.ava.value})`;
    changeAvatar(avatarForm)
        .then(() => closePopup(avatarPopup))
        .catch(err => {console.log(err)})
        .finally(() => loading(false, avatarForm.querySelector('.popup__button')))
}
avatarForm.addEventListener('submit', changeAvatarFromPopup)

