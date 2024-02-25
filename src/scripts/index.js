import '../pages/index.css';
import { initialCards, createCard, removeCard, likingCard } from './cards';
import { popups, openPopup, closePopup } from './modal'



const placesList = document.querySelector('.places__list');
initialCards.forEach(item => placesList.append(createCard(item, removeCard, likingCard, lookingCloser)));



const edit = document.querySelector('.profile__edit-button')
const editPopup = document.querySelector('.popup_type_edit')
const editPopupClose = editPopup.querySelector('.popup__close')
const editForm = editPopup.querySelector('.popup__form')
let formName = document.querySelector('.profile__title')
let formJob = document.querySelector('.profile__description')
edit.addEventListener('click', () => {
    openPopup(editPopup);
    editForm.elements.name.value = formName.textContent;
    editForm.elements.description.value = formJob.textContent;
})
editPopupClose.addEventListener('click', () => {
    closePopup(editPopup)
})
editPopup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        closePopup(editPopup)
    }
})


function handleFormSubmit(evt) {
    evt.preventDefault();
    formName.textContent = editForm.elements.name.value;
    formJob.textContent = editForm.elements.description.value;
    closePopup(editPopup);
}
editForm.addEventListener('submit', handleFormSubmit)



const add = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_new-card')
const addPopupClose = addPopup.querySelector('.popup__close')
const addForm = addPopup.querySelector('.popup__form')
add.addEventListener('click', () => {
    openPopup(addPopup)
})
addPopupClose.addEventListener('click', () => {
    closePopup(addPopup)
})
addPopup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        closePopup(addPopup)
    }
})


function addCardFromPopup(evt) {
    evt.preventDefault();
    placesList.prepend(createCard(
        {name: addForm.elements.place_name.value, 
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
imagePopup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        closePopup(imagePopup)
    }
})



popups.forEach(item => item.classList.add('popup_is-animated'))
function lookingCloser(evt) {
    openPopup(imagePopup)
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
}
  