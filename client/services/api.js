angular.module('Instagram')
    .factory('API', function($http) {

      return {
        getFeed: function() {
          return $http.get('https://ilivebox.herokuapp.com/api/feed');
        },
        getMediaById: function(id) {
          return $http.get('https://ilivebox.herokuapp.com/api/media/' + id);
        },
        likeMedia: function(id) {
          return $http.post('https://ilivebox.herokuapp.com/api/like', { mediaId: id });
        }
      }

    });