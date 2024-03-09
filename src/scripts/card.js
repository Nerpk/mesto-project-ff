import { deleteCard, putLike, deleteLike } from "./api";

const cardTemplate = document.querySelector('#card-template').content;
function createCard(cardInfo, funcRemove, funcLike, funcClick, idUser) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const image = cardElement.querySelector('.card__image');
  image.src = cardInfo.link;
  image.alt = cardInfo.name;
  cardElement.querySelector('.card__title').textContent = cardInfo.name;

  //удаление карточки
  if (cardInfo.owner._id === idUser) {
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', function () {
      deleteCard(cardInfo._id)
      funcRemove(deleteButton);
  });
  } 
  else {
    cardElement.querySelector('.card__delete-button').remove();
  }
  
  //работа с лайком
  if (cardInfo.likes.some(item => {return item._id === idUser})) {//проверка лайкнутость карточки поступающей с сервера
    cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
  }
  cardElement.querySelector('.card__like-counter').textContent = cardInfo.likes.length;
  cardElement.addEventListener('click', evt => {//отправка и удаление 
    funcLike(evt);

    if (evt.target.classList.contains('card__like-button')) {
      if (evt.target.classList.contains('card__like-button_is-active')) {
        putLike(cardInfo._id)
        .then(card => {cardElement.querySelector('.card__like-counter').textContent = card.likes.length;})
      }
      else {
        deleteLike(cardInfo._id)
        .then(card => {cardElement.querySelector('.card__like-counter').textContent = card.likes.length;})
      }
    }
  })

  image.addEventListener('click', funcClick)

  return cardElement;
}

function removeCard(button) {
  const card = button.closest('.card');
  card.remove();
}
function likingCard(evt) {
  if (evt.target.classList.contains('card__like-button')){
      evt.target.classList.toggle('card__like-button_is-active')
  }
}

export {createCard, removeCard, likingCard}