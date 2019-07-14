'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  // var bigPictureImg = document.querySelector('.big-picture__img img');
  // var likesCount = document.querySelector('.likes-count');
  // var comments = document.querySelector('.comments-count');
  // var commentsList = document.querySelector('.social__comments');
  // var description = document.querySelector('.social__caption');
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
