angular.module('gvibe.services')

.service('location', function ($q, cordova) {
    var self = this;
    var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };

    var isReady = function () {
        return (self.lat != null && self.long != null);
    }

    self.lat = null;
    self.long = null;

    self.getCurrentLocation = function () {
        var deferred = $q.defer();

        if (isReady()) {
            deferred.resolve({ lat: self.lat, long: self.long });
        }
        else {
            cordova.ready().then(function (cordova) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    self.lat = position.coords.latitude;
                    self.long = position.coords.longitude;
                    deferred.resolve({ lat: self.lat, long: self.long });
                }, function onError(error) {
                    deferred.reject(ian.format('Error getting coordinates. \nError:{0} \nMessage:{1}', error.code, error.message));
                }, options);
            });
        }

        return deferred.promise;
    }

});