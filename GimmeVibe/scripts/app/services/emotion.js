angular.module('gvibe.services')

.service('emotion', function Vote(apiUrl, $http) {

    var resourcePath = ian.urlCombine(apiUrl, '/emotions');

    this.emotions = [];

    this.getAll = function () {
        return $http.get(resourcePath)
            .success(function (results) {
                this.emotions = results;
            });
    }
});