'use strict';
(function () {

  // var ESC_KEYCODE = 27;
  var uploadFile = document.querySelector('#upload-file');
  var imageEditorForm = document.querySelector('.img-upload__overlay');
  var cancelUploadFile = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview');
  var textDescription = document.querySelector('.text_description');
  var effectLevelWrapper = document.querySelector('.img-upload__effect-level');
  // дэфолтные значения редактора изображения
  var editorFormOnDefault = function () {
    imagePreview.style = '';
    imagePreview.className = 'img-upload__effect-level';
    effectLevelWrapper.classList.add('hidden');
  };

  // открытие формы редактора
  var openUploadForm = function () {
    imageEditorForm.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
    editorFormOnDefault();
  };

  // закрытие формы редактора
  var closeUploadForm = function () {
    imageEditorForm.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
    document.removeEventListener('click', window.onEffectChange);
  };

  // нажатие на esc кнопку закрытие формы
  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE && document.activeElement !== textDescription) {
      closeUploadForm();
    }
  };

  // listener для открытия формы редактора
  uploadFile.addEventListener('change', openUploadForm);

  // listener Для зактрытия формы редактора
  cancelUploadFile.addEventListener('click', closeUploadForm);

})();
