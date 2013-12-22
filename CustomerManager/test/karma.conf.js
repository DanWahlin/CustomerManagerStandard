module.exports = function (config) {
    config.set({
        basePath: '../',
        port: 9876,
        frameworks: ['jasmine'],
        files: [
            'Scripts/angular.js',
            'Scripts/angular-*.js',
            'Scripts/q.min.js',
            'Scripts/jquery.min.js',
            'Scripts/breeze.min.js',
            'Scripts/to$q.js',
            'test/lib/*.js',
            'test/helpers/*.js',

            //App and test scripts
            'app/**/*.js',
            'test/**/*Spec.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        reporters: ['progress']
    })
};
