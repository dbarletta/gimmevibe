angular.module('gvibe.controllers')

.controller('ResultsCtrl', function ($scope, device) {

    device.getDeviceInfo().then(function (device) {
        $scope.device = device;
    });
})