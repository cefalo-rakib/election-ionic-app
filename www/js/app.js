angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'notifyme.services'])

    .run(function ($rootScope, $state, $ionicPlatform, $window, $cordovaPush, $http, Commons) {

        var androidConfig = {
            "senderID": "341139902696"
        };

        var AIRBOP_APP_KEY = Commons.getAirbopAppKey();
        var AIRBOP_APP_SECRET = Commons.getAirbopAppSecret();

        $ionicPlatform.ready(function () {
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

        document.addEventListener("deviceready", function () {

            $cordovaPush.register(androidConfig).then(function (result) {
                // Success
                console.log("Registered with : " + result);
            }, function (err) {
                // Error
                Commons.setRegistrationValue('');
                console.log("Registration failed with : " + err);
            })

            $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                switch (notification.event) {
                    case 'registered':
                        if (notification.regid.length > 0) {
                            // Set registration id to local storage
                            Commons.setRegistrationValue(notification.regId);

                            // Register with Airdrop
                            var request_uri = Commons.getAirbopRegUrl();
                            var request_body = JSON.stringify({
                                'reg': notification.regid
                            });
                            var timestamp = Math.round(new Date() / 1000);
                            var signature = CryptoJS.SHA256("POST" + request_uri + AIRBOP_APP_KEY
                                                        + timestamp + request_body + AIRBOP_APP_SECRET);

                            $http({
                                'method': 'POST',
                                'url': request_uri,
                                'dataType': "json",
                                'headers': {
                                    'Content-Type': 'application/json',
                                    'x-app-key': AIRBOP_APP_KEY,
                                    'x-timestamp': timestamp,
                                    'x-signature': signature
                                },
                                'data': request_body
                            }).success(function (data, status, headers, config) {
                                console.log("Connection with Airbop successful with status :" + status);
                            }).error(function (data, status, headers, config) {
                                console.log("Connection with Airbop failed with status :" + status);
                            });
                        }
                        break;

                    case 'message':
                        // this is the actual push notification. its format depends on the data model from the push server
                        alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                        break;

                    case 'error':
                        alert('GCM error = ' + notification.msg);
                        break;

                    default:
                        alert('An unknown GCM event has occurred');
                        break;
                }
            });


            // WARNING: dangerous to unregister (results in loss of tokenID)
            $cordovaPush.unregister(options).then(function (result) {
                // Success!
            }, function (err) {
                // Error
            })

        }, false);
    })

    .config(function ($stateProvider, $urlRouterProvider) {
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
                        templateUrl: "templates/browse.html"
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
    });
