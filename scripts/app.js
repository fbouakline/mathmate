  'use strict';

angular
  .module('mathMateApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/rekenen', {
        templateUrl: 'views/bewerking.html',
        controller: 'RekenenCtrl'
      })
      .when('/generate', {
        templateUrl: 'views/bewerking.html',
        controller: 'GenerateCtrl'
      })
      .when('/klasse6/:keuze', {
        templateUrl: 'views/bewerking.html',
        controller: 'Klasse6Ctrl'
      })
      .when('/rad', {
          templateUrl: 'views/rad.html',
          controller: 'MainCtrl'
      })
      .when('/games', {
        templateUrl: 'views/games.html',
        controller: 'GamesCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'MainCtrl'
      })
      .when('/dart', {
        templateUrl: 'views/dart.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
