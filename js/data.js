'use strict';

(function () {
  var imgSort = document.querySelector('.img-filters');
  window.loadedPhotos = [];

  window.updatePhotos = function () {
    window.render(window.loadedPhotos);
  };

  var renderPreviewPhoto = function (evt) {
    var likesCount = document.querySelector('.likes-count');
    var description = document.querySelector('.social__caption');
    var commentsCount = document.querySelector('.comments-count');

    var currentPhoto = evt.target;
    document.querySelector('.big-picture__img img').src = currentPhoto.src;
    window.loadedPhotos.forEach(function (item) {
      if (currentPhoto.getAttribute('src') === item.url) {
        likesCount.textContent = item.likes;
        commentsCount.textContent = item.comments.length;
        description.textContent = item.description;
      }
    });
  };

  var onLoad = function (data) {
    window.loadedPhotos = data;
    imgSort.classList.remove('img-filters--inactive');
    window.render(window.loadedPhotos);

    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (elem) {
      elem.addEventListener('click', window.onClickPicturePreview);
    });

    pictures.forEach(function (itm) {
      itm.addEventListener('click', renderPreviewPhoto);
    });
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onLoad, onError);

})();
