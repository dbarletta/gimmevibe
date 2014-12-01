angular.module('gvibe.controllers')

.controller('VoteInfoCtrl', function ($scope, vote, places) {
    $scope.emotion = vote.emotion;
    $scope.placeName = ' - ';
    $scope.placePhotoUrl = null;

    $scope.hasImage = function () {
        return $scope.placePhotoUrl != null && $scope.placePhotoUrl != vote.defaultImage;
    }

    $scope.sendVibe = function () {

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

});



