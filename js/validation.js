'use strict';

(function () {

  var hashtagsInput = document.querySelector('.text__hashtags'); // поле ввода хэш-тегов
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;

  // Функция проверки первого символа решетки
  var checkHashtagFirstIndex = function (str) {
    return str.some(function (it) {
      return it[0] !== '#';
    });
  };

  // проверка на уникальность
  var isUniqHashtag = function (str) {
    return str.some(function (it, i, arr) {
      return it === arr[i + 1];
    });
  };

  // Проверка длины хэш-тега
  var checkHashtagLength = function (str) {
    return str.some(function (it) {
      return it.length < HASHTAG_MIN_LENGTH || it.length > HASHTAG_MAX_LENGTH;
    });
  };


  // разделители хэш-тегов
  var checkHashtagSeparator = function (str) {
    return str.some(function (it) {
      return it.lastIndexOf('#') > 0;
    });
  };

  // не более 5 хештегов
  var checkHashtagCount = function (str) {
    return str.length > 5;
  };

  // Запуск функций вылидации полей
  window.onHashtagValidity = function () {

    var hashtags = hashtagsInput.value.toLowerCase().split(' ').filter(function (it) {
      return it.length > 0;
    });

    var validityMessage = ''; // начальное значение сообщения об ошибке

    if (checkHashtagFirstIndex(hashtags)) {
      validityMessage += 'Хэш-тег должен начинаться со знака #. ';
    }

    if (checkHashtagCount(hashtags)) {
      validityMessage += 'Хеш-тегов можно записать не больше 5.';
    }

    if (isUniqHashtag(hashtags)) {
      validityMessage += 'Хеш-теги не могут повторяться.';
    }

    if (checkHashtagLength(hashtags)) {
      validityMessage += 'Длина хэш-тег (не включая #) должна быть не менее 1 символа и не более 20. ';
    }

    if (checkHashtagSeparator(hashtags)) {
      validityMessage += 'Хэш-теги должны быть разделены пробелом (знак \'#\' означает начало нового хэш-тега). ';
    }

    hashtagsInput.setCustomValidity(validityMessage);
    hashtagsInput.style.boxShadow = (validityMessage.length > 0) ? '0 0 0 3px red' : 'none';
  };

})();
