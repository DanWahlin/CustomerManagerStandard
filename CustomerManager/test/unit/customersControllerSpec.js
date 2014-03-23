describe('customersController Tests', function () {
    var $scope,
        createController,
        createBreezeController,
        fakeCustomersService,
        fakeBreezeCustomersService,
        q;

    fakeCustomersService = {
        getCustomersSummary: function () {
            var data = {
                totalRecords: 1,
                results: [{
                    "id": 1,
                    "firstName": "Marcus",
                    "lastName": "HighTower",
                    "city": "Phoenix",
                    "state": {
                        "id": 1,
                        "abbreviation": "AZ",
                        "name": " Arizona"
                    },
                    "orderCount": 6,
                    "gender": "Male"
                }]
            }
            return q.when(data); //return promise
        }
    };

    fakeBreezeCustomersService = {
        getCustomersSummary: function () {
            var manager = testNS.entityManagerFactory();

            var state = manager.createEntity('State', {
                "id": 1,
                "abbreviation": "AZ",
                "name": " Arizona"
            }, breeze.EntityState.Unchanged);

            var cust = manager.createEntity('Customer', {
                "id": 1,
                "firstName": "Marcus",
                "lastName": "HighTower",
                "city": "Phoenix",
                "state": state,
                //"orderCount": 6, Not a server-side property
                "gender": "Male"
            }, breeze.EntityState.Unchanged);

            var data = {
                totalRecords: 1,
                results: [cust]
            };

            return q.when(data); //return promise
        }
    };

    //Define module under test
    beforeEach(function () {
        module('customersApp');

        inject(function ($controller, $rootScope, $q) {
            $scope = $rootScope.$new();
            q = $q;

            //Create a re-useable way to create controllers that use different factories
            createController = function () {
                return $controller('CustomersController', {
                    $scope: $scope,
                    dataService: fakeCustomersService
                });
            };

            createBreezeController = function () {
                return $controller('CustomersController', {
                    $scope: $scope,
                    dataService: fakeBreezeCustomersService
                });
            };
        });
    });

    it('should have 1 customer when using $http factory', function () {
        var ctrl = createController();
        $scope.$apply(); //Ensure promises are resolved
        expect($scope.customers.length).toEqual(1);
    });

    it('should have 1 totalRecord when using $http factory', function () {
        var ctrl = createController();
        $scope.$apply(); //Ensure promises are resolved
        expect($scope.totalRecords).toEqual(1);
    });

    it('should have 1 customer when using Breeze factory', function () {
        var ctrl = createBreezeController(); 
        $scope.$apply(); //Ensure promises are resolved
        expect($scope.customers.length).toEqual(1);
    });

    it('should have 1 totalRecord when using Breeze factory', function () {
        var ctrl = createBreezeController();
        $scope.$apply(); //Ensure promises are resolved
        expect($scope.totalRecords).toEqual(1);
    });

    it('should switch to card view', function () {
        var ctrl = createController();
        $scope.changeDisplayMode($scope.DisplayModeEnum.Card);
        $scope.$apply();
        expect($scope.listDisplayModeEnabled).toBe(false);
    });

    it('should switch to list view', function () {
        var ctrl = createController();
        $scope.changeDisplayMode($scope.DisplayModeEnum.List);
        $scope.$apply();
        expect($scope.listDisplayModeEnabled).toBe(true);
    });

    describe('customersController Filtering Tests', function () {

        it('should return 1 filtered customer', function () {
            var ctrl = createController();
            doFilter({
                filter: '',
                expectedCount: 1
            });
        });

        it('should filter and return 0 customers', function () {
            var ctrl = createController();
            doFilter({
                filter: 'Foo',
                expectedCount: 0
            });
        });

        it('should filter by firstName and return 1 customer', function () {
            var ctrl = createController();
            doFilter({
                filter: 'Marcus',
                expectedCount: 1
            });
        });

        it('should filter by lastName and return 1 customer', function () {
            var ctrl = createController();
            doFilter({
                filter: 'HighTower',
                expectedCount: 1
            });
        });

        it('should filter by city and return 1 customer', function () {
            var ctrl = createController();
            doFilter({
                filter: 'Phoenix',
                expectedCount: 1
            });
        });

        it('should filter by state and return 1 customer', function () {
            var ctrl = createController();
            doFilter({
                filter: 'Arizona',
                expectedCount: 1
            });
        });

        function doFilter(data) {
            $scope.searchText = data.filter;
            $scope.$apply();
            expect($scope.filteredCustomers).not.toBe([]);
            expect($scope.filteredCount).toEqual(data.expectedCount);
        }
    });

});

describe('ReminderController Test', function () {
    var scope, controller;

    beforeEach(function () {
        module('reminderApp');
        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller("ReminderController", { $scope: scope, reminderFactory: mockService });
        });
    });

});
