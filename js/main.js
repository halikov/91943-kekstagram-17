'use strict';

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

var getPhotoBank = function () {
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
  var photos = getPhotoBank();
  var pictureBlock = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  photos.forEach(function (item) {
    fragment.appendChild(renderPhotoBlock(item));
  });

  pictureBlock.appendChild(fragment);
};

renderPhotosList();

var uploadFile = document.querySelector('#upload-file');
var imageEditorForm = document.querySelector('.img-upload__overlay');
var cancelUploadFile = document.querySelector('#upload-cancel');
var imagePreview = document.querySelector('.img-upload__preview');
var imageToEdit = imagePreview.querySelector('img');
var effects = document.querySelector('.effects');

// открытие формы редактора
var onUploadChange = function () {
  imageEditorForm.classList.remove('hidden');
};

// закрытие формы редактора
var onFormClose = function () {
  imageEditorForm.classList.add('hidden');
  // удаляет выбранный эффект к картинке
  effects.removeEventListener('click', onEffectChange);
};

// listener для открытия формы редактора
uploadFile.addEventListener('change', onUploadChange);

// listener Для зактрытия формы редактора
cancelUploadFile.addEventListener('click', onFormClose);

// scale transform to image
var scale = document.querySelector('.scale');
var scaleQuantity = scale.querySelector('.scale__control--value');
var minValue = 0;
var maxValue = 100;
var valueStep = 25;

var onScaleClick = function (evt) {
  var lvlScale = parseInt(scaleQuantity.value, 10);
  if (evt.target.classList.contains('scale__control--bigger')) {
    if (lvlScale >= minValue && lvlScale < maxValue) {
      lvlScale += valueStep;
    }
  } else if (evt.target.classList.contains('scale__control--smaller')) {
    if (lvlScale > minValue && lvlScale <= maxValue) {
      lvlScale -= valueStep;
    }
  }
  scaleQuantity.value = lvlScale + '%';
  imageToEdit.style.transform = 'scale(' + lvlScale / 100 + ')';
};

scale.addEventListener('click', onScaleClick);

// накладывает эфект на изображение

var effectLevelWrapper = document.querySelector('.img-upload__effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevel = document.querySelector('[name="effect-level"]'); // на случай если понадобится при определении уровней фильтра. если нет удалю
var effectLevelDepth = document.querySelector('.effect-level__depth');

var applyImageFilters = function (value, percent) {
  switch (value) {
    case 'chrome':
      imagePreview.style.filter = 'grayscale(' + 1 / 100 * percent + ')';
      effectLevelWrapper.style.display = 'block';
      break;
    case 'sepia':
      imagePreview.style.filter = 'sepia(' + 1 / 100 * percent + ')';
      effectLevelWrapper.style.display = 'block';
      break;
    case 'marvin':
      imagePreview.style.filter = 'invert(' + 1 / 100 * percent + '%)';
      effectLevelWrapper.style.display = 'block';
      break;
    case 'phobos':
      imagePreview.style.filter = 'blur(' + 3 / 100 * percent + 'px)';
      effectLevelWrapper.style.display = 'block';
      break;
    case 'heat':
      imagePreview.style.filter = 'brightness(' + 3 / 100 * percent + ')';
      effectLevelWrapper.style.display = 'block';
      break;
    case 'none':
      imagePreview.style.filter = '';
      effectLevelWrapper.style.display = 'none';
      break;
  }
};

effectLevelPin.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  // подсчет отступа пина от начала линии родителя в %
  var pinX = Math.floor(effectLevelPin.offsetLeft / effectLevelLine.offsetWidth * 100);
  effectLevel.value = pinX;
  applyImageFilters(document.querySelector('.effects__radio:checked').value, pinX);
});

// формирует название класса картинки для применения эффекта
var onEffectChange = function (evt) {
  if (evt.target.name === 'effect') {
    imageToEdit.className = 'effects__preview--' + evt.target.value;
    applyImageFilters(evt.target.value, maxValue);
    effectLevel.value = maxValue;
    effectLevelDepth.style.width = maxValue + '%';
    effectLevelPin.style.left = maxValue + '%';
  }
};

effects.addEventListener('change', onEffectChange);
