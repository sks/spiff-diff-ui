define([], function () {
    'use strict';

    return function(APIService) {
      return {
        GetAllReleases: function () {
          return APIService.get('contents');
        },
        GetAllVersions: function(selectedRelease) {
          return APIService.get('contents/'+selectedRelease);
        },
        GetSpec: function(release, version) {
          return APIService.getRaw(release+'/'+version+'.spec');
        }
      };
    };
  });
