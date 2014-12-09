angular.module('gvibe.services')

.factory('places', function (cordova, $q, $timeout) {
    var Places = function () {
        //private vars
        var self = this;
        var map = null;
        var placesAPI = null;
        var places = [];
        var lat = 0;
        var long = 0;
        var searchRadius = '500'; //in meters
        var needToFetch = true;

        //public methods
        self.setSearchRadius = function (radius) {
            searchRadius = radius;
        }

        self.getAll = function () {
            var deferred = $q.defer();

            fetchNearbyPlaces().then(function (results) {
                deferred.resolve(results);
            },
            function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        self.getPlace = function () {
            var deferred = $q.defer();

            self.getAll().then(function (results) {
                deferred.resolve(results[0])
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        self.isReady = function () {
            return lat != 0 && long != 0
        }


        //private methods
        var fetchNearbyPlaces = function () {
            var deferred = $q.defer();

            if (needToFetch) {
                if (self.isReady()) 
                    fetchGooglePlaces(deferred);
                else 
                    var prom = getCurrentLocation();

                    prom.then(function () {
                        fetchGooglePlaces(deferred)
                    });
            }
            else 
                deferred.resolve(places);

            return deferred.promise;
        }

        var fetchGooglePlaces = function (deferred) {
            var gLocation = new google.maps.LatLng(lat, long);
            map = new google.maps.Map(document.getElementById('map'), { center: gLocation, zoom: 15 });
            if (placesAPI == null)
                placesAPI = new google.maps.places.PlacesService(map);
            var request = { location: gLocation, radius: '500' };
            placesAPI.nearbySearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    if (results && results.length > 0) {
                        needToFetch = false;
                        places = results;
                        deferred.resolve(results);
                    }
                    else {
                        deferred.reject(ian.format('No places found in lat:{0}, long:{1})', lat, long));
                    }
                }
                else {
                    deferred.reject(status);
                }
            });
        }

        var getCurrentLocation = function () {
            var deferred = $q.defer();

            cordova.ready().then(function (cordova) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                    deferred.resolve({ lat: lat, long: long });
                }, function onError(error) {
                    deferred.reject(ian.format('Error getting coordinates. \nError:{0} \nMessage:{1}', error.code, error.message));
                }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
            });

            return deferred.promise;
        }
    }

    return new Places();
});