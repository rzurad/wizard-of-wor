var mergeTrees = require('broccoli-merge-trees'),
    compileES6 = require('broccoli-es6-concatenator'),

    sourceTrees,
    wizardJS = compileES6(sourceTrees, {
        loaderFile: 'loader.js',
        inputFiles: [
            'app/*.js',
            'app/**/*.js'
        ],
        wrapInEval: true,
        outputFile: '/assets/wizard.js'
    });

module.exports = mergeTrees([wizardJS, 'app']);
