module.exports = function (grunt) {

    //grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        //shell: {
        //    install: {
        //        command: 'node ./node_modules/bower/bin/bower install'
        //    },
        //    font_awesome_fonts: {
        //        command: 'cp -R components/components-font-awesome/font app/font'
        //    }
        //},

        connect: {
            options: {
                port: 8000,
                base: './app'
            },
            server: {
                options: {
                    keepalive: true
                }
            },
            testserver: {}
        },

        karma: {
            unit: {
                configFile: './test/karma.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },

        watch: {
            scripts: {
                files: ['app/**/*.js', 'Content/**/*.css'],
                tasks: ['concat'],
                options: {
                    nospawn: true
                },
            },
        },

        concat: {
            styles: {
                dest: './Content/prod/app.css',
                src: [
                  'Content/animations.css',
                  'Content/styles.css',
                  'Content/bootstrap.css',
                  'Content/bootstrap-responsive.min.css'
                ]
            },
            scripts: {
                options: {
                    separator: ';'
                },
                dest: './app/prod/app.js',
                src: [
                  'app/animations/**/*.js',
                  'app/services/**/*.js',
                  'app/directives/**/*.js',
                  'app/controllers/**/*.js',
                  'app/filters/**/*.js',
                  'app/scripts/app.js'
                ]
            },
        }
    });

    grunt.registerTask('test', ['karma:unit']);

    //installation-related
    //grunt.registerTask('install', ['shell:install', 'shell:font_awesome_fonts']);

    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', ['concat', 'watch']);
    grunt.registerTask('server', ['connect:server']);
};