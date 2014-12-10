angular.module('gvibe.services')

.service('vote', function Vote(apiUrl, $http, device) {

    var resourcePath = ian.urlCombine(apiUrl, '/votes');

    var self = this;

    self.emotion = null;
    self.comment = null;

    self.place = {};
    self.place.name = null;
    self.place.photoUrl = null;
    self.place.rating = null;
    self.place.defaultImage = 'images/noimage.png';
    self.place.googlePlaceId = null;
    self.place.hasImage = function () {
        return self.getImage() != self.defaultImage;
    }
    self.place.getImage = function () {
        return self.place.photoUrl != null ? self.place.photoUrl : self.place.defaultImage;
    }

    self.setPlace = function (gPlace) {
        self.place.name = gPlace.name;
        self.place.rating = gPlace.rating;
        if (gPlace.photos && gPlace.photos.length > 0)
            self.place.photoUrl = gPlace.photos[0].getUrl({ 'maxWidth': 500 });
        else
            self.place.photoUrl = null;

        self.place.googlePlaceId = gPlace.id;
    }

    self.save = function () {
        //build voting
        var voting = {};

        //voting vibe
        voting.emotionId = self.emotion.id;
        voting.comment = self.comment;
        
        //voting device
        voting.device = {
            model: device.model,
            platform: device.platform,
            version: device.version,
            uuid: device.uuid
        }

        //voting place
        voting.place = {
            name: self.place.name,
            photoUrl: self.place.photoUrl,
            rating: self.place.rating,
            googlePlaceId: self.place.googlePlaceId
        }

        return $http.post(resourcePath, voting);
    }
});