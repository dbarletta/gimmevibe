angular.module('gvibe.controllers')

.controller('VoteCtrl', function ($scope) {
    $scope.close = function () {
        $scope.modal.hide();
    }

    $scope.add = function () {
        $scope.modal.hide();
    }
});