module.exports = function (config) {
    config.set({
        basePath: '../',
        port: 9876,
        frameworks: ['jasmine'],
        files: [
            //Library scripts
            'test/lib/angular.js',  //Ensure Angular is loaded first
            'test/lib/*.js',
            'Scripts/**/*.js',

            //App and test scripts
            'test/helpers/*.js',
            'app/app.js',           //Ensure main startup script is loaded first
            'app/**/*.js',
            'test/unit/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        reporters: ['progress']
    });
};
