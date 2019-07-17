'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var cancel = bigPicture.querySelector('.cancel');

  // функция закрытия превью картинки
  var closePreview = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPreviewEscPress);
  };

  // закрытие превью по нажитию клавиши esc
  var onPreviewEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePreview();
    }
  };

  window.onClickPicturePreview = function () {
    bigPicture.classList.remove('hidden');
    commentsLoader.classList.add('visually-hidden');
    commentsCount.classList.add('visually-hidden');
    document.addEventListener('keydown', onPreviewEscPress);
  };

  cancel.addEventListener('click', closePreview);

})();
