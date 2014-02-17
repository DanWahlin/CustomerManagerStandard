describe('modalService', function () {

    var _modalService, _modal, modalOptions, modalResult;

    beforeEach(module('customersApp'));
    beforeEach(module('ui.bootstrap'));

    beforeEach(inject(function (modalService, $modal) {
        modalResult = { result: "some result" };
        _modalService = modalService;

        _modal = $modal;
        spyOn($modal, "open").andReturn(modalResult);

        modalOptions = {
            actionButtonText: 'Proceed',
            headerText: 'Are you sure?',
            bodyText: 'Changes will be lost..'
        };
    }));

    describe('showModal specs', function () {
        beforeEach(function () {
            spyOn(_modalService, "show").andCallThrough();
        });

        it('should call the show function', function () {
            _modalService.showModal({}, {});

            expect(_modalService.show).toHaveBeenCalled();
        });

        it('should assign some value to modalDefaults undefined is passed', function () {
            _modalService.showModal(undefined, {});

            expect(_modalService.show).not.toHaveBeenCalledWith(undefined, {});
        });

        it('should modify value of backdrop to static', function () {
            _modalService.showModal({ backdrop: 'something' }, {});

            expect(_modalService.show).not.toHaveBeenCalledWith({ backdrop: 'something' }, {});
            expect(_modalService.show).toHaveBeenCalledWith({ backdrop: 'static' }, {});
        });
    });

    describe('show specs', function () {
        var modalDefaults, modalOptions;

        beforeEach(function () {

        });

        it('Calls modal.open', function () {
            _modalService.show(modalDefaults, modalOptions);

            expect(_modal.open).toHaveBeenCalled();
        });

        it('sets missing properties to modal defaults', function () {
            modalDefaults = {};
            _modalService.show(modalDefaults, {});

            expect(_modal.open).not.toHaveBeenCalledWith({});
        });

        it('sets controller to modalDefault if not already defined', function () {
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'modal.html'
            };
            _modalService.show(modalDefaults, {});

            expect(_modal.open).not.toHaveBeenCalledWith(modalDefaults);
        });

        it('shouldn\'t override controller if already set', function () {
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'modal.html',
                controller: 'SomeCtrl'
            };
            _modalService.show(modalDefaults, {});

            expect(_modal.open).toHaveBeenCalledWith(modalDefaults);
        });

        it('should return result of the modal', function () {
            var result = _modalService.show({}, {});
            expect(result).toBe(modalResult.result);
        });
    });
});
