describe('customersService Tests', function () {
    var $scope,
        httpBackend,
        serviceUrl = '/api/dataservice/customersSummary?$top=10&$skip=0',
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
        module('customersApp');

        inject(function ($httpBackend) {
            httpBackend = $httpBackend;
        });

        //Way to inject dependency into a factory/service
        //module('customersApp', function ($provide) {
        //    //Create the mock
        //    mockSvc = {
        //        doSomething: function () { }
        //    };
        //    spyOn(mockSvc, 'doSomething');
        //    $provide.value('childSvc', mockSvc);
        //});

        ////now we inject the service we're testing.
        //inject(function (yourFactoryOrService) {
        //    service = yourFactoryOrService;
        //    //Down in test you can check if mockSvc worked: expect(mockSvc.doSomething).toHaveBeenCalledWith('The Value');
        //});
    });

    //Ensure no expectations were missed (expectGET or expectPOST)
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('customersService should return custom object', function () {
        inject(function (customersService) {
            var response = {
                totalRecords: 1,
                results: custs
            }
            //Header normally sent from server and contains the totalRecords
            httpBackend.when('GET', serviceUrl).respond(custs, { 'X-InlineCount': '1' });

            var test = {
                handler: function () { }
            };

            //Monitor the handler function
            spyOn(test, 'handler');

            customersService.getCustomersSummary(0, 10).then(test.handler);
            httpBackend.flush();

            //Ensure handler function received proper response data
            expect(test.handler).toHaveBeenCalledWith(response);
        });
    });

    it('customersService should return custom object with totalRecords equal to 1', function () {
        inject(function (customersService) {
            //Header normally sent from server and contains the totalRecords
            httpBackend.when('GET', serviceUrl).respond(custs, { 'X-InlineCount': '1' }); 
            customersService.getCustomersSummary(0, 10).then(function (result) {
                expect(result.totalRecords).toEqual(1);
            });
            httpBackend.flush();
        });
    });

});