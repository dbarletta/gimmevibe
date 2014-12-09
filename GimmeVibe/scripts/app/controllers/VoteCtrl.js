angular.module('gvibe.controllers')

.controller('VotesCtrl', function ($scope, $ionicPopup, $state, emotion, vote) {

    $scope.emotionsRow1 = [];
    $scope.emotionsRow2 = [];
    $scope.emotionsRow3 = [];

    $scope.selectEmotion = function (emotion) {
        vote.emotion = emotion;
        $state.go('home.voteinfo');
    }

    //initialize
    emotion.getAll().then(function (data) {
        for (var c = 0; c < 3; c++) {
            $scope.emotionsRow1.push(data[c]);
        }

        for (var c = 0; c < 3; c++) {
            $scope.emotionsRow2.push(data[c + 3]);
        }

        for (var c = 0; c < 3; c++) {
            $scope.emotionsRow3.push(data[c + 6]);
        }
    });
})