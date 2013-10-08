(function () {

    var navbarController = function ($scope, $location, config) {

        var appTitle = 'Customer Management';
        $scope.appTitle = (config.useBreeze) ? appTitle + ' Breeze' : appTitle;
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
    };

    customersManager.customersApp.controller('NavbarController',
        ['$scope', '$location', 'config', navbarController]);

}());
