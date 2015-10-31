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
                    'broccoli build dist',
                    'grunt docco',
                    'ls -la dist'
                ].join('&&')
            },

            serve: {
                command: 'broccoli serve'
            }
        },

        docco: {
            debug: {
                src: ['app/js/**/*.js'],
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
};
