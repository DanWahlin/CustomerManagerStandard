describe('wcUnique directive specs', function () {
    var scope, modelCtrl, modelValue, customerSvcMock, form,
        element, input, compiledForm, changeInputValueTo, passPromise;

    function setEmailId(value) {
        scope.customer.email = value;
        scope.$digest();
    }

    beforeEach(function () {
        module('customersApp')
    });

    beforeEach(function () {
        inject(function ($compile, $rootScope, $q, customersService) {
            scope = $rootScope.$new();
            input = angular.element('<input type="text" name="email" class="form-control" data-ng-model="customer.email" ' +
                                    'data-ng-model-options="{ updateOn: \'blur\' }" ' +
                                    'data-wc-unique  data-wc-unique-key="{{customer.id}}"  data-wc-unique-property="email"  ' +
                                    'data-ng-minlength="3" required />');
            element = angular.element('<form name="editForm"></form>');
            element.append(input);

            scope.customer = {};
            compiledForm = $compile(element)(scope);
            scope.$digest();

            modelCtrl = scope.editForm.email;
            form = scope.editForm;

            passPromise = true;

            customerSvcMock = customersService;
            spyOn(customerSvcMock, "checkUniqueValue").andCallFake(function (id, property, value) {
                if (passPromise) {
                    if (value === "someone@gmail.com") {
                        return $q.when(true);
                    }
                    else {
                        return $q.when(false);
                    }
                }
                else {
                    return $q.reject();
                }
            });

            changeInputValueTo = function (el, value) {
                el.val(value);
                el.triggerHandler('blur');
                $rootScope.$digest();
            };
        });
    });

    it('Should be invalid initially due to minlength', function () {
        expect(form.email.$valid).toBe(false);
    });

    it('Should call checkUniqueValue when value is entered in the input field', function () {
        scope.$evalAsync(function () {
            changeInputValueTo(compiledForm.find('input'), "abc@def.com");

            expect(customerSvcMock.checkUniqueValue).toHaveBeenCalled();
        });
    });

    it('Unique validator should be invalid if the email ID is abc@def.com', function () {
        scope.$evalAsync(function () {
            changeInputValueTo(compiledForm.find('input'), "abc@def.com");

            expect(form.email.$valid).toBe(false);
            expect(form.email.$error.unique).toBe(true);
        });
    });

    it('Unique validator should be valid if the email ID is someone@gmail.com', function () {
        scope.$evalAsync(function () {
            changeInputValueTo(compiledForm.find('input'), "someone@gmail.com");

            expect(form.email.$error.unique).toBe(false);
        });
    });

    it('Unique validator should be valid if the server fails to respond', function () {
        scope.$evalAsync(function () {
            passPromise = false;
            changeInputValueTo(compiledForm.find('input'), "someone@gmail.com");

            expect(form.email.$error.unique).toBe(false);
        });
    });
});
