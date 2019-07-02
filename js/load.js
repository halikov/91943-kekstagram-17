'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timout', function () {
      onError('Запрос не успел выполнться за ' + xhr.timout + 'мс');
    });
    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();

