var hmd = require("node-hmd"),
  express = require("express"),
  http = require("http").createServer(),
  WebSocketServer = require('ws').Server,
  path = require('path'),
  leapjs = require('leapjs'),
  controller = new leapjs.Controller({
    enableGestures: true,
    frameEventName: 'animationFrame'
  });

var manager = hmd.createManager("oculusrift");
if (typeof(manager) === "undefined") {
  console.error("Unable to load driver: oculusrift");
  process.exit(1);
}

// Instantiate express server
var app = express();
app.set('port', process.env.PORT || 3000);

// Attach socket.io listener to the server
var wss = new WebSocketServer({server: http});
var id = 1;


controller.on('connect', function (data) {
  console.log("Successfully connected.");
});

controller.on('streamingStarted', function (data) {
  console.log("A Leap device has been connected.");
});

controller.on('streamingStopped', function (data) {
  console.log("A Leap device has been disconnected.");
});

controller.connect();

wss.on('open', function open() {
  console.log('connected');
});

// On socket connection set up event emitters to automatically push the HMD orientation data
wss.on("connection", function (ws) {
  function emitOrientation() {
    id = id + 1;
    var deviceQuat = manager.getDeviceQuatSync();
    var devicePosition = manager.getDevicePositionSync();

    var data = JSON.stringify({
      id: id,
      quat: deviceQuat,
      position: devicePosition
    });

    ws.send(data, function (error) {
      //it's a bug of websocket, see in https://github.com/websockets/ws/issues/337
    });
  }

  var orientation = setInterval(emitOrientation, 1000);

  ws.on("message", function (data) {
    clearInterval(orientation);
    orientation = setInterval(emitOrientation, data);
  });

  ws.on("close", function () {
    setTimeout(null, 500);
    clearInterval(orientation);
    console.log("disconnect");
  });
});

// Launch express server
http.on('request', app);
http.listen(3000, function () {
  console.log("Express server listening on port 3000");
});
