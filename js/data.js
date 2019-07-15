'use strict';

(function () {
  var imgSort = document.querySelector('.img-filters');
  window.loadedPhotos = [];

  window.updatePhotos = function () {
    window.render(window.loadedPhotos);
  };

  var renderPreviewPhoto = function (evt) {
    document.querySelector('.big-picture__img img').src = evt.target.src;
    document.querySelector('.likes-count').textContent = evt.target.likes;
    document.querySelector('.comments-count').textContent = evt.target.comments;
    document.querySelector('.social__caption').textContent = evt.target.description;
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
