var compileES6 = require('broccoli-babel-transpiler'),
    concat = require('broccoli-concat'),
    mergeTrees = require('broccoli-merge-trees'),
    pickFiles = require('broccoli-static-compiler'),
    compileLess = require('broccoli-less-single'),
    unwatchedTree = require('broccoli-unwatched-tree'),

    sourceTree = 'src',
    js, jsVendor, index, assets;

jsVendor = mergeTrees([
    unwatchedTree('bower_components'),
    unwatchedTree('lib')
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

js = compileES6(sourceTree, {
    browserPolyfill: true,
    stage: 0,
    moduleIds: true,
    modules: 'amd'
});

js = concat(js, {
    outputFile: '/assets/wizard.js',
    inputFiles: ['**/*.js']
});

css = compileLess([sourceTree], 'game/ui/less/base.less', '/assets/wizard.css');

index = pickFiles(sourceTree + '/game', {
    srcDir: '',
    files: ['index.html', 'player-options.json'],
    destDir: ''
});

assets = pickFiles('.', {
    srcDir: 'assets',
    destDir: '/assets'
});

module.exports = mergeTrees([index, css, jsVendor, js, assets]);
