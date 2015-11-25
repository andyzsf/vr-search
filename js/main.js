/**
 * Created by fdhuang on 11/25/15.
 */


requirejs.config({
  baseUrl: "js/",
  paths: {
    "three": "libs/three.min",
    "leapjs": "libs/leap-0.6.4.min",
    "leap.screen-position": "libs/leap.screen-position",
    "leap.hand-entry": "libs/leap.hand-entry",
    leapjswithplugins: "libs/leap-plugins-0.11.min"
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
    'leap.hand-entry': {
      exports: 'Leap',
      deps: ['leapjs']
    },
    three: {
      exports: 'THREE'
    }
  }
});


require(["three", "leapjs", "cat", "leap.screen-position", "leap.hand-entry"], function (THREE, Leap, Cat) {
  var cats = {};

  Leap.loop(function (frame) {
      frame.hands.forEach(function (hand, index) {
        var cat = ( cats[index] || (cats[index] = new Cat()) );
        cat.setTransform(hand.screenPosition(), hand.roll());
      });
    })
    .use('handEntry')
    .use('screenPosition', {scale: 0.25})
    .on('handFound', function (hand) {
      console.log('hand found', hand);
    })
    .on('handLost', function (hand) {
      console.log('hand lost', hand);
    });

  cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
  Leap.loopController.setBackground(true)
});
