'use strict';

(function () {
  var sortButtons = document.querySelectorAll('.img-filters__button');
  var currentButton = document.querySelector('.img-filters__button--active');

  var deletePictures = function () {
    var pictures = window.picturesBlock.querySelectorAll('.picture');

    pictures.forEach(function (element) {
      window.picturesBlock.removeChild(element);
    });
  };

  var sortByNew = function () {
    var sorted = window.loadedPhotos.slice()
                .sort(function () {
                  return 0.5 - Math.random();
                })
                .slice(0, 10);

    return sorted;
  };

  var sortByComments = function () {
    var sorted = window.loadedPhotos.slice()
                .sort(function (a, b) {
                  return b.comments.length - a.comments.length;
                });

    return sorted;
  };

  var selectButton = function (button) {
    currentButton.classList.remove('img-filters__button--active');
    currentButton = button;
    currentButton.classList.add('img-filters__button--active');
  };

  var applySortButton = function (sortButton) {
    var sortedPhotos;

    switch (sortButton.id) {
      case 'filter-popular':
        sortedPhotos = window.loadedPhotos;
        break;
      case 'filter-new':
        sortedPhotos = sortByNew();
        break;
      case 'filter-discussed':
        sortedPhotos = sortByComments();
        break;
    }

    if (currentButton !== sortButton) {
      window.debounce(function () {
        deletePictures();
        window.render(sortedPhotos);
      });

      selectButton(sortButton);
    }
  };

  sortButtons.forEach(function (sortButton) {
    sortButton.addEventListener('click', function () {
      applySortButton(sortButton);
    });
  });

})();
