'use strict';

var names = ['Ivan', 'Marya', 'Mika', 'Яков', 'Анна'];

var commentTexts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getComments = function (commentTexts, names) {
  for (var j = 1; j <= 6; j++) {
    var comments = {
      avatar: 'img/avatar-' + j + '.svg',
      message: commentTexts,
      name: names
    };
  }

  return comments;
};
var comment = getComments(commentTexts[random(1, commentTexts.length - 1)], names[random(1, names.length -1)]);


var randomUserPhotos = [];
var getPhotoDescription = function (comments) {
  for (var i = 1; i <= 25; i++) {
    randomUserPhotos.push({
      url: 'photos/' + i + '.jpg',
      likes: random(15, 200),
      comments: comments
    });
  }
  return randomUserPhotos;
};

getPhotoDescription(getComments);

var pictureBlock = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

var renderPhotoBlocks = function (photoBlock) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoBlock.url;
  pictureElement.querySelector('.picture__likes').textContent = photoBlock.likes;
  pictureElement.querySelector('.picture__comments').textContent = photoBlock.comments;

  return pictureElement;
};

for (var k = 0; k < randomUserPhotos.length; k++) {
  fragment.appendChild(renderPhotoBlocks(randomUserPhotos[k]));
}
pictureBlock.appendChild(fragment);
