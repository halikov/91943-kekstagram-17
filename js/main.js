'use strict';

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
      message: commentTexts[getRandom(1, (commentTexts.length - 1))],
      name: names[getRandom(1, (names.length - 1))]
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
var effectLevelValue = document.querySelector('.effect-level__value');
var effectsRadioList = effects.querySelectorAll('.effects__radio');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');

// открытие формы редактора
var onUploadChange = function () {
  imageEditorForm.classList.remove('hidden');
};

// закрытие формы редактора
var onFormClose = function () {
  imageEditorForm.classList.add('hidden');
  // удаляет выбранный эффект к картинке
  effects.removeEventListener('click', onEffectClick);
};

// listener для открытия формы редактора
uploadFile.addEventListener('change', onUploadChange);

// listener Для зактрытия формы редактора
cancelUploadFile.addEventListener('click', onFormClose);

// накладывает эфект на изображение
// выводим value выбранного эффекта
var onEffectCheck = function () {
  for (var i = 0; i < effectsRadioList.length; i++) {
    var effectInput = effectsRadioList[i];
    var checkedEffectInput;
    if (effectInput.checked === true) {
      checkedEffectInput = effectInput;
    }
  }
  return checkedEffectInput.value;
};

// формирует название класса картинки для применения эффекта
var onEffectClick = function () {
  imageToEdit.className = 'effects__preview--' + onEffectCheck();
};

// применяем выбраный эффект к картинке добавлением к названию класса value эффекта
effects.addEventListener('click', onEffectClick);

// вычисление координты ползунка
var getPinPosition = function (pin) {
  var box = pin.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

var pinPosition = getPinPosition(effectLevelPin);
var pinPositionX = pinPosition.left;
var pinPositionY = pinPosition.top;

// передача координат ползунка инпуту
var setEffectsLevelValue = function () {
  return {
    top: pinPositionY,
    left: pinPositionX
  };
};
var inputEffectValue = setEffectsLevelValue();

// расчет значения для effect-level__value.value координата левой точки ползунка + половина ползунка
var effectValue = inputEffectValue.left;

//  после отпускания кнопки мыши изменяется value в effect-level__value
effectLevelPin.addEventListener('mouseup', function () {
  effectLevelValue.value = effectValue;
  effectLevelDepth.width = effectValue;
});

// изменяет насыщенность эффекта на изображении
effectsRadioList.forEach(function (effectInput) {
  effectLevelValue.addEventListener('change', function () {
    if (effectInput.value === 'chrome') {
      imagePreview.style.filter = 'grayscale(0%)';
    } else if (effectInput.value === 'sepia') {
      imagePreview.style.filter = 'sepia(0%)';
    } else if (effectInput.value === 'marvin') {
      imagePreview.style.filter = 'invert(0%)';
    } else if (effectInput.value === 'phobos') {
      imagePreview.style.filter = 'blur(0px)';
    } else if (effectInput.value === 'heat') {
      imagePreview.style.filter = 'brightness(1%)';
    } else {
      imagePreview.style.filter = '';
    }
  });
});
