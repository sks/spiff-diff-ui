define(['angular','js-yaml'], function (angular, jsyaml) {
  'use strict';

  console.log(jsyaml);

  return function($scope, $routeParams, GithubAPIService){
    var release = $routeParams.release;
    var latestRelease = $routeParams.latestRelease;
    var previousRelease = $routeParams.previousRelease;
    var latestSpecDoc,previousSpecDoc;
    $scope.view = {
      newspec : true,
      removedSpec: true,
      modifiedSpec: true,
    };

    $scope.toggleView = function(data){
      $scope.view[data] = !$scope.view[data];
    };

    $scope.getLength = function(obj) {
      return Object.keys(obj).length;
    };

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
          var previousDefault = previousSpecDoc[latestKey]['default'],
              latestDefault = latestSpecDoc[latestKey]['default'];
          if(JSON.stringify(previousDefault) !== JSON.stringify(latestDefault)){
            if(!previousDefault && !latestDefault){
              return;
            }
            $scope.modifiedSpecs[latestKey] = {
              previousSpec: previousSpecDoc[latestKey],
              latestSpec: latestSpecDoc[latestKey]
            };
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
