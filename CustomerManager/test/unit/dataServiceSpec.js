describe('dataService Tests', function () {
    var scope,
        mockConfigSvc,
        mockBreezeSvc,
        mockNonBreezeSvc,
        custs = [{
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
        }];

    beforeEach(function () {

        //Way to inject dependency into a factory/service
        module('customersApp', function ($provide) {
            //Create mocks for dataService child
            //dependencies
            mockConfigSvc = {
                useBreeze: false
            };

            mockBreezeSvc = {
                name: 'Breeze'
            };
            mockNonBreezeSvc = {
                name: 'NonBreeze'
            };

            //spyOn(mockConfigSvc, 'useBreeze');
            $provide.value('config', mockConfigSvc);
            $provide.value('customersService', mockNonBreezeSvc);
            $provide.value('customersBreezeService', mockBreezeSvc);
        });


        inject(function ($rootScope, $q) {
            scope = $rootScope.$new();
            mockNonBreezeSvc.getCustomersSummary = function (x, y) {
                return $q.when(
                {
                    totalRecords: 1,
                    results: custs
                });
            };

        });
    });

    it("dataService should return nonBreeze", function () {
        //now we inject the service we're testing.
        inject(function (dataService) {
            expect(dataService.name).toEqual('NonBreeze');
        });
    });

    describe('dataService Tests', function () {
        it('customersService should return custom object with totalRecords equal to 1', function () {
            inject(function (customersService) {
                //Header normally sent from server and contains the totalRecords
                customersService.getCustomersSummary(0, 10).then(function (result) { expect(result.totalRecords).toEqual(1); });
                //scope.$apply();
            });
        });
    });

});