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