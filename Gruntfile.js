module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            tree: {
                command: "tree -I 'node_modules*|tmp*|dist*|bower_components*'"
            },

            build: {
                command: [
                    'rm -rf dist',
                    'broccoli build dist',
                    'grunt docco',
                    'tree dist'
                ].join('&&')
            }
        },

        docco: {
            debug: {
                src: ['app/js/**/*.js'],
                options: {
                    output: 'docs/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-docco');
    grunt.registerTask('build', ['shell:build']);
    grunt.registerTask('tree', ['shell:tree']);
};
