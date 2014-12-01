angular.module('gvibe.controllers')

.controller('PlaceListCtrl', function ($scope, $state, places, vote) {
    $scope.places = places.getAll();

    $scope.hasPhoto = function (place) {
        if(place.photos && place.photos.length > 0) 
            return true
        
        return false;
    }

    $scope.getPhoto = function (place, width) {
        if (place.photos && place.photos.length > 0) {
            return place.photos[0].getUrl({ 'maxWidth': width || 80 });
        }
        else {
            return vote.defaultImage;
        }
    }

    $scope.getRating = function (place) {
        
            return place.rating || 'not rated';
    }

    $scope.changePlace = function (place) {

        vote.place = {
            name: place.name,
            photo: $scope.getPhoto(place, 300),
            rating: $scope.getRating(place)
        }

        if(vote.emotion == null){
            $state.go('home.vote');
        }            
        else {
            $state.go('home.voteinfo');
        }
    }
})