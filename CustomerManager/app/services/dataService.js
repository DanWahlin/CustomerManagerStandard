(function () {

    var dataService = function (config, customersService, customersBreezeService) {
        return (config.useBreeze) ? customersBreezeService : customersService;
    };

    customersManager.customersApp.factory('dataService',
        ['config', 'customersService', 'customersBreezeService', dataService]);

}());

