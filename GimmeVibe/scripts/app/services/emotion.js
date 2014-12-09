angular.module('gvibe.services')

.service('emotion', function Vote(apiUrl, $http, $q, $timeout) {

    var self = this;
    var resourcePath = ian.urlCombine(apiUrl, '/emotions');

    //cache
    var emotions = null;

    self.getAll = function () {
        var deferred = $q.defer();

        if (emotions == null) {
            $http.get(resourcePath)
                .success(function (results) {
                    $timeout(function () {
                        emotions = results;
                        deferred.resolve(results);
                    }, 5000);
                });
        }
        else
        {
            //return cached
            deferred.resolve(emotions);
        }

        self.emotions = deferred.promise;

        return self.emotions;
    }
});