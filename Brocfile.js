var compileES6 = require('broccoli-es6-concatenator'),
    mergeTrees = require('broccoli-merge-trees'),
    pickFiles = require('broccoli-static-compiler'),
    compileLess = require('broccoli-less-single'),

    sourceTree = 'app',
    js, index, assets;

js = compileES6(sourceTree + '/js', {
    loaderFile: '../../bower_components/loader/loader.js',
    inputFiles: [
        '*.js'
    ],
    legacyFilesToAppend: [
        '../../bower_components/jquery/dist/jquery.js',
        '../../bower_components/rsvp/rsvp.js',
        '../../node_modules/ember-metal-node/index.js',
        '../../node_modules/ember-runtime-node/index.js',
        '../../node_modules/ember-states-node/index.js',
        '../../bower_components/threejs/build/three.js',
        '../../vendor/Detector.js',
        '../../vendor/Stats.js',
        '../../vendor/OrbitControls.js',
        '../../vendor/THREEx.FullScreen.js',
        '../../vendor/THREEx.WindowResize.js'
    ],
    wrapInEval: false,
    outputFile: '/wizard.js'
});

css = compileLess([sourceTree], 'styles/base.less', 'wizard.css');

index = pickFiles(sourceTree, {
    srcDir: '',
    files: ['index.html'],
    destDir: ''
});

assets = pickFiles(sourceTree, {
    srcDir: 'assets',
    destDir: 'assets'
});

module.exports = mergeTrees([index, css, js, assets]);
