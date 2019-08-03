'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
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

  window.onClickPicturePreview = function (evt) {

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPreviewEscPress);

    var bigPictureImg = document.querySelector('.big-picture__img img');
    var likesCount = document.querySelector('.likes-count');
    var commentsCount = document.querySelector('.comments-count');
    var description = document.querySelector('.social__caption');
    var clickedPhoto = evt.target;
    var clickedPhotoUrl = clickedPhoto.getAttribute('src');

    var currentPhotoItem = window.loadedPhotos.find(function (item) {
      return clickedPhotoUrl === item.url;
    });

    bigPictureImg.src = currentPhotoItem.url;
    likesCount.textContent = currentPhotoItem.likes;
    commentsCount.textContent = currentPhotoItem.comments.length;
    description.textContent = currentPhotoItem.description;

    window.renderComments(currentPhotoItem.comments);
  };


  cancel.addEventListener('click', closePreview);
})();
