/*jshint unused: vars */
define(['angular', 'controllers/main', 'services/main']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name specDiffUiApp
   * @description
   * # specDiffUiApp
   *
   * Main module of the application.
   */
  return angular
    .module('specDiffUiApp', [
      'specDiffUiApp.controllers',
      'specDiffUiApp.services',
      'ngResource',
      'ngRoute',
      'ngAnimate'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/repos', {
          templateUrl: 'views/repos.html',
          controller: 'ReposCtrl'
        })
        .when('/repos/:release/:previousRelease/:latestRelease', {
          templateUrl: 'views/compare.html',
          controller: 'CompareController'
        })
        .otherwise({
          redirectTo: '/repos'
        });
    });
});
