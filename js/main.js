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
var effectsRadioList = effects.querySelectorAll('.effects__radio');

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

// накладывает эфект на изображение

// формирует название класса картинки для применения эффекта
var onEffectChange = function (evt) {
  if (evt.target.name === 'effect') {
    imageToEdit.className = 'effects__preview--' + evt.target.value;
  }
};

effects.addEventListener('change', onEffectChange);

var scale = document.querySelector('.scale');
var scaleQuantity = scale.querySelector('.scale__control--value');
var minValue = 0;
var maxValue = 100;
var valueStep = 25;
var defaultValue = maxValue;

var onScaleBiggerClick = function (scaleValue) {
  if (scaleValue >= minValue && scaleValue < maxValue) {
    scaleValue += valueStep;
  }
};

var onScaleSmallerClick = function (scaleValue) {
  if (scaleValue > minValue && scaleValue <= maxValue) {
    scaleValue -= valueStep;
  }
};

var onScaleClick = function (evt) {
  var lvlScale = defaultValue;
  if (evt.target.className === 'scale__control--bigger') {
    onScaleBiggerClick(lvlScale);
  } else if (evt.target.className === 'scale__control--smaller') {
    onScaleSmallerClick(lvlScale);
  }
  scaleQuantity.value = lvlScale + '%';
};

scale.addEventListener('click', onScaleClick);

var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevel = document.querySelector('[name="effect-level"]'); // на случай если понадобится при определении уровней фильтра. если нет удалю

effectLevelPin.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  // подсчет отступа пина от начала линии родителя в %
  var pinX = Math.floor(effectLevelPin.offsetLeft / effectLevelLine.offsetWidth * 100);

  effectLevel.value = pinX;
});

//    Для эффекта «Хром» — filter: grayscale(0..1);
//    Для эффекта «Сепия» — filter: sepia(0..1);
//    Для эффекта «Марвин» — filter: invert(0..100%);
//    Для эффекта «Фобос» — filter: blur(0..3px);
//    Для эффекта «Зной» — filter: brightness(1..3).

effectLevel.addEventListener('change', function (evt) {
  for (var i = 0; i < effectsRadioList.length; i++) {
    if (effectsRadioList[i].checked.className === 'effect__preview--chrome') {
      imagePreview.style.filter = 'grayscale(' + evt.target.value / 100 + ')';
    } else if (effectsRadioList[i].checked.className === 'effect__preview--sepia') {
      imagePreview.style.filter = 'sepia(' + evt.target.value / 100 + ')';
    } else if (effectsRadioList[i].checked.className === 'effect__preview--marvin') {
      imagePreview.style.filter = 'invert(' + evt.target.value / 100 + '%)';
    } else if (effectsRadioList[i].checked.className === 'effect__preview--phobos') {
      imagePreview.style.filter = 'blur(' + Math.floor(evt.target.value / 33) + 'px)';
    } else if (effectsRadioList[i].checked.className === 'effect__preview--heat') {
      imagePreview.style.filter = 'brightness(' + Math.floor(evt.target.value / 33) + ')';
    }
  }
});
