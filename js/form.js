'use strict';
(function () {

  var uploadFile = document.querySelector('#upload-file');
  var imageEditorForm = document.querySelector('.img-upload__overlay');
  var cancelUploadFile = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview');
  var textDescription = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var effectLevelWrapper = document.querySelector('.img-upload__effect-level');

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

  // listener для открытия формы редактора
  uploadFile.addEventListener('change', openUploadForm);

  // listener Для зактрытия формы редактора
  cancelUploadFile.addEventListener('click', closeUploadForm);

})();
