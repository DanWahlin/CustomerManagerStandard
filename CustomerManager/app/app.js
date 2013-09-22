var customersManager = {};

customersManager.customersApp = angular.module('customersApp',
    ['ngRoute', 'ngAnimate', 'routeResolverServices', 'wc.Directives', 'wc.Animations', 'ui.bootstrap']);

customersManager.customersApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/customers', {
            controller: 'CustomersController',
            templateUrl: '/app/views/customers/customers.html'
        })
        .when('/customerorders/:customerID', {
            controller: 'CustomerOrdersController',
            templateUrl: '/app/views/customers/customerOrders.html'
        })
        .when('/customeredit/:customerID', {
            controller: 'CustomerEditController',
            templateUrl: '/app/views/customers/customerEdit.html'
        })
        .when('/orders', {
            controller: 'OrdersController',
            templateUrl: '/app/views/orders/orders.html'
        })
        .when('/about', {
            controller: 'AboutController',
            templateUrl: '/app/views/about.html'
        })
        .otherwise({ redirectTo: '/customers' });

}]);

//Only needed for Breeze. Maps Q (used by default in Breeze) to Angular's $q to avoid having to call scope.$apply() 
customersManager.customersApp.run(['$q', '$rootScope',
    function ($q, $rootScope) {
        breeze.core.extendQ($rootScope, $q);
}]);





