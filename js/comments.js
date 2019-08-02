'use strict';

(function () {
  var commentsContainer = document.querySelector('.social__comments');


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

  window.renderComments = function (comments) {

    var fragment = document.createDocumentFragment();

    comments.forEach(function (item) {
      if (comments.length > 5) {
        var loadedCount = 0;
        comments.length = loadedCount;
      }
      fragment.appendChild(createComment(item));
    });

    commentsContainer.appendChild(fragment);
  };

})();
