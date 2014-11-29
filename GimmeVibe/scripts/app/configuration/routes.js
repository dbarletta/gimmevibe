﻿angular.module('gvibe')

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('intro', {
        url: '/',
        templateUrl: 'views/intro.html',
        controller: 'IntroCtrl'
    })
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
    .state('home.placeslist', {
        url: "/places-list",
        views: {
            'vote-tab': {
                templateUrl: "views/places-list.html",
                controller: 'PlacesListCtrl'
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
                controller: 'SettingsCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise("/");
    //$urlRouterProvider.otherwise("/home/vote");
});