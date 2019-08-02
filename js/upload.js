'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;
  var TIME = 10000; // 10s

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
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

    xhr.timeout = TIME;

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
