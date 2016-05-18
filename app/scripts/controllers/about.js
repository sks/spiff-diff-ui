define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name specDiffUiApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the specDiffUiApp
   */
  angular.module('specDiffUiApp.controllers.AboutCtrl', [])
    .controller('AboutCtrl', function () {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});
