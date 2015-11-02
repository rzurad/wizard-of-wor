'use strict';

// load the bower dependencies into mocha the same way the are when
// built for the browser.
require('../bower_components/seedrandom/seedrandom.js');
global.StateMachine = require('../bower_components/javascript-state-machine/state-machine.js');

require('babel/register')({ stage: 0 });
