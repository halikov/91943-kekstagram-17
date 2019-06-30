'use strict';

(function () {
  var effects = document.querySelector('.effects');
  var effectLevelWrapper = document.querySelector('.img-upload__effect-level');
  var effectLevel = document.querySelector('[name="effect-level"]');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var maxValue = 100;
  var imagePreview = document.querySelector('.img-upload__preview');
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
        imagePreview.style.filter = 'invert(' + 1 * percent + '%)';
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
      imagePreview.className = 'img-upload__effect-lavel effects__preview--' + evt.target.value;
      applyImageFilters(evt.target.value, maxValue);
      setEffectLevelDisplay(evt.target.value !== 'none');
      effectLevel.value = maxValue;
      effectLevelDepth.style.width = maxValue + '%';
      effectLevelPin.style.left = maxValue + '%';
    }
  };

  var getX = function (elem) {
    return elem.getBoundingClientRect().left;
  };

  var onEffectPinMouseMove = function (moveEvt) {
    var pinOffset = moveEvt.pageX + (effectLevelPin.offsetWidth / 2) - getX(effectLevelLine);
    var pinX = Math.floor(pinOffset / effectLevelLine.offsetWidth * 100); // подсчет отступа пина от начала линии родителя в %, где 100 = 100%
    if (pinX < 0) {
      pinX = 0;
    }
    if (pinX > 100) {
      pinX = 100;
    }

    effectLevelPin.style.left = pinX + '%';
    effectLevel.value = pinX;
    effectLevelDepth.style.width = pinX + '%';
    applyImageFilters(document.querySelector('.effects__radio:checked').value, pinX);
    document.addEventListener('mouseup', onEffectPinMouseUp);
  };

  effectLevelPin.addEventListener('mousedown', function () {
    document.addEventListener('mousemove', onEffectPinMouseMove);
  });

  var onEffectPinMouseUp = function () {
    document.removeEventListener('mousemove', onEffectPinMouseMove);
    document.removeEventListener('mouseup', onEffectPinMouseUp);
  };

  effects.addEventListener('change', onEffectChange);

})();
