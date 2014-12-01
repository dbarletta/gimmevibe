angular.module('gvibe.controllers')

.controller('VotesCtrl', function ($scope, $ionicPopup, $state, vote, places) {

    places.getNearbyPlaces();

    $scope.selectEmotion = function (emotion) {
        vote.emotion = emotion;
        $state.go('home.voteinfo');
    }
})