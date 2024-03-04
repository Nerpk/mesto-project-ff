import '../pages/index.css';
import { initialCards } from './cards';
import { openPopup, closePopup, closePopupByOverlay } from './modal';
import { createCard, removeCard, likingCard } from './card'
import { enableValidation, clearValidation } from './validation';


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
initialCards.forEach(item => placesList.append(createCard(item, removeCard, likingCard, lookingCloser)));



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
    formName.textContent = editForm.elements.name.value;
    formJob.textContent = editForm.elements.description.value;
    closePopup(editPopup);
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
    placesList.prepend(createCard(
        {name: addForm.elements.place.value, 
         link: addForm.elements.link.value},
         removeCard, likingCard, lookingCloser)
    )
    closePopup(addPopup);
    addForm.reset();
}
addForm.addEventListener('submit', addCardFromPopup)



const imagePopup = document.querySelector('.popup_type_image')
const imagePopupClose = imagePopup.querySelector('.popup__close')
let popupImage = imagePopup.querySelector('.popup__image')
let popupCaption = imagePopup.querySelector('.popup__caption')
imagePopupClose.addEventListener('click', () => {
    closePopup(imagePopup)
})

