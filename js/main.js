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

//
// настройка окна редактирования фото
//
var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;
var uploadFile = document.querySelector('#upload-file');
var imageEditorForm = document.querySelector('.img-upload__overlay');
var cancelUploadFile = document.querySelector('#upload-cancel');
var imagePreview = document.querySelector('.img-upload__preview');
var imageToEdit = imagePreview.querySelector('img');
var effects = document.querySelector('.effects');
var textDescription = document.querySelector('.text_description');
var effectLevelWrapper = document.querySelector('.img-upload__effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevel = document.querySelector('[name="effect-level"]');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var pinOffsetLeft = effectLevelPin.offsetLeft;
var LEVEL_LINE_WIDTH = effectLevelLine.offsetWidth;

// дэфолтные значения редактора изображения
var editorFormOnDefault = function () {
  imagePreview.style = '';
  imageToEdit.className = '';
  effectLevelWrapper.classList.add('hidden');
};

// открытие формы редактора
var openUploadForm = function () {
  imageEditorForm.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
  editorFormOnDefault();
};

// закрытие формы редактора
var closeUploadForm = function () {
  imageEditorForm.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
  document.removeEventListener('click', onEffectChange);
};

// нажатие на esc кнопку закрытие формы
var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== textDescription) {
    closeUploadForm();
  }
};

// listener для открытия формы редактора
uploadFile.addEventListener('change', openUploadForm);

// listener Для зактрытия формы редактора
cancelUploadFile.addEventListener('click', closeUploadForm);

// scale transform to image
var scale = document.querySelector('.scale');
var scaleQuantity = scale.querySelector('.scale__control--value');
// var minValue = 0;
var maxValue = 100;
var valueStep = 25;

var onScaleClick = function (evt) {
  var lvlScale = parseInt(scaleQuantity.value, 10);
  var minScale = 25;
  var maxScale = 100;

  if (evt.target.classList.contains('scale__control--bigger')) {
    if (lvlScale >= minScale && lvlScale < maxScale) {
      lvlScale += valueStep;
    }
  } else if (evt.target.classList.contains('scale__control--smaller')) {
    if (lvlScale > minScale && lvlScale <= maxScale) {
      lvlScale -= valueStep;
    }
  }

  scaleQuantity.value = lvlScale + '%';
  imagePreview.style.transform = 'scale(' + lvlScale / 100 + ')';
};

// накладывает эфект на изображение

var applyImageFilters = function (value, percent) {
  switch (value) {
    case 'chrome':
      imagePreview.style.filter = 'grayscale(' + 1 / 100 * percent + ')';
      break;
    case 'sepia':
      imagePreview.style.filter = 'sepia(' + 1 / 100 * percent + ')';
      break;
    case 'marvin':
      imagePreview.style.filter = 'invert(' + 1 / 100 * percent + '%)';
      break;
    case 'phobos':
      imagePreview.style.filter = 'blur(' + 3 / 100 * percent + 'px)';
      break;
    case 'heat':
      imagePreview.style.filter = 'brightness(' + 3 / 100 * percent + ')';
      break;
    case 'none':
      imagePreview.style.filter = '';
      break;
  }
};

var onEffectPinMouseUp = function (evt) {
  evt.preventDefault();
  var pinX = Math.floor(pinOffsetLeft / LEVEL_LINE_WIDTH * 100); // подсчет отступа пина от начала линии родителя в %, где 100 = 100%
  effectLevel.value = pinX;
  applyImageFilters(document.querySelector('.effects__radio:checked').value, pinX);
};

var setEffectLevelDisplay = function (isEffect) {
  if (isEffect) {
    effectLevelWrapper.classList.remove('hidden');
  } else {
    effectLevelWrapper.classList.add('hidden');
  }
};

// формирует название класса картинки для применения эффекта
var onEffectChange = function (evt) {
  if (evt.target.name === 'effect') {
    imageToEdit.className = 'effects__preview--' + evt.target.value;
    setEffectLevelDisplay(evt.target.value !== 'none');
    applyImageFilters(evt.target.value, maxValue);
    effectLevel.value = maxValue;
    effectLevelDepth.style.width = maxValue + '%';
    effectLevelPin.style.left = maxValue + '%';
  }
};

scale.addEventListener('click', onScaleClick);
effectLevelPin.addEventListener('mouseup', onEffectPinMouseUp);
effects.addEventListener('change', onEffectChange);
