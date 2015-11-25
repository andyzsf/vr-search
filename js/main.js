/**
 * Created by fdhuang on 11/25/15.
 */


requirejs.config({
    baseUrl: "",
    paths: {
        "three": "js/libs/three.min",
        "leapjs": "js/libs/leap-0.6.4.min",
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
        three: {
            exports: 'THREE'
        }
    }
});


require(["three", "leapjs"], function (THREE, Leap) {
    Leap.loop(function (frameInstance) {
        console.log(frameInstance);
    });
});
