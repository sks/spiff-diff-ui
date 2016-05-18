define([], function () {
    'use strict';

    return function ApiService($http, $cacheFactory) {

        var httpCache = $cacheFactory.get('$http');
        return {
            get: function (url) {
              return $http.get('https://api.github.com/repos/sks/specs/' + url, {
                  cache: true
              });
            },
            getRaw: function(url) {
              return $http.get('https://raw.githubusercontent.com/sks/specs/master/' + url, {
                  cache: true
              });
            },
            clearCache: function () {
              httpCache.removeAll();
            }
        };
    };
  });
