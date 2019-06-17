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

uploadFile.addEventListener('change', function () {
  imageEditorForm.classList.remove('hidden');
});

cancelUploadFile.addEventListener('click', function () {
  imageEditorForm.classList.add('hidden');
  // uploadFile.value.reset;
});

// накладывает эфект на изображение
effectsRadioList.forEach(function (effectInput) {
  effectInput.addEventListener('change', function () {
    if (effectInput.checked === true && effectInput.value === 'chrome') {
      imageToEdit.classList.add('effects__preview--chrome');
    } else if (effectInput.checked === true && effectInput.value === 'sepia') {
      imageToEdit.classList.add('effects__preview--sepia');
    } else if (effectInput.checked === true && effectInput.value === 'marvin') {
      imageToEdit.classList.add('effects__preview--marvin');
    } else if (effectInput.checked === true && effectInput.value === 'phobos') {
      imageToEdit.classList.add('effects__preview--phobos');
    } else if (effectInput.checked === true && effectInput.value === 'heat') {
      imageToEdit.classList.add('effects__preview--heat');
    } else {
      imageToEdit.classListadd.add('');
    }
  });
});


//  после отпускания кнопки мыши изменяется value в effect-level__value
effectLevelPin.addEventListener('mouseup', function () {
  effectLevelValue.value = 100;
  effectLevelDepth.width = 100;
});

// изменяет насыщенность эффекта на изображении
effectsRadioList.forEach(function (effectInput) {
  effectLevelValue.addEventListener('change', function () {
    if (effectInput.value === 'chrome') {
      imagePreview.filter = 'grayscale(1)';
    } else if (effectInput.value === 'sepia') {
      imagePreview.filter = 'sepia(1)';
    } else if (effectInput.value === 'marvin') {
      imagePreview.filter = 'invert(100%)';
    } else if (effectInput.value === 'phobos') {
      imagePreview.filter = 'blur(3px)';
    } else if (effectInput.value === 'heat') {
      imagePreview.filter = 'brightness(3)';
    } else {
      imagePreview.filter = '';
    }
  });
});

