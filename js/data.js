'use strict';

(function () {
  var imgSort = document.querySelector('.img-filters');
  window.loadedPhotos = [];

  window.updatePhotos = function () {
    window.render(window.loadedPhotos);
  };

  var onLoad = function (data) {
    window.loadedPhotos = data;
    imgSort.classList.remove('img-filters--inactive');
    window.render(window.loadedPhotos);

    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (elem) {
      elem.addEventListener('click', window.onClickPicturePreview);
    });
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.onSuccessUpload = function () {

    var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    var main = document.querySelector('main');
    var closeSuccessMessage = successMessage.querySelector('.success__button');

    // функция удаления из main сообщения успешной загрузки
    var removeSuccessMesage = function () {
      main.removeChild(successMessage);
      document.removeEventListener('keydown', onSuccesMessageEscPress);
    };

    // нажатие на esc кнопку закрытие формы
    var onSuccesMessageEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        removeSuccessMesage();
      }
    };

    main.appendChild(successMessage);
    document.addEventListener('keydown', onSuccesMessageEscPress);
    document.addEventListener('click', function () {
      removeSuccessMesage();
    });
    closeSuccessMessage.addEventListener('click', removeSuccessMesage);

  };

  window.OnErrorUpload = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var main = document.querySelector('main');
    var closeErrorMessage = errorMessage.querySelector('.error__button');

    // функция удаления из main сообщения успешной загрузки
    var removeErrorMesage = function () {
      main.removeChild(errorMessage);
      document.removeEventListener('keydown', onErrorMessageEscPress);
    };

    // нажатие на esc кнопку закрытие формы
    var onErrorMessageEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        removeErrorMesage();
      }
    };

    main.appendChild(errorMessage);
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', function () {
      removeErrorMesage();
    });
    closeErrorMessage.addEventListener('click', removeErrorMesage);
  };

  window.load(onLoad, onError);
})();
