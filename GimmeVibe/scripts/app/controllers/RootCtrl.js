angular.module('gvibe.controllers')

.controller('RootCtrl', function ($scope) {
    $scope.onControllerChanged = function (oldController, oldIndex, newController, newIndex) {
        console.log('Controller changed', oldController, oldIndex, newController, newIndex);
        console.log(arguments);
    };
});
