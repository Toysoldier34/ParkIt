var storage;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
}

function onDeviceReady() {
    if(cordova.platform == 'ios'){
        $('head').append('<link rel="stylesheet" href="css/park-it-ios.css" type="text/css"/>');
        //prevents status bar from overlaying web view
        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    }
    else{
        $('head').append('<link rel="stylesheet" href="css/park-it-android.css" type="text/css"/>');
        window.StatusBar.backgroundColorByHexString("#1565C0");
    }
}

function setParkingLocationSuccess(position) {
    latitude = position.coords.latitude;
    storage.setItem("parkedLatitude", latitude);
//add statements to store the longitute
    longitude = position.coords.longitude;
    storage.setItem("parkedLongitude", longitude);

    //display an alert that shows the latitude and longitude
    navigator.notification.alert("Parking location saved. (Lat: " + latitude + ", Long: " + longitude) + ")";
    showParkingLocation();
}

function setParkingLocationError(error) {
    navigator.notification.alert("Error Code: " + error.code + "\nError Message: " + error.message);
}

function showParkingLocations() {
    //navigator.notification.alert("You are parked at Lat: " + storage.getItem("parkedLatitude") + ", Long: " + storage.getItem("parkedLongitude"));
    //hide directions and instuctions if visible
    $("#directions").hide();
    $("#instructions").hide();

    var latLong = new google.maps.LatLng(latitude, longitude);
    var map = new google.maps.Map(document.getElementById('map'));

    map.setZoom(16);
    map.setCenter(latLong);
    var marker = new google.maps.Marker({
        position: latLong,
        map: map
    });
}

function initMap(){
    var grc = {lat: 47.313582, lng: -122.1800072};

    var mapDiv = new google.maps.Map (document.getElementById('map'), {
        zoom: 10,
        center: grc
    });
}

function setParkingLocation() {
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess, setParkingLocationError, {enableHighAccuracy: true});
}

function getParkingLocation() {
    navigator.geolocation.getCurrentPosition(getParkingLocationSucess,
        getParkingLocationError, { enableHighAccuracy:true });
}

function getParkingLcoationSuccess(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
    parkedLatitude = storage.getItem("parkedLatitude");
    parkedLongitude = storage.getItem("parkedLongitude");

    showDirections();
}

function getParkingLocationError(error) {
    navigator.notification.alert("Error Code: " + error.code
    + "\nError Message: " + error.message);
}

function showDirection(){
    var dRenderer = new google.maps.DirectionRenderer;
    var dService = new google.maps.DirectionsService;
    var curLatLong = new google.maps.LatLng(currentLatitude, currentLongitude);
    var parkedLatLong = new google.maps.latLng(parkedLatitude, parkedLongitude);
    var map = new google.maps.Map(document.getElementById("map"));
    map.setZoom(16);
    map.setCenter(curLatLong);
    dRenderer.setMap(map);
    dService.route({
        origin: curLatLong,
        destination: parkedLatLong,
        travelMode: 'DRIVING'
    }, function(response, status){
        if (status == 'OK'){
            dRenderer.setDirections(response);
            $('#directions').html('');
            dRenderer.setPanel(document.getElementById('directions'));
        } else {
            navigator.notification.alert("Directions failed: " + status);
        }
    });
    $('#map').show();
    $('#directions').show();
    $('#instructions').hide();

}

$("#park").click(function () {
    setParkingLocation();
    //alert("Set parking location");
});

$("#retrieve").click(function() {
    alert("Get parking location");
});

$("#gotIt").click(function () {
    $("#instructions").slideUp();
});

$("#directions").ready(function () {
    $("#directions").hide();
});

$("#instructions").ready(function () {
    $("#instructions").hide();
});

$(document).ready( init );

