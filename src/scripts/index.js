import '../pages/index.css';
import { initialCards } from './cards';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardInfo, func) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', function () {
        func(deleteButton);
    });

    return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(button) {
    const card = button.closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => placesList.append(createCard(item, removeCard)));