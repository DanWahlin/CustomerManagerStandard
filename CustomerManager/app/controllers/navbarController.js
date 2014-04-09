﻿(function () {

    var NavbarController = function ($scope, $location, config, authService) {
        var appTitle = 'Customer Management';
        $scope.isCollapsed = false;
        $scope.appTitle = (config.useBreeze) ? appTitle + ' Breeze' : appTitle;

        $scope.loginOrOut = function () {
            setLoginLogoutText();
            var isAuthenticated = authService.user.isAuthenticated;
            if (isAuthenticated) { //logout 
                authService.logout().then(function () {
                    $location.path('/');
                    return;
                });                
            }
            redirectToLogin();
        };

        function redirectToLogin() {
            var path = '/login' + $location.$$path;
            $location.path(path);
        }

        $scope.$on('loginStatusChanged', function (loggedIn) {
            setLoginLogoutText(loggedIn);
        });

        $scope.$on('redirectToLogin', function () {
            redirectToLogin();
        });

        function setLoginLogoutText() {
            $scope.loginLogoutText = (authService.user.isAuthenticated) ? 'Logout' : 'Login';
        }

        setLoginLogoutText();

    };

    NavbarController.$inject = ['$scope', '$location', 'config', 'authService'];

    angular.module('customersApp').controller('NavbarController', NavbarController);

}());
