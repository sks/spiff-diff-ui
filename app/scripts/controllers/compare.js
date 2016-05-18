define(['angular','js-yaml'], function (angular, jsyaml) {
  'use strict';

  console.log(jsyaml);

  return function($scope, $routeParams, GithubAPIService){
    var release = $routeParams.release;
    var latestRelease = $routeParams.latestRelease;
    var previousRelease = $routeParams.previousRelease;
    var latestSpecDoc,previousSpecDoc;

    $scope.newSpecs = {};
    $scope.deletedSpecs = {};
    $scope.modifiedSpecs = {};

    GithubAPIService.GetSpec(release, latestRelease).then(function(response){
      latestSpecDoc = jsyaml.load(response.data, { schema: jsyaml.JSON_SCHEMA });
      compareSpecs();
    });

    GithubAPIService.GetSpec(release, previousRelease).then(function(response){
      previousSpecDoc = jsyaml.load(response.data, { schema: jsyaml.JSON_SCHEMA });
      compareSpecs();
    });

    function compareSpecs(){
      if(!latestSpecDoc || !previousSpecDoc){
        return;
      }
      Object.keys(latestSpecDoc).forEach(function(latestKey){
        if(! previousSpecDoc[latestKey]){
          $scope.newSpecs[latestKey] = latestSpecDoc[latestKey];
        }else {
          if(previousSpecDoc[latestKey]['default'] != latestSpecDoc[latestKey]['default']){
            $scope.modifiedSpecs[latestKey] = {
              previousSpec: previousSpecDoc[latestKey],
              latestSpec: latestSpecDoc[latestKey]
            }
          }
        }
      });

      Object.keys(previousSpecDoc).forEach(function(previousKey){
        if(! latestSpecDoc[previousKey]){
          $scope.deletedSpecs[previousKey] = previousSpecDoc[previousKey];
        }
      });
    }
  };
});
