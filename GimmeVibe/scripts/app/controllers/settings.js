angular.module('gvibe.controllers')

.controller('SettingsCtrl', function ($scope, $state) {

    $scope.watchTutorial = function () {
        window.localStorage['didTutorial'] = false;
        $state.go('intro');
    }
})
