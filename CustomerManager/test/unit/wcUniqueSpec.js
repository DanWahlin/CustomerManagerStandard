describe('wcUnique directive specs', function () {
    var scope, modelCtrl, modelValue, customerSvcMock, form, element, input;

    function setEmailId(value) {
        scope.customer.email = value;
        scope.$digest();
    }
    beforeEach(module('customersApp'));
    beforeEach(function () {
        

        inject(function ($compile, $rootScope, $q, customersService) {
            scope = $rootScope.$new();
            input = angular.element('<input type="text" name="email" data-ng-model="customer.email" data-wc-unique="{key: customer.id, property: \'email\'}" />');
            element = angular.element('<form name="editForm"></form>');
            element.append(input);
            scope.customer = {};
            $compile(element)(scope);
            scope.$digest();

            modelCtrl = scope.editForm.email;
            form = scope.editForm;

            customerSvcMock = customersService;
            spyOn(customerSvcMock, "checkUniqueValue").andCallFake(function (id, property, value) {
                if (value === "someone@gmail.com") {
                    return $q.when(false);
                }
                else {
                    return $q.reject(false);
                }
            });
        });
    });

    it('Should be valid initially', function () {
        expect(form.email.$valid).toBe(true);
    });

    it('Should call checkUniqueValue when value is entered in the input field', function () {
        setEmailId("abc@def.com");
        input[0].focus();
        input[0].blur();
        expect(customerSvcMock.checkUniqueValue).toHaveBeenCalled();
        expect(form.email.$valid).toBe(false);
    });
});