'use strict';

(function () {
  var commentsContainer = document.querySelector('.social__comments');
  var loadedCommentsCount = document.querySelector('.comments-shown');
  var loadMoreButton = document.querySelector('.comments-loader');
  var SHOWN_COMMENTS_COUNT = 5;
  var COMMENTS_TO_SHOW = 5;

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

  var onLoadMoreButtonClick = function (arr) {
    if (arr > SHOWN_COMMENTS_COUNT) {
      arr = Array.from(commentsContainer.querySelectorAll('.social__comment'));
      arr.forEach(function (it) {
        if (it > SHOWN_COMMENTS_COUNT) {
          it.classList.add('hidden');
        } else {
          it.classList.remove('hidden');
        }
      });
      SHOWN_COMMENTS_COUNT += COMMENTS_TO_SHOW;
    }
  };

  window.renderComments = function (comments) {
    if (comments.length <= SHOWN_COMMENTS_COUNT) {
      loadMoreButton.classList.add('hidden');
    } else {
      loadMoreButton.classList.remove('hidden');
    }

    // отрисовывает коментарии
    var fragment = document.createDocumentFragment();
    // показывает коментарии в указанном диапозоне
    comments.forEach(function (item) {
      fragment.appendChild(createComment(item));
    });
    loadedCommentsCount.textContent = comments.length;

    commentsContainer.appendChild(fragment);
    loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
  };

})();
