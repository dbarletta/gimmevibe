angular.module('gvibe.controllers')

.controller('VoteInfoCtrl', function ($scope, vote, places) {
    $scope.emotion = vote.emotion;
    $scope.placeName = ' - ';
    $scope.placePhotoUrl = null;

    $scope.hasImage = function () {
        return $scope.placePhotoUrl != null && $scope.placePhotoUrl != vote.defaultImage;
    }

    $scope.sendVibe = function () {

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    $scope.getClassFor = function (emotion) {
        var cls = "";
        switch (emotion) {
            case "happy": cls = 'button-balanced'; break;
            case "fun": cls = 'button-fun'; break;
            case "angry": cls = 'button-assertive'; break;
            case "cool": cls = 'button-calm'; break;
            case "excited": cls = 'button-light'; break;
            case "pain": cls = 'button-pain'; break;
            case "indifferent": cls = 'button-stable'; break;
            case "sad": cls = 'button-royal'; break;
            case "bored": cls = 'button-dark'; break;
        }

        return cls;
    }

    if (vote.place == null) {
        getNearestPlace();
    }
    else {
        $scope.placeName = vote.place.name;
        $scope.placePhotoUrl = vote.place.photo;
    }
    
    function getNearestPlace() {
        var place = places.getPlace();
        $scope.placeName = place.name;
        if (place.photos && place.photos.length > 0) {
            $scope.placePhotoUrl = place.photos[0].getUrl({ 'maxWidth': 500 });
        }
    }


    var onSuccess = function (position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
              'Longitude: ' + position.coords.longitude + '\n' +
              'Altitude: ' + position.coords.altitude + '\n' +
              'Accuracy: ' + position.coords.accuracy + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
              'Heading: ' + position.coords.heading + '\n' +
              'Speed: ' + position.coords.speed + '\n' +
              'Timestamp: ' + position.timestamp + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }


});



