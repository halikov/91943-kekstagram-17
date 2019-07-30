'use strict';

(function () {
  var hashtagsInput = document.querySelector('.text__hashtags');

  hashtagsInput.addEventListener('input', function (evt) {
    evt.preventDefault();

    var hashtags = hashtagsInput.value.toLowerCase();

    if (hashtags.includes(', ')) {
      hashtagsInput.setCustomValidity('Хеш-теги должны быть разделены пробелами.');
    } else if (hashtags.split(' ').some(function (str) {
      return str[0] !== '#' && str[0] !== undefined;
    })) {
      hashtagsInput.setCustomValidity('Хеш-тег должен начинаться со знака #');
    } else if (hashtags.split(' ').some(function (str) {
      return str.length === 1;
    })) {
      hashtagsInput.setCustomValidity('Хеш-тег должен содержать больше 1 символа');
    } else if (hashtags.split(' ').length > 5) {
      hashtagsInput.setCustomValidity('Должно быть не больше 5 хеш-тегов');
    } else if (hashtags.split(' ').some(function (str) {
      return str.length > 20;
    })) {
      hashtagsInput.setCustomValidity('хеш-тег не может быть более 20-ти символов включая #');
    } else if (hashtags.split(' ').sort().some(function (str, i, arr) {
      return str === arr[i + 1];
    })) {
      hashtagsInput.setCustomValidity('Хеш-теги не могут повторяться');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });

})();
