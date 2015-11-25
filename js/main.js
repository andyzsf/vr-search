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


require(['app'], function (app) {
  app.init();
});
