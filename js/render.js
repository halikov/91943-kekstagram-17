'use strict';

(function () {

  var renderPhotoBlock = function (photoBlock) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photoBlock.url;
    pictureElement.querySelector('.picture__likes').textContent = photoBlock.likes;
    pictureElement.querySelector('.picture__comments').textContent = photoBlock.comments.length;

    return pictureElement;
  };

  window.picturesBlock = document.querySelector('.pictures');
  window.render = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPhotoBlock(data[i]));
    }

    window.picturesBlock.appendChild(fragment);
  };

})();
