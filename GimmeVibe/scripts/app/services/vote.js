angular.module('gvibe.services')

.factory('vote', function () {
    var Vote = function () {

        this.emotion = null;        
        this.comments = null;
        this.place =
        {
            name: null,
            photoUrl: null,
            rating: null,
            defaultImage: 'images/noimage.png',
            hasImage: function () {
                this.getImage() != this.defaultImage;
            },
            getImage: function() {
                return this.photoUrl != null ? this.photoUrl : this.defaultImage;
            }
        };

        this.setPlace = function (gPlace) {
            this.place.name = gPlace.name;
            this.place.rating = gPlace.rating;
            if (gPlace.photos && gPlace.photos.length > 0)
                this.place.photoUrl = gPlace.photos[0].getUrl({ 'maxWidth': 500 });
            else
                this.place.photoUrl = null;

        }
    }

    return new Vote();
});