'use strict';

(function () {
  var imgSort = document.querySelector('.img-filters');
  var sortPopular = imgSort.querySelector('#filter-popular');
  var sortNew = imgSort.querySelector('#filter-new');
  var sortDiscussed = imgSort.querySelector('#filter-discussed');

  var changeSortBtn = function (evt) {
    if (evt.target === sortNew) {
      sortPopular.className = 'img-filters__button';
      sortDiscussed.className = 'img-filters__button';
      sortNew.className = 'img-filters__button img-filters__button--active';
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
    }
  };

  imgSort.addEventListener('click', changeSortBtn);
})();
