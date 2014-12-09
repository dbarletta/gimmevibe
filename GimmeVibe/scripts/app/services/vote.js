angular.module('gvibe.services')

.service('vote', function Vote(apiUrl, $http) {

    var resourcePath = ian.urlCombine(apiUrl, '/votes');

    this.emotion = null;
    this.comments = null;
    this.place = {};
    this.place.name = null;
    this.place.photoUrl = null;
    this.place.rating = null;
    this.place.defaultImage = 'images/noimage.png';

    this.place.hasImage = function () {
        return this.getImage() != this.defaultImage;
    }

    this.place.getImage = function () {
        return this.photoUrl != null ? this.photoUrl : this.defaultImage;
    }

    this.setPlace = function (gPlace) {
        this.place.name = gPlace.name;
        this.place.rating = gPlace.rating;
        if (gPlace.photos && gPlace.photos.length > 0)
            this.place.photoUrl = gPlace.photos[0].getUrl({ 'maxWidth': 500 });
        else
            this.place.photoUrl = null;

    }

    this.save = function () {
        var vibe = {};

        $http.post(resourcePath, vibe)
            .success(function () {

            });
    }
});