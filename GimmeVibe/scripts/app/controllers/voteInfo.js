angular.module('gvibe.controllers')

.controller('VoteInfoCtrl', function ($scope, vote) {
    $scope.emotion = vote   .emotion;
});