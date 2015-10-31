var compileES6 = require('broccoli-babel-transpiler'),
    concat = require('broccoli-concat'),
    mergeTrees = require('broccoli-merge-trees'),
    pickFiles = require('broccoli-static-compiler'),
    compileLess = require('broccoli-less-single'),
    unwatchedTree = require('broccoli-unwatched-tree'),

    sourceTree = 'app',
    js, jsVendor, index, assets;

jsVendor = mergeTrees([
    unwatchedTree('bower_components'),
    unwatchedTree('vendor')
]);

jsVendor = concat(jsVendor, {
    inputFiles: [
        // bower
        'seedrandom/seedrandom.js',
        'jquery/dist/jquery.js',
        'rsvp/rsvp.js',
        'javascript-state-machine/state-machine.js',
        'three.js/build/three.js',
        'stats.js/build/stats.min.js',

        // vendor
        'OrbitControls.js',
        'THREEx.FullScreen.js',
        'THREEx.WindowResize.js',

        // glue
        'requirejs/require.js'
    ],
    outputFile: '/assets/vendor.js',
});

js = compileES6(sourceTree + '/js', {
    browserPolyfill: true,
    stage: 0,
    moduleIds: true,
    modules: 'amd'
});

js = concat(js, {
    outputFile: '/assets/wizard.js',
    inputFiles: ['**/*.js']
});

css = compileLess([sourceTree], 'styles/base.less', 'assets/wizard.css');

index = pickFiles(sourceTree, {
    srcDir: '',
    files: ['index.html'],
    destDir: ''
});

assets = pickFiles(sourceTree, {
    srcDir: 'assets',
    destDir: 'assets'
});

module.exports = mergeTrees([index, css, jsVendor, js, assets]);
