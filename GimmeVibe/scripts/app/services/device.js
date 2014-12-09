angular.module('gvibe.services')

.service('device', function ($q, $ionicPlatform) {
    var self = this;

    self.getDeviceInfo = function () {
        var deferred = $q.defer();

        $ionicPlatform.ready(function () {
            var d = ionic.Platform.device();
            var p = ionic.Platform.platform();
            var v = ionic.Platform.version();

            if (d.uuid === undefined) {
                d.model = 'ripple test';
                d.platform = 'ripple';
                d.uuid = 'ripple-000';
                d.version = '0.0';
            }

            deferred.resolve(d);
        });

        return deferred.promise;
    }

});

