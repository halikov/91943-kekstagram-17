'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var TIME = 10000;
  var SUCCESS_CODE = 200;

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIME; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };

})();

