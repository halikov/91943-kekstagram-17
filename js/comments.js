'use strict';

(function () {
  var commentsContainer = document.querySelector('.social__comments');
  var loadedCommentsCount = document.querySelector('.comments-shown');
  var loadMoreButton = document.querySelector('.comments-loader');
  window.SHOWN_COMMENTS_COUNT = 5;
  window.COMMENTS_TO_SHOW = 5;

  window.onLoadMoreButtonClick = function () {
      window.SHOWN_COMMENTS_COUNT += window.COMMENTS_TO_SHOW;
  };

  var createComment = function (comment) {
    // удаляет комментарии
    commentsContainer.innerHTML = '';

    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;
    commentItem.querySelector('.social__picture').alt = comment.name;

    return commentItem;
  };

  var showLoadMoreButton = function (arr) {
    if (arr.length <= window.SHOWN_COMMENTS_COUNT) {
      loadMoreButton.classList.add('hidden');
    } else {
      loadMoreButton.classList.remove('hidden');
    }
  };

  window.renderComments = function (comments) {

    // отрисовывает коментарии
    var fragment = document.createDocumentFragment();
    comments.slice(0, window.SHOWN_COMMENTS_COUNT).forEach(function (item) {
      fragment.appendChild(createComment(item));
    });
    loadedCommentsCount.textContent = comments.length;

    commentsContainer.appendChild(fragment);

    // если количество коментариев больше то показывает кнопку загрузки коментов
    showLoadMoreButton(comments);

    if(comments.length >= window.SHOWN_COMMENTS_COUNT) {
      loadedCommentsCount.textContent = window.SHOWN_COMMENTS_COUNT;
    }

  };

})();
