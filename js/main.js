/**
 * Created by fdhuang on 11/25/15.
 */


requirejs.config({
  baseUrl: "",
  paths: {
    "three": "js/libs/three.min",
    "leapjs": "js/libs/leap-0.6.4.min",
    "leap.screen-position": "js/libs/leap.screen-position",
    leapjswithplugins: "js/libs/leap-plugins-0.11.min"
  },
  shim: {
    'leapjs': {
      exports: 'Leap'
    },
    'leapjswithplugins': {
      exports: 'Leap',
      deps: ['leapjs']
    },
    'leap.screen-position': {
      exports: 'Leap',
      deps: ['leapjs']
    },
    three: {
      exports: 'THREE'
    }
  }
});


require(["three", "leapjs", "leap.screen-position"], function (THREE, Leap) {
  var cats = {};

  Leap.loop(function (frame) {
    frame.hands.forEach(function (hand, index) {
      var cat = ( cats[index] || (cats[index] = new Cat()) );
      cat.setTransform(hand.screenPosition(), hand.roll());
    });
  }).use('screenPosition', {scale: 0.25});


  var Cat = function () {
    var cat = this;
    var img = document.createElement('img');
    img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/109794/cat_2.png';
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

  cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
  Leap.loopController.setBackground(true)
});
