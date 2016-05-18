define([
        'angular',
        './github_api_service',
        './api_service'
    ]/*deps*/,
    function (
      angular,
      GithubAPIService,
      APIService
    )/*invoke*/ {
        'use strict';

        angular.module('specDiffUiApp.services', [])
            .factory('APIService', ['$http', '$cacheFactory', APIService])
            .factory('GithubAPIService', ['APIService', GithubAPIService]);
    });
