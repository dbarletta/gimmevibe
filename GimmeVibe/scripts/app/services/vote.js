angular.module('gvibe.services')

.factory('vote', function () {
    var Vote = function () {
        this.defaultImage = '/images/noimage.png';

        this.emotion = null;        
        this.comments = null;
        this.place = null;
    }

    return new Vote();
});