define([
  'angular',
  './repos',
  './compare',
  '../services/main'
], function (angular, ReposController, CompareController) {
  'use strict';

  /**
   * @ngdoc function
   * @name specDiffUiApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the specDiffUiApp
   */
   angular.module('specDiffUiApp.controllers', [
     'specDiffUiApp.services'
   ]).controller('ReposCtrl', ReposController)
   .controller('CompareController', CompareController);
});
