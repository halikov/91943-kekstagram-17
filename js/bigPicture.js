'use strict';

(function () {
  var commentsContainer = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var loadedCommentsCount = document.querySelector('.comments-shown');
  var bigPicture = document.querySelector('.big-picture');
  var cancel = bigPicture.querySelector('.cancel');
  var loadMoreButton = document.querySelector('.comments-loader');
  var shownCommentsCount;
  var COMMENTS_TO_SHOW = 5;

  var createComment = function (element) {
    // очищает контейнер коментариев
    commentsContainer.innerHTML = '';

    // клонирует коментарии
    var commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = element.avatar;
    commentItem.querySelector('.social__text').textContent = element.message;
    commentItem.querySelector('.social__picture').alt = element.name;

    return commentItem;
  };

  var renderComments = function (array) {
    // отрисовывает коментарии
    var fragment = document.createDocumentFragment();
    // показывает коментарии в указанном диапозоне
    array.forEach(function (item) {
      fragment.appendChild(createComment(item));
    });

    return fragment;
  };

  var showComments = function (array, count) {
    var renderedComments = array.slice(0, count);
    commentsContainer.appendChild(renderComments(renderedComments));
    loadedCommentsCount.textContent = renderedComments.length;

    if (renderedComments.length < array.length) {
      loadMoreButton.classList.remove('hidden');
    }
  };

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
    shownCommentsCount = COMMENTS_TO_SHOW;
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


    var onLoadMoreButtonClick = function () {
      shownCommentsCount += COMMENTS_TO_SHOW; // 5+5
      showComments(currentPhotoItem.comments, shownCommentsCount);
    };

    loadMoreButton.addEventListener('click', onLoadMoreButtonClick);

    showComments(currentPhotoItem.comments, shownCommentsCount);
  };

  cancel.addEventListener('click', closePreview);
})();
