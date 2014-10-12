module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        docco: {
            debug: {
                src: ['app/js/**/*.js'],
                options: {
                    output: 'docs/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-docco');
};
