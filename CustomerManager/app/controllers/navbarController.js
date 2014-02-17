(function () {

    var NavbarController = function ($scope, $location, config, authService) {
        $scope.isCollapsed = false;
        var appTitle = 'Customer Management';
        $scope.appTitle = (config.useBreeze) ? appTitle + ' Breeze' : appTitle;

        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        };

        $scope.loginOrOut = function () {
            setLoginLogoutText();
            var isAuthenticated = authService.user.isAuthenticated;
            if (isAuthenticated) { //logout 
                authService.logout().then(function () {
                    $location.path('/');
                });                
            }
            else {
                var path = authService.loginPath + $location.$$path;
                $location.path(path);
            }
        };

        $scope.$on('loginStatusChanged', function (loggedIn) {
            setLoginLogoutText(loggedIn);
        });

        function setLoginLogoutText() {
            $scope.loginLinkText = (authService.user.isAuthenticated) ? 'Logout' : 'Login';
        }

        setLoginLogoutText();

    };

    NavbarController.$inject = ['$scope', '$location', 'config', 'authService'];

    angular.module('customersApp').controller('NavbarController', NavbarController);

}());
