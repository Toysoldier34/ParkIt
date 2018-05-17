var storage;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
}

function onDeviceReady() {
    var node = document.createElement('link');
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('type', 'text/css');

    if(cordova.platformid == 'ios') {
        node.setAttribute('href', 'styles/park-it-ios.css');
        window.statusbar.overlaysWebView(false);
        window.statusbar.styleDefault();
    } else {
        node.setAttribute('href', 'styles/park-it-android.css');
        window.statusbar.backgroundColorByHexString("#1565C0");
    }
    $("head").appendChild(node);
}

//alert("test");
$(document).ready(function(){

    $("#park").click(function(){
       alert("Set parking location");
   });
    $("#retrieve").click(function(){
        alert("Get parking location");
    });
    $("#gotIt").click(function(){
        $("#instructions").hide();
    });
});