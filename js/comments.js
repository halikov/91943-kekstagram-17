'use strict';

(function () {

  var commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');
  var commentItem = commentTemplate.cloneNode(true);
  var commentsList = document.querySelectorAll('.social__comment');
  var commentContainer = document.querySelector('.social__comments');

  var createComment = function (comment) {
    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;
  };

  window.renderComments = function (comments) {
    // удаляет коментарии в шаблоне
    // commentsList.forEach(function (item) {
    //   commentsContainer.removeChild(item);
    // });

    var fragment = document.createDocumentFragment();

    comments.forEach(function (item) {
      fragment.appendChild(createComment(item));
    });

    commentsContainer.appendChild(fragment);
  };

})();
