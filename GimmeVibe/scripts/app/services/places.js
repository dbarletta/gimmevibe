angular.module('gvibe.services')

.factory('places', function () {
    var Places = function () {
        var map;
        var service;
        var infowindow;

        var places = [];
        var latlong = { lat: -33.8665433, long: 151.1956316 };
        var searchRadius = '500';
        var needToFetch = true;

        this.setSearchRadius = function (radius) {
                searchRadius = radius;
        }

        this.getNearbyPlaces = function () {
            if (needToFetch) {

                var pyrmont = new google.maps.LatLng(latlong.lat, latlong.long);

                map = new google.maps.Map(document.getElementById('map'), { center: pyrmont, zoom: 15 });

                var request = { location: pyrmont, radius: '500' };

                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function (results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        if (results && results.length > 0) {
                            places = results;
                            needToFetch = false;
                        }
                    }
                });
            }
        }

        this.getPlace = function () {

            if (!needToFetch) {
                return places[1];
            }          
            
        }

    }

    return new Places();
});