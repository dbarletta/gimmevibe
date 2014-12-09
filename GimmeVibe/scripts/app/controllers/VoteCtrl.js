angular.module('gvibe.controllers')

.controller('VotesCtrl', function ($scope, $ionicPopup, $state, emotion, vote) {

    $scope.emotions = [];

    $scope.selectEmotion = function (emotion) {
        vote.emotion = emotion;
        $state.go('home.voteinfo');
    }


    emotion.getAll().then(function () {
        $scope.emotions = emotion.emotions;
    });
})