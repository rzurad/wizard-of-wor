module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            tree: {
                command: "tree -I 'node_modules*|docs*|tmp*|dist*|bower_components*'"
            },

            build: {
                command: [
                    'rm -rf dist',
                    './node_modules/.bin/broccoli build dist',
                    './node_modules/.bin/grunt docco'
                ].join(' && ')
            },

            serve: {
                command: './node_modules/.bin/broccoli serve'
            },

            test: {
                command: 'npm test'
            }
        },

        docco: {
            debug: {
                src: ['src/**/*.js'],
                options: {
                    output: 'dist/docs/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-docco');

    grunt.registerTask('build', ['shell:build']);
    grunt.registerTask('tree', ['shell:tree']);
    grunt.registerTask('serve', ['shell:serve']);
    grunt.registerTask('test', ['shell:test']);
};
