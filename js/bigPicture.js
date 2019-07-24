'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var cancel = bigPicture.querySelector('.cancel');
  // var commentsList = document.querySelectorAll('.social__comment');
  // var commentsContainer = document.querySelector('.social__comments');

  var onClickPhoto = function (evt) {
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

  // функция закрытия превью картинки
  var closePreview = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPreviewEscPress);
    document.removeEventListener('click', onClickPhoto);
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
    socialCommentCount.classList.add('visually-hidden');
    document.addEventListener('keydown', onPreviewEscPress);
    document.addEventListener('click', onClickPhoto);

  };

  cancel.addEventListener('click', closePreview);


})();
