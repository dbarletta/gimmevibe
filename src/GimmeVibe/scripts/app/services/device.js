angular.module('gvibe.services')

.service('device', function ($q, $ionicPlatform) {
    var self = this;

    self.model = null;
    self.platform = null;
    self.version = null;
    self.uuid = null;

    self.getDeviceInfo = function () {
        var deferred = $q.defer();

        $ionicPlatform.ready(function () {
            var d = ionic.Platform.device();
            var p = ionic.Platform.platform();
            var v = ionic.Platform.version();

            if (d.uuid === undefined) {
                d.model = 'ripple test';
                d.platform = 'ripple';
                d.version = '0.0';
                d.uuid = 'ripple-000';
            }

            self.model = d.model;
            self.platform = d.platform;
            self.version = d.version;
            self.uuid = d.uuid;

            deferred.resolve(d);
        });

        return deferred.promise;
    }

});

