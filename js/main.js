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
    //'leap.screen-position': {
    //  exports: 'Leap',
    //  deps: ['leapjs']
    //},
    //'leap.hand-entry': {
    //  exports: 'Leap',
    //  deps: ['leapjs']
    //},
    'leap.widgets': {
      exports: 'Leap',
      deps: ['leapjs']
    },
    //'leap.transform': {
    //  exports: 'Leap',
    //  deps: ['leapjs']
    //},
    //'leap.bone-hand': {
    //  exports: 'Leap',
    //  deps: ['leapjs']
    //},
    'OrbitControls': {
      exports: 'OrbitControls',
      deps: ['three']
    },
    three: {
      exports: 'THREE'
    }
  }
});


require(['app', "OrbitControls", "leapjs", "leapjswithplugins", "leap.widgets"], function (app, OrbitControls, Leap) {
  //app.init();
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
  var renderer = Leap.loopController.plugins.boneHand.renderer;
  camera.position.set( 0, 0.3, 0.6);

  var controls = new THREE.OrbitControls( camera, renderer.domElement );

  var axisHelper = new THREE.AxisHelper( 0.1 );
  scene.add( axisHelper );


  var planeGeo = new THREE.PlaneGeometry(0.1, 0.2);
  var material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide});
  var planeMesh = new THREE.Mesh(planeGeo, material);
  planeMesh.position.setX(0.05);
  planeMesh.position.setY(0.1);
  planeMesh.name = "planeMesh";

  longThrow = 0.05;
  var base = new THREE.Mesh(new THREE.BoxGeometry(0.1, longThrow, longThrow), new THREE.MeshPhongMaterial({color: 0x222222}));
//  base.position.set(0.05, -0.05, -0.1);
  base.position.set(0.05, 0.05, -0.1);
  base.rotateY(Math.PI / 4);

  planeMesh.position.set(
    0,
    planeMesh.geometry.parameters.height / 2 - longThrow / 2,
    longThrow / 2 + 0.0002
  );
  base.add(planeMesh);

  scene.add(base);

  var plane = new InteractablePlane(planeMesh, Leap.loopController);


});
