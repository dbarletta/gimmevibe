angular.module('gvibe.services')

.service('places', function ($q, location) {

    //private vars
    var self = this;
    var map = null;
    var placesAPI = null;
    var places = [];
    var searchRadius = '500'; //in meters
    var needToFetch = true;

    //public methods
    self.setSearchRadius = function (radius) {
        searchRadius = radius;
    }

    self.getAll = function () {
        var deferred = $q.defer();

        if (!needToFetch) {
            deferred.resolve(places);
        }
        else {
            location.getCurrentLocation().then(function (latLong) {
                fetchGooglePlaces(deferred, latLong);
            }, function (msg) { deferred.reject(msg); });
        }

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
        

    //private methods
    var fetchGooglePlaces = function (deferred, latLong) {
        var gLocation = new google.maps.LatLng(latLong.lat, latLong.long);
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
                    deferred.reject(ian.format('No places found in lat:{0}, long:{1})', latLong.lat, latLong.long));
                }
            }
            else {
                deferred.reject(status);
            }
        });
    }


});