(function () {

    var app = angular.module('customersApp');

    var authFactory = function ($http, $q, $rootScope) {
        var factory = {
            loginPath: '/login',
            user: {
                isAuthenticated: false,
                roles: null
            }
        };

        factory.login = function (email, password) {
            //Simulation at this point so return true
            //In a real app the server would check security 
            //on every call to a secured resource
            var loggedIn = true;
            changeAuth(loggedIn);
            return $q.when(loggedIn);
        };

        factory.logout = function () {
            var loggedIn = false;
            changeAuth(loggedIn);
            return $q.when(loggedIn);
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

    app.factory('authService', authFactory);

}());

