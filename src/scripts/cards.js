export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;
function createCard(cardInfo, funcRemove, funcLike, funcClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const image = cardElement.querySelector('.card__image');
  image.src = cardInfo.link;
  image.alt = cardInfo.name;
  cardElement.querySelector('.card__title').textContent = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  deleteButton.addEventListener('click', function () {
      funcRemove(deleteButton);
  });
  
  cardElement.addEventListener('click', funcLike)

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