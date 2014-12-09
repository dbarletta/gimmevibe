angular.module('gvibe.controllers')

.controller('VoteInfoCtrl', function ($scope, vote, places, cordova) {
    $scope.emotion = vote.emotion.name;
    $scope.place = null;

    $scope.sendVibe = function () {
        //cordova.ready.then(function () {
        //    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
        //});
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

    var init = function () {
        if (vote.place.name == null) {
            places.getPlace().then(function (gPlace) {
                vote.setPlace(gPlace);
                $scope.place = vote.place;
            });
        }
        else {
            $scope.place = vote.place;
        }
    }

    init();
});



