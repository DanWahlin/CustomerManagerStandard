(function () {

    var app = angular.module('customersApp',
        ['ngRoute', 'ngAnimate', 'wc.directives', 'ui.bootstrap', 'breeze.angular']);

    app.config(['$routeProvider', function ($routeProvider) {
        var viewBase = '/app/customersApp/views/';

        $routeProvider
            .when('/customers', {
                controller: 'CustomersController',
                templateUrl: viewBase + 'customers/customers.html',
                controllerAs: 'vm'
            })
            .when('/customerorders/:customerId', {
                controller: 'CustomerOrdersController',
                templateUrl: viewBase + 'customers/customerOrders.html',
                controllerAs: 'vm'
            })
            .when('/customeredit/:customerId', {
                controller: 'CustomerEditController',
                templateUrl: viewBase + 'customers/customerEdit.html',
                controllerAs: 'vm',
                secure: true //This route requires an authenticated user
            })
            .when('/orders', {
                controller: 'OrdersController',
                templateUrl: viewBase + 'orders/orders.html',
                controllerAs: 'vm'
            })
            .when('/about', {
                controller: 'AboutController',
                templateUrl: viewBase + 'about.html',
                controllerAs: 'vm'
            })
            .when('/login/:redirect*?', {
                controller: 'LoginController',
                templateUrl: viewBase + 'login.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/customers' });

    }]);

    app.run(['$rootScope', '$location', 'authService',
        function ($rootScope, $location, authService) {
            
            //Client-side security. Server-side framework MUST add it's 
            //own security as well since client-based security is easily hacked
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next && next.$$route && next.$$route.secure) {
                    if (!authService.user.isAuthenticated) {
                        $rootScope.$evalAsync(function () {
                            authService.redirectToLogin();
                        });
                    }
                }
            });

    }]);

}());

