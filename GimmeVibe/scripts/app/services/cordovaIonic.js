angular.module('gvibe.services')

.service("cordova", function ($q, $window, $ionicPlatform) {
    this.ready = function () {
        var deferred = $q.defer();

        $ionicPlatform.ready(function () {
            deferred.resolve($window.cordova);
        });

        return deferred.promise;
    }
});