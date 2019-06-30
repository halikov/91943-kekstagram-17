'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var getRandomIndex = function (someArray) {
    return getRandom(0, (someArray.length - 1));
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomNumber: getRandom,
    getRandomIndex: getRandomIndex
  };
})();

