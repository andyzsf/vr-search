define('app', ["three", "leapjs", "cat", "leap.screen-position", "leap.hand-entry"], function(THREE, Leap, Cat) {
  var app = {
    init: function () {
      console.log("app ------------------ start");
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

      Leap.loopController.setBackground(true);
    }
  };

  return app;
});
