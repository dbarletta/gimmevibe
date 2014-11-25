angular.module('gvibe.services')

.factory("cordova", ['$q', "$window", "$timeout", function ($q, $window, $timeout) {
    var deferred = $q.defer();
    var resolved = false;

    document.addEventListener('deviceready', function () {
        resolved = true;
        deferred.resolve($window.cordova);
    }, false);

    $timeout(function () {
        if (!resolved && $window.cordova) {
            deferred.resolve($window.cordova);
        }
    });

    return { ready: deferred.promise };
}])