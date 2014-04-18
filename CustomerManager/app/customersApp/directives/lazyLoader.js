//<input type="text" data-lazy-load="" title="Hello world" />
(function () {
	// use this directive to delay assigning user input to the underlying 
	// view model field until focus leaves the dom element. Useful for 
	// delaying breeze validation until user enters all data (like when 
	// entering dates)
    var lazyLoad = function () {
        return {
            restrict: 'A', //E = element, A = attribute, C = class, M = comment         
            transclude: true,
            scope: {
                name: '@'
            },
            link: function (scope, element, attrs) {
                element.bind('blur', function (e) {
                    scope.$parent.$apply(function () {
                        scope.$parent[scope.name] = element.val();
                    });
                });
            }
        };
    };

    angular.module('customersApp').directive('lazyLoad', lazyLoad);

}());