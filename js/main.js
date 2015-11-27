/**
 * Created by fdhuang on 11/25/15.
 */


requirejs.config({
  baseUrl: "js/",
  paths: {
    "three": "libs/three.min",
    "OrbitControls": "controls/OrbitControls",
    "leapjs": "libs/leap-0.6.4.min",
    "leap.screen-position": "libs/leap.screen-position",
    "leap.hand-entry": "libs/leap.hand-entry",
    "leap.transform": "libs/leap.transform",
    "leap.widgets": "libs/leap-widgets-0.1.0",
    "leap.bone-hand": "libs/leap.bone-hand",
    "minievents": "libs/minivents.amd",
    leapjswithplugins: "libs/leap-plugins-0.1.11.min"
  },
  shim: {
    'leapjs': {
      exports: 'Leap'
    },
    'leapjswithplugins': {
      exports: 'Leap',
      deps: ['leapjs']
    },
    'leap.widgets': {
      exports: 'Leap',
      deps: ['leapjs']
    },
    'OrbitControls': {
      exports: 'OrbitControls',
      deps: ['three']
    },
    three: {
      exports: 'THREE'
    }
  }
});


require(['app', "OrbitControls", "three", "leapjs", "leapjswithplugins", "leap.widgets"], function (app, OrbitControls, THREE, Leap) {
  app.init();
  Leap.loop({background: true})
    .use('transform', {
      vr: 'desktop' // Switch to meters.
    })
    .use('boneHand', {
      targetEl: document.body,
      jointColor: new THREE.Color(0xffffff),
      rendererOps: {antialias: true}
    })
    .use('proximity');

  // Set up scene
  var scene = Leap.loopController.plugins.boneHand.scene;
  var camera = Leap.loopController.plugins.boneHand.camera;
  camera.position.set(0, 0.3, 0.6);

  var axisHelper = new THREE.AxisHelper(0.1);
  scene.add(axisHelper);

  var planeGeo = new THREE.PlaneGeometry(0.1, 0.2);
  var material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide});
  var planeMesh = new THREE.Mesh(planeGeo, material);
  planeMesh.position.setX(0.05);
  planeMesh.position.setY(0.1);
  planeMesh.name = "planeMesh";

  planeMesh.position.set(0.05, 0.05, -0.1);
  planeMesh.rotateY(Math.PI / 4);

  scene.add(planeMesh);

  var plane = new InteractablePlane(planeMesh, Leap.loopController);
});
