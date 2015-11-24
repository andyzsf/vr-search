/**
 * Created by fdhuang on 11/25/15.
 */


requirejs.config({
    baseUrl: "",
    paths: {
        "three": "js/libs/three.min",
        "leap": "js/libs/leap-0.6.4.min"
    },
    shim: {
        three: {
            exports: 'THREE'
        }
    }
});


require(["three", "leap"],function(THREE, Leap){

});
