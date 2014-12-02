angular.module('gvibe.services')

.factory('vote', function () {
    var Vote = function () {

        this.emotion = null;        
        this.comments = null;
        this.place = {
            name: null,
            photoUrl: null,
            rating: null,
            defaultImage: 'images/noimage.png',
            getImage: function(){
                return this.photoUrl != null ? this.photoUrl : this.defaultImage;
            }
        };

        this.setPlace = function (gPlace) {
            this.place.name = gPlace.name;
            this.rating = gPlace.rationg;
            if(gPlace.photos && gPlace.photos.length > 0)
                $scope.placePhotoUrl = place.photos[0].getUrl({ 'maxWidth': 500 });

        }
    }

    return new Vote();
});