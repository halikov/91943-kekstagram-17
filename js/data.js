'use strict';

(function () {
  var imgSort = document.querySelector('.img-filters');
  var sortPopular = imgSort.querySelector('#filter-popular');
  var sortNew = imgSort.querySelector('#filter-new');
  var sortDiscussed = imgSort.querySelector('#filter-discussed');
  var newPhotoCount = 10;
  var photos = [];

  // var updatePhotos = function () {
  //   window.render(photos, count);
  // };

  var changeSortBtn = function (evt) {
    if (evt.target === sortNew) {
      sortPopular.className = 'img-filters__button';
      sortDiscussed.className = 'img-filters__button';
      sortNew.className = 'img-filters__button img-filters__button--active';
      window.render(photos, newPhotoCount);
    }
    if (evt.target === sortDiscussed) {
      sortPopular.className = 'img-filters__button';
      sortNew.className = 'img-filters__button';
      sortDiscussed.className = 'img-filters__button img-filters__button--active';
    }
    if (evt.target === sortPopular) {
      sortNew.className = 'img-filters__button';
      sortDiscussed.className = 'img-filters__button';
      sortPopular.className = 'img-filters__button img-filters__button--active';
      window.render(photos, photos.length);
    }
    // updatePhotos();
  };

  imgSort.addEventListener('click', changeSortBtn);

  var onLoad = function (data) {
    photos = data;
    imgSort.classList.remove('img-filters--inactive');
    updatePhotos();
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
