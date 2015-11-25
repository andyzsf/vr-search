define('cat', [], function() {

  var Cat = function () {
    var cat = this;
    var img = document.createElement('img');
    img.src = './imgs/1.jpg';
    img.style.position = 'absolute';
    img.onload = function () {
      cat.setTransform([window.innerWidth / 2, window.innerHeight / 2], 0);
      document.body.appendChild(img);
    };

    cat.setTransform = function (position, rotation) {
      img.style.left = position[0] - img.width / 2 + 'px';
      img.style.top = position[1] - img.height / 2 + 'px';
      img.style.transform = 'rotate(' + -rotation + 'rad)';
      img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
        img.style.OTransform = img.style.transform;
    };
  };

  return Cat;
});
