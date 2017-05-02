const gulp = require('gulp');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const clean = require('gulp-clean');
const path = require('path');
const http = require('http');
const st = require('st');
const livereload = require('gulp-refresh');

gulp.task('clean', function () {
    return gulp.src('dist/', { read: false })
        .pipe(clean());
});

gulp.task('build', ['clean'], function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));

    gulp.src('assets/**')
        .pipe(gulp.dest('dist/assets'));

    return gulp.src('src/main.js')
        .pipe(gulpWebpack({
            entry: {
                wizard: path.join(__dirname, 'src/main.js')
            },
            output: {
                path: path.join(__dirname, 'dist'),
                filename: 'wizard.js'
            },
            resolve: {
                extensions: ['.js'],
                modules: [path.join(__dirname, 'src'), 'node_modules']
            },
            module: {
                rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: [['es2015', { modules: false }]]
                    }
                }]
            }
        }, webpack))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('http', function (done) {
    http.createServer(
        st({ path: __dirname + '/dist', index: 'index.html', cache: false })
    ).listen(8080, done);
});

gulp.task('server', ['default', 'http'], function () {
    livereload.listen({ basePath: 'dist' });
    gulp.watch('src/**', ['default']);
});

gulp.task('default', ['build']);
