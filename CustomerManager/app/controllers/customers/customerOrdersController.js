(function () {

    var CustomerOrdersController = function ($scope, $routeParams, dataService) {
        //Grab customerId off of the route        
        var customerId = ($routeParams.customerId) ? parseInt($routeParams.customerId) : 0;

        $scope.customer = {};
        $scope.ordersTotal = 0.00;

        init();

        function init() {
            if (customerId > 0) {
                dataService.getCustomer(customerId)
                .then(function (customer) {
                    $scope.customer = customer;
                }, function (error) {
                    alert(error.message);
                });
            }
        }
    };

    CustomerOrdersController.$inject = ['$scope', '$routeParams', 'dataService'];

    angular.module('customersApp').controller('CustomerOrdersController', CustomerOrdersController);

}());