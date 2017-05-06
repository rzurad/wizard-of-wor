var compileES6 = require('broccoli-babel-transpiler'),
    concat = require('broccoli-concat'),
    MergeTrees = require('broccoli-merge-trees'),
    Funnel = require('broccoli-funnel'),
    compileLess = require('broccoli-less-single'),
    WatchedDir = require('broccoli-source').WatchedDir,
    UnwatchedDir = require('broccoli-source').UnwatchedDir,

    sourceTree = 'src',
    js, jsVendor, index, assets;

jsVendor = new MergeTrees([
    new UnwatchedDir('bower_components'),
    new UnwatchedDir('lib')
]);

jsVendor = concat(jsVendor, {
    inputFiles: [
        // bower
        'seedrandom/seedrandom.js',
        'jquery/dist/jquery.js',
        'rsvp/rsvp.js',
        'javascript-state-machine/state-machine.js',
        'pixi.js/bin/pixi.js',
        'stats.js/build/stats.min.js',

        // vendor

        // glue
        'requirejs/require.js'
    ],
    outputFile: '/assets/vendor.js',
});

js = compileES6(new WatchedDir(sourceTree), {
    browserPolyfill: true,
    plugins: ['babel-plugin-transform-es2015-modules-amd'],
    presets: ['babel-preset-stage-0'],
    moduleIds: true
});

js = concat(js, {
    outputFile: '/assets/wizard.js',
    inputFiles: ['**/*.js']
});

css = compileLess([sourceTree], 'game/ui/less/base.less', '/assets/wizard.css');

index = new Funnel(sourceTree + '/game', {
    srcDir: '',
    files: ['index.html', 'player-options.json'],
    destDir: ''
});

assets = new Funnel('.', {
    srcDir: 'assets',
    destDir: '/assets'
});

module.exports = new MergeTrees([index, css, jsVendor, js, assets]);
