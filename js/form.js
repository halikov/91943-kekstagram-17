'use strict';
(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imageEditorForm = document.querySelector('.img-upload__overlay');
  var cancelUploadFile = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview');
  var textDescription = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var effectLevelWrapper = document.querySelector('.img-upload__effect-level');
  var form = document.querySelector('.img-upload__form');


  // дэфолтные значения редактора изображения
  var editorFormOnDefault = function () {
    imagePreview.style = '';
    imagePreview.className = 'img-upload__effect-level';
    effectLevelWrapper.classList.add('hidden');
  };

  // возвращает инпут в фокусе
  var getActiveInput = function () {
    var activeInput;
    if (document.activeElement === textDescription) {
      activeInput = textDescription;
    }
    if (document.activeElement === hashtagsInput) {
      activeInput = hashtagsInput;
    }

    return activeInput;
  };

  // нажатие на esc кнопку закрытие формы
  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== getActiveInput()) {
      closeUploadForm();
    }
  };

  // открытие формы редактора
  var openUploadForm = function () {
    imageEditorForm.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
    editorFormOnDefault();
    hashtagsInput.addEventListener('change', window.onHashtagValidity);
  };

  // закрытие формы редактора
  var closeUploadForm = function () {
    imageEditorForm.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
    document.removeEventListener('click', window.onEffectChange);
    hashtagsInput.removeEventListener('change', window.onHashtagValidity);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), function (response) {
      if (!response) {
        onErrorUpload();
      }
      onSuccessUpload();
      closeUploadForm();
    });
  });

  // listener для открытия формы редактора
  uploadFile.addEventListener('change', openUploadForm);

  // listener Для зактрытия формы редактора
  cancelUploadFile.addEventListener('click', closeUploadForm);


  var onSuccessUpload = function () {

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

  var onErrorUpload = function () {
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

})();
