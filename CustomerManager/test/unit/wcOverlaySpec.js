describe('wcOverlay directive specs', function () {
    var scope, compile, element, compiledOverlay;

    beforeEach(module('wc.directives'));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope;
        compile = $compile;

        element = angular.element("<div data-wc-overlay=\"\" data-wc-overlay-delay=\"delayTime\"><br />Loading...</div>");

        scope.delayTime = 100;

        compiledOverlay = compile(element)(scope);
    }));

    it('Should have appended the directive template', function () {
        expect(compiledOverlay.find('div').hasClass('overlayContainer')).toBe(true);
    });

});