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
        node.setAttribute('href', 'css/park-it-ios.css');
        window.statusbar.overlaysWebView(false);
        window.statusbar.styleDefault();
    } else {
        node.setAttribute('href', 'css/park-it-android.css');
        window.statusbar.backgroundColorByHexString("#1565C0");
    }
    $("head").appendChild(node);
}

function setParkingLocationSuccess(position) {
    latitude = position.coords.latitude;
    storage.setItem("parkedLatitude", latitude);

    showParkingLocations();
}

function setParkingLocationError(error) {
    navigator.notification.alert("Error Code: " + error.code + "\nError Message: " + error.message);
}

function showParkingLocations() {
    navigator.notification.alert("You are parked at Lat: " + storage.getItem("parkedLatitude") + ", Long: " + storage.getItem("parkedLongitude"));
    //hide directions and instuctions
}

function setParkingLocation() {
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess, setParkingLocationError, {enableHighAccuracy: true});
}

//alert("test");
$(document).ready(function(){

    $("#park").click(function(){
       setParkingLocation();
   });
    $("#retrieve").click(function(){
        alert("Get parking location");
    });
    $("#gotIt").click(function(){
        $("#instructions").hide();
    });
});

$(document).ready( init );