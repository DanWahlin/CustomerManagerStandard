(function () {

    var app = angular.module('customersApp',
        ['ngRoute', 'ngAnimate', 'wc.directives', 'ui.bootstrap', 'breeze.angular.q', 'autoActive']);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/customers', {
                controller: 'CustomersController',
                templateUrl: '/app/views/customers/customers.html'
            })
            .when('/customerorders/:customerId', {
                controller: 'CustomerOrdersController',
                templateUrl: '/app/views/customers/customerOrders.html'
            })
            .when('/customeredit/:customerId', {
                controller: 'CustomerEditController',
                templateUrl: '/app/views/customers/customerEdit.html',
                secure: true //This route requires an authenticated user
            })
            .when('/orders', {
                controller: 'OrdersController',
                templateUrl: '/app/views/orders/orders.html'
            })
            .when('/about', {
                controller: 'AboutController',
                templateUrl: '/app/views/about.html'
            })
            .when('/login/:redirect*', {
                controller: 'LoginController',
                templateUrl: '/app/views/login.html'
            })
            .otherwise({ redirectTo: '/customers' });

    }]);

    app.run(['$q', 'use$q', '$rootScope', '$location', 'authService',
        function ($q, use$q, $rootScope, $location, authService) {

            use$q($q); //for Breeze.js so that it uses $q instead of Q
            
            //Client-side security. Server-side framework MUST add it's 
            //own security as well since client-based security is easily hacked
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (next && next.$$route && next.$$route.secure) {
                if (!authService.user.isAuthenticated) {
                    authService.redirectToLogin();
                }
            }
        });

        }]);
}());

