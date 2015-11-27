define('app', ["three", "leapjs", "cat"], function (THREE, Leap, Cat) {
  var app = {
    init: function () {
      console.log("app ------------------ start");
      var cats = {};

      var handleSwipe = function (gesture) {
        var swipeDirection;
        //Classify swipe as either horizontal or vertical
        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
        //Classify as right-left or up-down
        if (isHorizontal) {
          if (gesture.direction[0] > 0) {
            swipeDirection = "right";
          } else {
            swipeDirection = "left";
          }
        } else { //vertical
          if (gesture.direction[1] > 0) {
            swipeDirection = "up";
          } else {
            swipeDirection = "down";
          }
        }
        console.log(swipeDirection);
        window.swipeDirection = swipeDirection;
        return swipeDirection;
      };

      Leap.loop(function (frame) {
          if (frame.valid && frame.gestures.length > 0) {
            frame.gestures.forEach(function (gesture) {
              switch (gesture.type) {
                case "circle":
                  console.log("Circle Gesture");
                  break;
                case "keyTap":
                  console.log("Key Tap Gesture");
                  break;
                case "screenTap":
                  console.log("Screen Tap Gesture");
                  break;
                case "swipe":
                  handleSwipe(gesture);
                  break;
              }
            });
          }

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
