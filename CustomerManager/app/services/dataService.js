(function () {

    var dataService = function (config, customersService, customersBreezeService) {
        return (config.useBreeze) ? customersBreezeService : customersService;
    };

    angular.module('customersApp').factory('dataService',
        ['config', 'customersService', 'customersBreezeService', dataService]);

}());

