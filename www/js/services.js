angular.module('notifyme.services', [])

    .factory('Commons', function ($window, Storage) {
        var registrationIdKey = 'registrationId';
        return {
            isRegistered: function() {
                if (Storage.getLocalStorageMapAsString(registrationIdKey)) {
                    return true;
                }
                ;
                return false;
            },

            getRegistrationKey: function() {
                return registrationIdKey;
            },
            setRegistrationValue: function(registrationId) {
                Storage.setLocalStorageMapAsString(registrationIdKey, registrationId);
            },

            getAirbopRegUrl : function () {
                return 'http://www.airbop.com/api/v1/register';
            },
            getBlogUrl : function () {
                return 'https://rsnishorgo.wordpress.com/feed/';
            },
            getAirbopAppKey : function() {
                return '0486ff8d-ab01-477f-8467-63132d0cd1c8';
            },
            getAirbopAppSecret : function() {
                return '8ea8e4441e63835047cf85ab1da3611c2e6e0e0802117361bfefe116b11daadf';
            }
        };
    })

    .factory('Storage', function($window) {
        return {
            getLocalStorage: function() {
                return $window.localStorage;
            },

            getLocalStorageMapValue: function(keyName) {
                return JSON.parse($window.localStorage[keyName] || '[]');
            },
            setLocalStorageMapValue: function(keyName, keyValue) {
                $window.localStorage[keyName] = JSON.stringify(keyValue);
            },

            getLocalStorageMapAsString: function(keyName) {
                return $window.localStorage[keyName];
            },
            setLocalStorageMapAsString: function(keyName, keyValue) {
                $window.localStorage[keyName] = keyValue;
            }
        };
    })

    .factory('Feeds', function ($window) {
        return {
            all: function () {
                var feedsLoaded = JSON.parse($window.localStorage['feeds'] || '[]');
                return feedsLoaded;
            },
            set: function (feeds) {
                $window.localStorage['feeds'] = JSON.stringify(feeds);
            },
            getFeed: function (notificationId) {
                var feeds = JSON.parse($window.localStorage['feeds'] || '[]');
                var index = feeds.map(function (x) {
                    return x.notificationId;
                }).indexOf(notificationId);
                return feeds[index];
            },
            addFeed: function (feed) {
                var feeds = JSON.parse($window.localStorage['feeds'] || '[]');
                var found = false;
                for (var i = 0; i < feeds.length; i++) {
                    if (feeds[i].notificationId == feed.notificationId) {
                        found = true;
                    }
                    ;
                }
                if (!found) {
                    feeds.unshift(feed);
                    $window.localStorage['feeds'] = JSON.stringify(feeds);
                }
                ;
            },
            removeFeed: function (feed) {
                var feeds = JSON.parse($window.localStorage['feeds'] || '[]');
                var index = feeds.map(function (x) {
                    return x.notificationId;
                }).indexOf(feed.notificationId);
                feeds.splice(index, 1);
                $window.localStorage['feeds'] = JSON.stringify(feeds);
            },
            clearFeeds: function () {
                $window.localStorage['feeds'] = '[]';
            }
        };
    });