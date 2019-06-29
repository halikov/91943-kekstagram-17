'use strict';

(function () {
  // scale transform to image
  var imagePreview = document.querySelector('.img-upload__preview');
  var scale = document.querySelector('.scale');
  var scaleQuantity = scale.querySelector('.scale__control--value');
  var valueStep = 25;

  var onScaleClick = function (evt) {
    var lvlScale = parseInt(scaleQuantity.value, 10);
    var minScale = 25;
    var maxScale = 100;

    if (evt.target.classList.contains('scale__control--bigger')) {
      if (lvlScale >= minScale && lvlScale < maxScale) {
        lvlScale += valueStep;
      }
    } else if (evt.target.classList.contains('scale__control--smaller')) {
      if (lvlScale > minScale && lvlScale <= maxScale) {
        lvlScale -= valueStep;
      }
    }

    scaleQuantity.value = lvlScale + '%';
    imagePreview.style.transform = 'scale(' + lvlScale / 100 + ')';
  };

  scale.addEventListener('click', onScaleClick);

})();
