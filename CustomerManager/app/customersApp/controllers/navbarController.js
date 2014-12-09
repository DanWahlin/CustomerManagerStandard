(function () {

    var injectParams = ['$scope', '$location', 'config', 'authService'];

    var NavbarController = function ($scope, $location, config, authService) {
        var vm = this,
            appTitle = 'Customer Management';

        vm.isCollapsed = false;
        vm.appTitle = (config.useBreeze) ? appTitle + ' Breeze' : appTitle;

        vm.highlight = function (path) {
            return $location.path().substr(0, path.length) === path;
        };

        vm.loginOrOut = function () {
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
            $location.replace();
            $location.path(path);
        }

        $scope.$on('loginStatusChanged', function (loggedIn) {
            setLoginLogoutText(loggedIn);
        });

        $scope.$on('redirectToLogin', function () {
            redirectToLogin();
        });

        function setLoginLogoutText() {
            vm.loginLogoutText = (authService.user.isAuthenticated) ? 'Logout' : 'Login';
        }

        setLoginLogoutText();

    };

    NavbarController.$inject = injectParams;

    angular.module('customersApp').controller('NavbarController', NavbarController);

}());
