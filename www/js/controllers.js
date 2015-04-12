angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, Commons, Feeds) {
        // Form data for the login modal
        $scope.loginData = {};


        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

    })

    .controller('DashboardCtrl', function ($scope, $stateParams) {
        $scope.entries = Feeds.all();

        $scope.doRefresh = function() {
            $scope.entries = Feeds.all();
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.openUrl = function(feedUrl){
            window.open(feedUrl, '_blank', 'location=no', 'closebuttoncaption=Done');
        }
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

    .controller('SubscriptionCtrl', function ($scope, $stateParams) {
    })

    .controller('ContactCtrl', function ($scope, $stateParams) {
    })

    .controller('TAFBCtrl', function ($scope, $stateParams) {
    })

    .controller('MAFBCtrl', function ($scope, $stateParams) {
    })

    .controller('KnowDhakaCtrl', function ($scope, $stateParams) {
    });
