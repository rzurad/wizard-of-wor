var compileES6 = require('broccoli-es6-concatenator'),
    mergeTrees = require('broccoli-merge-trees'),
    pickFiles = require('broccoli-static-compiler'),
    sourceTree = 'app',
    js, index, assets;

js = compileES6(sourceTree, {
    loaderFile: '../bower_components/loader/loader.js',
    inputFiles: [
        '*.js'
    ],
    legacyFilesToAppend: [
        '../bower_components/threejs/build/three.js'
    ],
    wrapInEval: false,
    outputFile: '/wizard.js'
});

index = pickFiles(sourceTree, {
    srcDir: '',
    files: ['index.html'],
    destDir: ''
});

assets = pickFiles(sourceTree, {
    srcDir: 'assets',
    destDir: 'assets'
});

module.exports = mergeTrees([index, js, assets]);
