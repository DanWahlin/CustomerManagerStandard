(function () {

    var ordersController = function ($scope, dataService) {
        $scope.customers = [];

        //paging
        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        init();

        $scope.pageChanged = function (page) {
            $scope.currentPage = page;
            getCustomers();
        };

        function init() {
            getCustomers();
        }

        function getCustomers() {
            dataService.getCustomers($scope.currentPage - 1, $scope.pageSize)
                .then(function (data) {
                    $scope.totalRecords = data.totalRecords;
                    $scope.customers = data.results;
                }, function (error) {
                    alert(error.message);
                });
        }
    };

    customersManager.customersApp.controller('OrdersController', ['$scope', 'dataService', ordersController]);

}());