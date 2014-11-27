var app = angular.module('gvibe', ['gvibe.services', 'gvibe.controllers', 'gvibe.directives', 'ionic']);
angular.module('gvibe.directives', []);
angular.module('gvibe.controllers', []);
angular.module('gvibe.services', ['ngResource']);


//factory
app.factory('vote', function () {
    var Vote = function(){
        this.emotion = 'not setted';
        this.latitude = 0;
        this.longiture = 0;
    }

    return Vote;
});

//States
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'views/home.html',
    })
    .state('home.vote', {
        url: "/vote",
        views: {
            'vote-tab': {
                templateUrl: "views/vote.html",
                controller: 'VotesCtrl'
            }
        }
    })
    .state('home.voteinfo', {
        url: "/voteinfo",
        views: {
            'vote-tab': {
                templateUrl: "views/vote-info.html",
                controller: 'VoteInfoCtrl'
            }
        }
    })
    .state('home.results', {
        url: "/results",
        views: {
            'results-tab': {
                templateUrl: "views/results.html",
                //controller: 'ResultsCtrl'
            }
        }
    })
    .state('home.settings', {
        url: "/settings",
        views: {
            'settings-tab': {
                templateUrl: "views/settings.html",
                //controller: 'SettingsCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise("/home/vote");
});