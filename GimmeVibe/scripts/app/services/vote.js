angular.module('gvibe.services')

.factory('vote', function () {
    var Vote = function () {
        this.emotion = 'not setted';
        this.latitude = 0;
        this.longiture = 0;
    }

    return Vote;
});