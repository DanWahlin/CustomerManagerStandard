(function () {

    var LoginController = function ($scope, $location, $routeParams, authService) {
        var path = '/';
        $scope.email = null;
        $scope.password = null;

        $scope.login = function () {
            authService.login($scope.email, $scope.password).then(function (status) {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (status && $routeParams && $routeParams.redirect) {
                    path = '/' + $routeParams.redirect;
                }

                $location.path(path);
            });
        };
    };

    LoginController.$inject = ['$scope', '$location', '$routeParams', 'authService'];

    angular.module('customersApp')
        .controller('LoginController', LoginController);

}());