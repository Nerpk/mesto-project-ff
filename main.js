(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&(e.preventDefault(),t(document.querySelector(".popup_is-opened")))}var n=function(e){e.target===e.currentTarget&&t(e.currentTarget)},o=document.querySelector("#card-template").content;function a(e,t,r,n){var a=o.querySelector(".card").cloneNode(!0),c=a.querySelector(".card__image");c.src=e.link,c.alt=e.name,a.querySelector(".card__title").textContent=e.name,a.querySelector(".card__like-counter").textContent=e.likes.length;var i=a.querySelector(".card__delete-button");return i.addEventListener("click",(function(){t(i)})),a.addEventListener("click",r),c.addEventListener("click",n),a}function c(e){e.closest(".card").remove()}function i(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}var u=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},l=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(r){""===r.value&&u(e,r,t)})),r.every((function(e){return function(e){return e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),!!e.validity.valid}(e)}))?(r.forEach((function(r){return u(e,r,t)})),function(e,t){var r=e.querySelector(t.submitButtonSelector);r.classList.remove(t.inactiveButtonClass),r.disabled=!1}(e,t)):function(e,t){var r=e.querySelector(t.submitButtonSelector);r.classList.add(t.inactiveButtonClass),r.disabled=!0}(e,t)};function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button__disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){r.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r),l(e,r)}(e,r,t)}))}))}(t,e)}))}(d);var p=document.querySelector(".places__list");function f(t){e(A),j.src=t.target.src,j.alt=t.target.alt,T.textContent=t.target.alt}var m="0a730956-138e-4f26-a999-f5e2923b61e4",v="https://nomoreparties.co/v1/wff-cohort-7/";function y(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}Promise.all([fetch("".concat(v,"users/me/"),{method:"GET",headers:{authorization:m}}).then(y),fetch("".concat(v,"cards"),{method:"GET",headers:{authorization:m}}).then(y)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,c,i=[],u=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],u=n[1];document.querySelector(".profile__title").textContent=o.name,document.querySelector(".profile__description").textContent=o.about,document.querySelector(".profile__image").style.backgroundImage="url(".concat(o.avatar,")"),u.forEach((function(e){p.append(a(e,c,i,f))}))})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",n)}));var _=document.querySelector(".profile__edit-button"),S=document.querySelector(".popup_type_edit"),h=S.querySelector(".popup__close"),b=S.querySelector(".popup__form"),q=document.querySelector(".profile__title"),g=document.querySelector(".profile__description");_.addEventListener("click",(function(){e(S),b.elements.name.value=q.textContent,b.elements.description.value=g.textContent,l(b,d)})),h.addEventListener("click",(function(){t(S)})),b.addEventListener("submit",(function(e){e.preventDefault(),q.textContent=b.elements.name.value,g.textContent=b.elements.description.value,t(S),fetch("".concat(v,"users/me/"),{method:"PATCH",headers:{authorization:m,"Content-Type":"application/json"},body:JSON.stringify({name:b.elements.name.value,about:b.elements.description.value})}).then(y)}));var C=document.querySelector(".profile__add-button"),E=document.querySelector(".popup_type_new-card"),L=E.querySelector(".popup__close"),k=E.querySelector(".popup__form");C.addEventListener("click",(function(){e(E),k.elements.place.value="",k.elements.link.value="",l(k,d)})),L.addEventListener("click",(function(){t(E)})),k.addEventListener("submit",(function(e){e.preventDefault(),p.prepend(a({name:k.elements.place.value,link:k.elements.link.value},c,i,f)),t(E),fetch("".concat(v,"cards"),{method:"POST",headers:{authorization:m,"Content-Type":"application/json"},body:JSON.stringify({name:k.elements.place.value,link:k.elements.link.value})}).then(y),k.reset()}));var A=document.querySelector(".popup_type_image"),x=A.querySelector(".popup__close"),j=A.querySelector(".popup__image"),T=A.querySelector(".popup__caption");x.addEventListener("click",(function(){t(A)}))})();