angular.module('gvibe.controllers')

.controller('VotesCtrl', function ($scope, $ionicPopup, $state, vote) {

    $scope.selectEmotion = function (emotion) {
        
        vote.emotion = emotion;

        $state.go('home.voteinfo');
    }
})
