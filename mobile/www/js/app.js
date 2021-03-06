// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// , 'ionic.ion.headerShrink'
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller : 'BrowseCtrl'
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})
.directive('ionSearch', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                getData: '&source',
                model: '=?',
                search: '=?filter'
            },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};

                if (attrs.class)
                    element.addClass(attrs.class);

                if (attrs.source) {
                    scope.$watch('search.value', function (newValue, oldValue) {
                        if (newValue.length > attrs.minLength) {
                            scope.getData({str: newValue}).then(function (results) {
                                scope.model = results;
                            });
                        } else {
                            scope.model = [];
                        }
                    });
                }

                scope.clearSearch = function() {
                    scope.search.value = '';
                };
            },
            template: '<div class="item-input-wrapper">' +
                        '<i class="icon ion-android-search"></i>' +
                        '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                        '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                      '</div>'
        };
    })
    
.directive('headerShrink', function ($document) {
    var fadeAmt;

    var shrink = function (header, content, amt, max) {
        amt = Math.min(max, amt);
        fadeAmt = 1 - amt / max;
        ionic.requestAnimationFrame(function () {
            header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
            for (var i = 0, j = header.children.length; i < j; i++) {
                header.children[i].style.opacity = fadeAmt;
            }
        });
    };

    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {
            var starty = $scope.$eval($attr.headerShrink) || 0;
            var shrinkAmt;

            var amt;

            var y = 0;
            var prevY = 0;
            var scrollDelay = 0.4;

            var fadeAmt;

            var headers = $document[0].body.querySelectorAll('.bar-header');
            var headerHeight = headers[0].offsetHeight;

            function onScroll(e) {
                var scrollTop = e.detail.scrollTop;

                if (scrollTop >= 0) {
                    y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
                } else {
                    y = 0;
                }
                console.log(scrollTop);

                ionic.requestAnimationFrame(function () {
                    fadeAmt = 1 - (y / headerHeight);
                    for (var k = 0, l = headers.length; k < l; k++) {
                        headers[k].style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
                        headers[k].style.opacity = fadeAmt;
                    }
                });

                prevY = scrollTop;
            }

            $element.bind('scroll', onScroll);
        }
    };
})
    
;
