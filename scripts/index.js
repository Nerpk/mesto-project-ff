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

    placesList.append(cardElement);

    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', function () {
        func(deleteButton);
    });
}

// @todo: Функция удаления карточки
function removeCard(button) {
    const card = button.closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => createCard(item, removeCard));