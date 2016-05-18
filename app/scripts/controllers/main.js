define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name specDiffUiApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the specDiffUiApp
   */
  angular.module('specDiffUiApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function () {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});
