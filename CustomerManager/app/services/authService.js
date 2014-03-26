﻿(function () {

    var authFactory = function ($http, $q, $rootScope) {
        var serviceBase = '/api/dataservice/',
            factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null
                }
            };

        factory.login = function (email, password) {
            return $http.post(serviceBase + 'login', { userLogin: { userName: email, password: password } }).then(
                function (results) {
                    var loggedIn = results.data.status;
                    changeAuth(loggedIn);
                });
        };

        factory.logout = function () {
            return $http.post(serviceBase + 'logout').then(
                function (results) {
                    var loggedIn = !results.data.status;
                    changeAuth(loggedIn);
                });
        };

        factory.redirectToLogin = function () {
            $rootScope.$broadcast('redirectToLogin', null);
        };

        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = ['$http', '$q', '$rootScope'];

    angular.module('customersApp').factory('authService', authFactory);

}());

