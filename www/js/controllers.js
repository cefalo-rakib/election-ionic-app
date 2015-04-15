angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $window, Commons) {
        $scope.goDccNorthMap = function() {
            window.open(Commons.getDccNorthMapUrl(), '_blank', 'location=yes', 'closebuttoncaption=Done');
        };

        $scope.goDccSouthMap = function() {
            alert('দয়া করে পিডিএফ ফাইলটি সংরক্ষণকরুন');
            window.open(Commons.getDccSouthMapUrl(), '_system', 'location=yes', 'closebuttoncaption=Done');
        };

        $scope.goKnowDhaka = function() {
            window.open(Commons.getKnowDhakaUrl(), '_blank', 'location=yes', 'closebuttoncaption=Done');
        };

        $scope.goTabithFbPage = function() {
            window.open(Commons.getTabithFbUrl(), '_system', 'location=yes', 'closebuttoncaption=Done');
        };

        $scope.goAbbasFbPage = function() {
            window.open(Commons.getAbbasFbUrl(), '_system', 'location=yes', 'closebuttoncaption=Done');
        };

        $scope.goIdealDhakaFbPage = function() {
            window.open(Commons.getIdealDhakaFbUrl(), '_system', 'location=yes', 'closebuttoncaption=Done');
        };

        $scope.goIdealDhakaBlog = function() {
            window.open(Commons.getBlogUrl(), '_blank', 'location=yes', 'closebuttoncaption=Done');
        };
    })

    .controller('DashboardCtrl', function ($scope, $stateParams, Feeds) {
        $scope.entries = Feeds.all();

        $scope.doRefresh = function() {
            $scope.entries = Feeds.all();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.openUrl = function(feedUrl){
            window.open(feedUrl, '_blank', 'location=no', 'closebuttoncaption=Done');
        };

        $scope.$on('refreshFeeds', function (event, feed) {
            Feeds.addFeed(feed);
            $scope.doRefresh();
        });
    })

    .controller('DccNorthCtrl', function ($scope, $stateParams) {
    })

    .controller('DccSouthCtrl', function ($scope, $stateParams) {
    })

    .controller('DccSouthProfileCtrl', function ($scope, $stateParams) {
    })

    .controller('DccNorthProfileCtrl', function ($scope, $stateParams) {
    })

    .controller('IdealDhakaCtrl', function ($scope, $stateParams) {
    })

    .controller('DccNorthManifestoCtrl', function ($scope, $stateParams) {
    })

    .controller('DccSouthManifestoCtrl', function ($scope, $stateParams) {
    })

    .controller('DccNorthVoteCtrl', function ($scope, $stateParams) {
    })

    .controller('DccSouthVoteCtrl', function ($scope, $stateParams) {
    })

    .controller('DccNorthMapCtrl', function ($scope, $stateParams) {
    })

    .controller('DccSouthMapCtrl', function ($scope, $stateParams) {
    })

    .controller('IdealDhakaIntroCtrl', function ($scope, $stateParams) {
    })

    .controller('SubscriptionCtrl', function ($scope, $stateParams, $cordovaPush) {

        $scope.subscribeNotifications = function() {
            // WARNING: dangerous to unregister (results in loss of tokenID)
            $cordovaPush.unregister(options).then(function (result) {
                alert('আদর্শ ঢাকা আন্দোলনে  আপনাকে আমাদের বিশেষভাবে প্রয়োজন');
            }, function (err) {
                console.log('Failed to unregister');
            })
        }
    })

    .controller('ContactCtrl', function ($scope, $stateParams) {
    })

    .controller('TAFBCtrl', function ($scope, $stateParams) {
    })

    .controller('MAFBCtrl', function ($scope, $stateParams) {
    })

    .controller('KnowDhakaCtrl', function ($scope, $stateParams) {
    });
