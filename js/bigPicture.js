'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var comments = document.querySelector('.comments-count');
  var commentsList = document.querySelector('.social__comments');
  var description = document.querySelector('.social__caption');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var cancel = bigPicture.querySelector('.cancel');

  var picturePreview = {
    url: bigPictureImg.src,
    likes: likesCount.textContent,
    comments: comments,
    description: description
  };

  window.showPicturePreview = function () {
    bigPicture.classList.remove('hidden');
    commentsLoader.classList.add('visually-hidden');
    commentsCount.classList.add('visually-hidden');
  };

  cancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  });

})();
