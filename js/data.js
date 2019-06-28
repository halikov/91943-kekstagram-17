'use strict';

(function () {

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomIndex = function (someArray) {
    return getRandom(0, (someArray.length - 1));
  };

  var getComments = function () {
    var names = ['Ivan', 'Marya', 'Mika', 'Яков', 'Анна', 'Соня', 'Федор'];
    var commentTexts = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
    ];
    var comments = [];
    for (var j = 1; j <= 16; j++) {
      comments.push({
        avatar: 'img/avatar-' + j + '.svg',
        message: commentTexts[getRandomIndex(commentTexts)],
        name: names[getRandomIndex(names)]
      });
    }

    return comments;
  };

  var getPhotos = function () {
    var randomUserPhotos = [];
    for (var i = 1; i <= 25; i++) {
      randomUserPhotos.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandom(15, 200),
        comments: getComments()
      });
    }
    return randomUserPhotos;
  };

  var renderPhotoBlock = function (photoBlock) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photoBlock.url;
    pictureElement.querySelector('.picture__likes').textContent = photoBlock.likes;
    pictureElement.querySelector('.picture__comments').textContent = photoBlock.comments.length;

    return pictureElement;
  };

  var renderPhotosList = function () {
    var photos = getPhotos();
    var pictureBlock = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    photos.forEach(function (item) {
      fragment.appendChild(renderPhotoBlock(item));
    });

    pictureBlock.appendChild(fragment);
  };

  renderPhotosList();

})();
