'use strict';

(function () {
  var commentsContainer = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var loadedCommentsCount = document.querySelector('.comments-shown');
  var totalCommentsCount = document.querySelector('.comments-count');
  var loadMoreButton = document.querySelector('.comments-loader');

  // var showLoadMoreButton = function (str1, str2) {
  //   if (str2.length > str1.length) {
  //     loadMoreButton.classList.remove('hidden');
  //   } else {
  //     loadMoreButton.classList.add('hidden');
  //   }
  // };

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

  window.showComments = function (array, count) {
    var renderedComments = array.slice(0, count);
    commentsContainer.appendChild(renderComments(renderedComments));
    loadedCommentsCount.textContent = renderedComments.length;
    totalCommentsCount.textContent = array.length;

    if (loadedCommentsCount.textContent < totalCommentsCount.textContent) {
      loadMoreButton.classList.remove('hidden');
    } else {
      loadMoreButton.classList.add('hidden');
    }
  };

})();
