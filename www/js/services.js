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
            getBlogFeedUrl : function () {
                return 'https://adorshodhaka.wordpress.com/feed/';
            },
            getBlogUrl : function () {
                return 'https://adorshodhaka.wordpress.com';
            },
            getDccNorthMapUrl : function() {
                return 'http://dncc.gov.bd/dncc-setup/geographical-location-area-of-dncc.html';
            },
            getDccSouthMapUrl : function() {
                return 'http://www.dhakasouthcity.gov.bd/doc/word_n_zone.pdf';
            },
            getKnowDhakaUrl : function() {
                return 'http://bn.banglapedia.org/index.php?title=%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE';
            },
            getTabithFbUrl : function() {
                return 'https://www.facebook.com/TabithAwal.ForMayor';
            },
            getAbbasFbUrl : function() {
                return 'https://www.facebook.com/MirzaAbbasOfficial';
            },
            getIdealDhakaFbUrl : function() {
                return 'https://www.facebook.com/AdarshaDhakaAndolon';
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