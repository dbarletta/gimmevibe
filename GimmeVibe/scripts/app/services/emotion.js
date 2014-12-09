angular.module('gvibe.services')

.service('emotion', function Emotion(apiUrl, $http, $q, $timeout) {

    var self = this;
    var resourcePath = ian.urlCombine(apiUrl, '/emotions');

    //cache
    var emotions = null;

    self.getAll = function () {
        var deferred = $q.defer();

        if (emotions == null) {
            $http.get(resourcePath)
                .success(function (results) {
                    emotions = results;
                    deferred.resolve(results);
                });
        }
        else {
            //return cached
            deferred.resolve(emotions);
        }

        self.emotions = deferred.promise;

        return self.emotions;
    }
});