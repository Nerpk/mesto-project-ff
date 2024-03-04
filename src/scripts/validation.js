const showInputError = (formElement, inputElement, errorMessage, validationConfig) => { //показывает сообщение об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
const hideInputError = (formElement, inputElement, validationConfig) => { //скрывает сообщение об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => { //проверка на валидность с дальнейшим показанием ошибки
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
    clearValidation(formElement, validationConfig); //связывает инпуты чтобы отсмотреть КАЖДЫЙ на валидность
};

const setEventListeners = (formElement, validationConfig) => { //ставит слушатель на каждый инпут внутрри одной формы
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        });
    });
};


//функции обслуживающие clearValidation
const hideButon = (formElement, validationConfig) => { //скрытие кнопки отправки формы
    const button = formElement.querySelector(validationConfig.submitButtonSelector);
    button.classList.add(validationConfig.inactiveButtonClass);
    button.disabled = true;
}
const showButon = (formElement, validationConfig) => { //показание кнопки отправки формы
    const button = formElement.querySelector(validationConfig.submitButtonSelector);
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.disabled = false;
}
const checkInputValidityWithoutShowAndHide = (inputElement) => { //проверка на валидность без показаний ошибки
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (inputElement.validity.valid) {
        return true;
    } else {
        return false;
    }
}



const clearValidation = (profileForm, validationConfig) => { //отслеживает валиднось обоих инпутов с предоставлением доступа к кнопке отправки 
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));

    inputList.forEach(inputElement => { //проверка на пустую строку (строка пуста => пользователь ничего не вводил => не нужно показывать ошибки)
        if (inputElement.value === "") 
        {hideInputError(profileForm, inputElement, validationConfig)}
    })
    
    if (inputList.every(inputElement => {return checkInputValidityWithoutShowAndHide(inputElement)})) 
    {
        inputList.forEach(inputElement => hideInputError(profileForm, inputElement, validationConfig))
        showButon(profileForm, validationConfig)
    }
    else 
    { hideButon(profileForm, validationConfig) }
}

const enableValidation = (validationConfig) => { //ставит слушатель на каждую форму в документе
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
        evt.preventDefault();
        })
        setEventListeners(formElement, validationConfig);
    })
}

export {enableValidation, clearValidation}