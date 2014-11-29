angular.module('gvibe.controllers')

.controller('VoteInfoCtrl', function ($scope, vote, places) {
    $scope.emotion = vote.emotion;
    $scope.placeName = ' - ';
    $scope.placePhotoUrl = null;

    $scope.vote = function () {

    }

    getNearestPlace();
    
    function getNearestPlace() {
        var place = places.getPlace();
        $scope.placeName = place.name;
        if (place.photos && place.photos.length > 0) {
            $scope.placePhotoUrl = place.photos[0].getUrl({ 'maxWidth': 500 });
        }
    }

});



