//server
const token = '0a730956-138e-4f26-a999-f5e2923b61e4';
const basedUrl = 'https://nomoreparties.co/v1/wff-cohort-7/'


function checkResponse (data) {//проверка на верность ответа
    if (data.ok) {
        return data.json();
    }
    return Promise.reject(`Ошибка: ${data. status}`);
}

const getUser = () => {return fetch(`${basedUrl}users/me/`, {//получение данных о пользователе
    method: 'GET',
    headers: {
        authorization: token,
    },
})
.then(checkResponse)
};
const getCards = () => {return fetch(`${basedUrl}cards`, {//получение карточек
    method: 'GET',
    headers: {
        authorization: token,
    },
})
.then(checkResponse)
};



const pushUser = (editForm) => {return fetch(`${basedUrl}users/me/`, {//загрузка данных о пользователе
    method: 'PATCH',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: editForm.elements.name.value,
        about: editForm.elements.description.value
    })
})
.then(checkResponse)
};

const pushCard = (addForm) => {return fetch(`${basedUrl}cards`, {//загрузка карточки
    method: 'POST',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: addForm.elements.place.value,
        link: addForm.elements.link.value
    })
})
.then(checkResponse)
};

const changeAvatar = (avatarForm) => {return fetch(`${basedUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        avatar: avatarForm.elements.ava.value
    })
})
.then(checkResponse)
};



const deleteCard = (id) => {return fetch(`${basedUrl}cards/${id}`, {
    method: 'DELETE',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
    })
    .then(data => {if (!data.ok) {return Promise.reject(`Ошибка: ${data. status}`)}})
}

const putLike = (id) => {return fetch(`${basedUrl}cards/likes/${id}`, {
    method: 'PUT',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
    })
    .then(checkResponse)
}
        
const deleteLike = (id) => {return fetch(`${basedUrl}cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
    })
    .then(checkResponse)
}


export {getUser, getCards, pushUser, pushCard, deleteCard, deleteLike, putLike, changeAvatar}