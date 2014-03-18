(function () {

    var dataService = function (config, customersService, customersBreezeService) {
        return (config.useBreeze) ? customersBreezeService : customersService;
    };

    dataService.$inject = ['config', 'customersService', 'customersBreezeService'];

    angular.module('customersApp').factory('dataService', dataService);

}());

