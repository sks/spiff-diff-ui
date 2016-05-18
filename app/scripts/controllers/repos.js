define([], function () {
  'use strict';

  return function($scope, $location, GithubAPIService){
    $scope.releases = ['--Loading Releases---'];

    GithubAPIService.GetAllReleases().then(function(response){
      $scope.releases = [];
      response.data.forEach(function(release){
        $scope.releases.push(release.name);
      });
      $scope.currentRelease = $scope.releases[0];
    }, function(error){
      console.log(error);
    });

    $scope.compare =  function(){
      if($scope.previousRelease && $scope.latestRelease){
        $location.path('/repos/'+$scope.currentRelease+'/'+$scope.previousRelease+'/'+$scope.latestRelease);
      }
    };

    $scope.$watch('currentRelease', function(selectedRelease){
      if(!selectedRelease){
        return;
      }
      GithubAPIService.GetAllVersions(selectedRelease).then(function(response){
        $scope.versions = {};
        response.data.forEach(function(version){
          $scope.versions[version.name.replace('.spec', '')]= version.name;
        });
        $scope.latestRelease = $scope.versions[($scope.versions.length-1)];
      }, function(error){
        console.log(error);
      });
    });
  };
});
