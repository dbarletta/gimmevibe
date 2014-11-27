angular.module('gvibe.controllers')

.controller('TaskCtrl', function ($scope) {
    $scope.close = function () {
        $scope.modal.hide();
    }

    $scope.add = function () {
        $scope.modal.hide();
    }
});