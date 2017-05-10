/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManager = function () {
    function EventManager() {
        _classCallCheck(this, EventManager);

        this._listeners = {};
    }

    _createClass(EventManager, [{
        key: 'on',
        value: function on(eventName, callback) {
            (this._listeners[eventName] = this._listeners[eventName] || []).push(callback);
        }
    }, {
        key: 'off',
        value: function off(eventName, callback) {
            if (arguments.length === 1) {
                this._listeners[eventName] = [];
            } else if (typeof callback === 'function') {
                var index = this._listeners[eventName].indexOf(callback);

                for (var i = 0; i < this._listeners.length && index === -1; i++) {
                    if (this._listeners[i] === callback) {
                        index = i;
                    }
                }

                if (index !== -1) {
                    this._listeners.splice(index, 1);
                }
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(eventName, data) {
            var listeners = this._listeners[eventName];

            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    var evt = new EventArg(eventName, data);

                    listeners[i].call(null, evt);

                    if (evt.removed) {
                        listeners.splice(i, 1);
                        --i;
                    }

                    if (evt.cancelled) {
                        break;
                    }
                }
            }
        }
    }]);

    return EventManager;
}();

/* harmony default export */ __webpack_exports__["a"] = (EventManager);

var EventArg = function () {
    function EventArg(name, data) {
        _classCallCheck(this, EventArg);

        this.name = name;
        this.data = data;
        this.cancelled = false;
        this.removed = false;
    }

    _createClass(EventArg, [{
        key: 'cancel',
        value: function cancel() {
            this.cancelled = true;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.removed = true;
        }
    }]);

    return EventArg;
}();

var globalEventManager = new EventManager();

EventManager.global = function () {
    return globalEventManager;
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DIRECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CELL_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DUNGEONS; });
var DIRECTIONS = Object.freeze({ UP: 8, DOWN: 4, LEFT: 2, RIGHT: 1 });
var CELL_SIZE = 36;

var DUNGEONS = {
    WORRIOR: [[5, 3, 3, 7, 7, 3, 13, 3, 7, 10, 13, 3, 11, 7, 14, 5, 11, 7, 5, 10, 13, 14, 5, 15, 12, 5, 10, 13, 14, 12, 9, 11, 3, 10, 9, 11], [5, 6, 5, 3, 7, 3, 12, 13, 15, 3, 15, 3, 11, 14, 13, 6, 9, 7, 5, 14, 9, 14, 5, 11, 12, 13, 7, 15, 11, 7, 9, 11, 10, 9, 3, 11], [5, 3, 3, 6, 5, 7, 12, 5, 3, 11, 14, 12, 11, 14, 5, 7, 11, 15, 5, 14, 12, 13, 3, 11, 12, 13, 15, 15, 3, 7, 9, 11, 10, 9, 3, 11], [5, 6, 5, 3, 7, 3, 12, 13, 10, 5, 15, 3, 11, 15, 7, 14, 13, 3, 5, 14, 12, 12, 13, 7, 12, 12, 13, 15, 10, 12, 9, 11, 10, 9, 3, 11], [5, 3, 6, 5, 3, 7, 13, 3, 15, 15, 7, 15, 11, 7, 10, 12, 12, 12, 5, 10, 5, 14, 13, 15, 13, 3, 10, 13, 14, 12, 9, 3, 3, 10, 9, 11], [5, 7, 7, 7, 7, 7, 12, 12, 12, 12, 12, 12, 11, 15, 14, 9, 14, 12, 5, 14, 9, 7, 15, 15, 12, 13, 6, 13, 10, 12, 9, 10, 9, 11, 3, 11], [5, 3, 7, 7, 3, 7, 12, 5, 11, 14, 5, 11, 11, 14, 5, 15, 15, 3, 5, 11, 14, 12, 9, 7, 13, 3, 14, 13, 7, 11, 9, 3, 11, 10, 9, 3], [5, 6, 5, 3, 7, 3, 12, 9, 14, 5, 11, 7, 11, 3, 14, 9, 6, 12, 5, 7, 11, 3, 14, 12, 12, 13, 7, 7, 15, 11, 9, 10, 9, 10, 9, 3], [5, 3, 6, 5, 3, 7, 12, 5, 15, 11, 3, 15, 15, 10, 13, 3, 6, 12, 13, 3, 14, 5, 11, 15, 12, 5, 11, 15, 6, 12, 9, 11, 3, 10, 9, 11], [5, 3, 6, 5, 3, 7, 12, 5, 11, 15, 3, 15, 11, 14, 5, 15, 6, 12, 5, 11, 14, 12, 12, 12, 13, 3, 15, 10, 13, 15, 9, 3, 11, 3, 10, 8], [5, 3, 6, 5, 7, 3, 13, 3, 14, 12, 9, 7, 11, 6, 13, 15, 7, 11, 5, 11, 10, 12, 13, 3, 13, 3, 7, 15, 15, 3, 9, 3, 11, 10, 9, 3], [5, 3, 6, 5, 3, 7, 13, 3, 11, 14, 5, 11, 11, 7, 7, 15, 15, 7, 5, 10, 12, 12, 12, 12, 13, 3, 15, 14, 9, 15, 9, 3, 10, 9, 3, 11], [5, 3, 6, 5, 3, 7, 13, 3, 11, 15, 6, 12, 11, 7, 3, 14, 13, 15, 5, 11, 6, 13, 10, 12, 13, 3, 14, 13, 7, 11, 9, 3, 11, 10, 9, 3]],

    WORLORD: [[5, 7, 3, 7, 7, 7, 13, 14, 5, 11, 10, 12, 15, 10, 12, 5, 7, 15, 13, 7, 11, 10, 13, 15, 13, 14, 5, 7, 15, 15, 9, 11, 11, 11, 11, 11], [5, 3, 7, 7, 3, 7, 13, 6, 9, 15, 7, 11, 15, 15, 7, 11, 15, 7, 13, 15, 15, 6, 9, 15, 13, 14, 13, 15, 6, 12, 9, 11, 11, 11, 11, 11], [5, 7, 7, 7, 3, 7, 13, 10, 9, 15, 6, 12, 15, 6, 5, 10, 9, 15, 12, 9, 15, 6, 5, 15, 13, 6, 13, 15, 15, 15, 9, 11, 11, 11, 11, 11], [5, 3, 7, 7, 7, 7, 13, 6, 9, 15, 10, 12, 15, 15, 7, 14, 5, 15, 13, 15, 10, 13, 11, 15, 13, 10, 5, 15, 6, 12, 9, 3, 11, 11, 11, 11], [5, 7, 7, 7, 7, 7, 12, 13, 14, 12, 13, 15, 14, 12, 13, 14, 12, 12, 13, 14, 12, 13, 14, 12, 13, 15, 14, 12, 13, 15, 9, 11, 11, 11, 11, 11], [5, 7, 7, 7, 7, 7, 12, 9, 15, 10, 13, 15, 15, 6, 13, 7, 14, 12, 13, 11, 14, 9, 14, 12, 12, 5, 15, 6, 13, 15, 9, 11, 11, 11, 11, 11], [5, 7, 7, 7, 3, 7, 13, 15, 15, 10, 5, 15, 15, 15, 10, 5, 15, 15, 13, 10, 5, 15, 10, 12, 13, 7, 15, 10, 5, 15, 9, 11, 11, 3, 11, 11], [5, 3, 7, 7, 7, 7, 13, 6, 9, 15, 10, 12, 15, 15, 6, 12, 5, 15, 13, 15, 10, 12, 9, 15, 13, 10, 5, 15, 6, 12, 9, 3, 11, 11, 11, 11], [5, 3, 7, 7, 7, 3, 13, 7, 11, 14, 13, 3, 14, 13, 7, 11, 15, 7, 12, 13, 11, 7, 15, 11, 13, 11, 7, 14, 13, 3, 9, 3, 11, 11, 11, 3]],

    ARENA: [5, 3, 7, 7, 3, 7, 13, 3, 10, 13, 7, 15, 15, 3, 7, 15, 15, 15, 13, 6, 9, 15, 11, 11, 12, 13, 7, 15, 7, 3, 9, 10, 9, 10, 9, 3],
    PIT: [5, 7, 7, 7, 7, 7, 13, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13, 15, 15, 15, 15, 15, 13, 15, 15, 15, 15, 15, 9, 11, 11, 11, 11, 11]
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_consts__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Cell = function () {
	function Cell(config, x, y) {
		_classCallCheck(this, Cell);

		this.config = config;
		this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('cell.config' + config + '.png'));
		this.sprite.x = x;
		this.sprite.y = y;
		this.sprite.pivot.set(__WEBPACK_IMPORTED_MODULE_0_consts__["c" /* CELL_SIZE */] / 2, __WEBPACK_IMPORTED_MODULE_0_consts__["c" /* CELL_SIZE */] / 2);
		this.index = -1;
	}

	_createClass(Cell, [{
		key: 'hasNeighbor',
		value: function hasNeighbor(direction) {
			return (this.config & direction) === direction;
		}
	}]);

	return Cell;
}();

/* harmony default export */ __webpack_exports__["a"] = (Cell);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Cell__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var PortalCell = function (_Cell) {
    _inherits(PortalCell, _Cell);

    function PortalCell(config, x, y, direction) {
        _classCallCheck(this, PortalCell);

        var _this = _possibleConstructorReturn(this, (PortalCell.__proto__ || Object.getPrototypeOf(PortalCell)).call(this, config, x, y));

        _this.direction = direction;
        _this.isOpen = false;
        return _this;
    }

    _createClass(PortalCell, [{
        key: 'open',
        value: function open() {
            this.isOpen = true;
        }
    }, {
        key: 'close',
        value: function close() {
            this.isOpen = false;
        }
    }]);

    return PortalCell;
}(__WEBPACK_IMPORTED_MODULE_0_Cell__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (PortalCell);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_EventManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_GoView__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_GetReadyView__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_DungeonView__ = __webpack_require__(8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var Application = function () {
    function Application(config) {
        _classCallCheck(this, Application);

        this.element = document.querySelector('#game-container');
        this.onRequestViewChange = this.onRequestViewChange.bind(this);

        __WEBPACK_IMPORTED_MODULE_0_EventManager__["a" /* default */].global().on('RequestViewChange', this.onRequestViewChange);
        __WEBPACK_IMPORTED_MODULE_0_EventManager__["a" /* default */].global().trigger('RequestViewChange', 'GetReady');
    }

    _createClass(Application, [{
        key: 'changeView',
        value: function changeView(view) {
            if (this.view) {
                this.view.destroy();
            }

            this.view = view;
            this.element.innerHTML = '';
            this.element.appendChild(view.element);
            this.view.onAttach();
        }
    }, {
        key: 'onRequestViewChange',
        value: function onRequestViewChange(event) {
            var View = void 0;

            switch (event.data) {
                case 'GetReady':
                    View = __WEBPACK_IMPORTED_MODULE_2_GetReadyView__["a" /* default */];break;
                case 'Go':
                    View = __WEBPACK_IMPORTED_MODULE_1_GoView__["a" /* default */];break;
                case 'Dungeon':
                    View = __WEBPACK_IMPORTED_MODULE_3_DungeonView__["a" /* default */];break;
                default:
                    throw new Error('unknown view: ' + name);
            }

            this.changeView(new View());
        }
    }, {
        key: 'onUpdateFrame',
        value: function onUpdateFrame() {
            this.view.onUpdateFrame();
        }
    }]);

    return Application;
}();

/* harmony default export */ __webpack_exports__["a"] = (Application);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sound = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return require(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filterable = (function () {
    function Filterable(input, output) {
        this._output = output;
        this._input = input;
    }
    Object.defineProperty(Filterable.prototype, "destination", {
        get: function () {
            return this._input;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filterable.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (filters) {
            var _this = this;
            if (this._filters) {
                this._filters.forEach(function (filter) {
                    if (filter) {
                        filter.disconnect();
                    }
                });
                this._filters = null;
                this._input.connect(this._output);
            }
            if (filters && filters.length) {
                this._filters = filters.slice(0);
                this._input.disconnect();
                var prevFilter_1 = null;
                filters.forEach(function (filter) {
                    if (prevFilter_1 === null) {
                        _this._input.connect(filter.destination);
                    }
                    else {
                        prevFilter_1.connect(filter.destination);
                    }
                    prevFilter_1 = filter;
                });
                prevFilter_1.connect(this._output);
            }
        },
        enumerable: true,
        configurable: true
    });
    Filterable.prototype.destroy = function () {
        this.filters = null;
        this._input = null;
        this._output = null;
    };
    return Filterable;
}());
exports.default = Filterable;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var AUDIO_EXTENSIONS = ["wav", "mp3", "ogg", "oga", "m4a"];
function middleware(resource, next) {
    if (resource.data && AUDIO_EXTENSIONS.indexOf(resource._getExtension()) > -1) {
        resource.sound = index_1.default.add(resource.name, {
            loaded: next,
            preload: true,
            srcBuffer: resource.data,
        });
    }
    else {
        next();
    }
}
function middlewareFactory() {
    return middleware;
}
function install() {
    var Resource = PIXI.loaders.Resource;
    AUDIO_EXTENSIONS.forEach(function (ext) {
        Resource.setExtensionXhrType(ext, Resource.XHR_RESPONSE_TYPE.BUFFER);
        Resource.setExtensionLoadType(ext, Resource.LOAD_TYPE.XHR);
    });
    PIXI.loaders.Loader.addPixiMiddleware(middlewareFactory);
    PIXI.loader.use(middleware);
}
exports.install = install;

},{"./index":17}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var SoundInstance_1 = require("./SoundInstance");
var SoundNodes_1 = require("./SoundNodes");
var SoundSprite_1 = require("./SoundSprite");
var Sound = (function () {
    function Sound(context, source) {
        var options = {};
        if (typeof source === "string") {
            options.src = source;
        }
        else if (source instanceof ArrayBuffer) {
            options.srcBuffer = source;
        }
        else {
            options = source;
        }
        options = Object.assign({
            autoPlay: false,
            singleInstance: false,
            src: null,
            srcBuffer: null,
            preload: false,
            volume: 1,
            speed: 1,
            complete: null,
            loaded: null,
            loop: false,
            useXHR: true,
        }, options);
        this._context = context;
        this._nodes = new SoundNodes_1.default(this._context);
        this._source = this._nodes.bufferSource;
        this._instances = [];
        this._sprites = {};
        var complete = options.complete;
        this._autoPlayOptions = complete ? { complete: complete } : null;
        this.isLoaded = false;
        this.isPlaying = false;
        this.autoPlay = options.autoPlay;
        this.singleInstance = options.singleInstance;
        this.preload = options.preload || this.autoPlay;
        this.src = options.src;
        this.srcBuffer = options.srcBuffer;
        this.useXHR = options.useXHR;
        this.volume = options.volume;
        this.loop = options.loop;
        this.speed = options.speed;
        if (options.sprites) {
            this.addSprites(options.sprites);
        }
        if (this.preload) {
            this._beginPreload(options.loaded);
        }
    }
    Sound.from = function (options) {
        return new Sound(index_1.default.context, options);
    };
    Sound.prototype.destroy = function () {
        this._nodes.destroy();
        this._nodes = null;
        this._context = null;
        this._source = null;
        this.removeSprites();
        this._sprites = null;
        this.srcBuffer = null;
        this._removeInstances();
        this._instances = null;
    };
    Object.defineProperty(Sound.prototype, "isPlayable", {
        get: function () {
            return this.isLoaded && !!this._source && !!this._source.buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (volume) {
            this._volume = this._nodes.gain.gain.value = volume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "loop", {
        get: function () {
            return this._source.loop;
        },
        set: function (loop) {
            this._source.loop = !!loop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "buffer", {
        get: function () {
            return this._source.buffer;
        },
        set: function (buffer) {
            this._source.buffer = buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "duration", {
        get: function () {
            console.assert(this.isPlayable, "Sound not yet playable, no duration");
            return this._source.buffer.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "filters", {
        get: function () {
            return this._nodes.filters;
        },
        set: function (filters) {
            this._nodes.filters = filters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "speed", {
        get: function () {
            return this._source.playbackRate.value;
        },
        set: function (value) {
            this._source.playbackRate.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "instances", {
        get: function () {
            return this._instances;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sound.prototype, "sprites", {
        get: function () {
            return this._sprites;
        },
        enumerable: true,
        configurable: true
    });
    Sound.prototype.addSprites = function (source, data) {
        if (typeof source === "object") {
            var results = {};
            for (var alias in source) {
                results[alias] = this.addSprites(alias, source[alias]);
            }
            return results;
        }
        else if (typeof source === "string") {
            console.assert(!this._sprites[source], "Alias " + source + " is already taken");
            var sprite = new SoundSprite_1.default(this, data);
            this._sprites[source] = sprite;
            return sprite;
        }
    };
    Sound.prototype.removeSprites = function (alias) {
        if (!alias) {
            for (var name_1 in this._sprites) {
                this.removeSprites(name_1);
            }
        }
        else {
            var sprite = this._sprites[alias];
            if (sprite !== undefined) {
                sprite.destroy();
                delete this._sprites[alias];
            }
        }
        return this;
    };
    Sound.prototype.play = function (source, complete) {
        var _this = this;
        var options;
        if (typeof source === "string") {
            var sprite = source;
            options = { sprite: sprite, complete: complete };
        }
        else if (typeof source === "function") {
            options = {};
            options.complete = source;
        }
        else {
            options = source;
        }
        options = Object.assign({
            complete: null,
            loaded: null,
            sprite: null,
            start: 0,
            fadeIn: 0,
            fadeOut: 0,
        }, options || {});
        if (options.sprite) {
            var alias = options.sprite;
            console.assert(!!this._sprites[alias], "Alias " + alias + " is not available");
            var sprite = this._sprites[alias];
            options.start = sprite.start;
            options.end = sprite.end;
            options.speed = sprite.speed;
            delete options.sprite;
        }
        if (options.offset) {
            options.start = options.offset;
        }
        if (!this.isLoaded) {
            return new Promise(function (resolve, reject) {
                _this.autoPlay = true;
                _this._autoPlayOptions = options;
                _this._beginPreload(function (err, sound, instance) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (options.loaded) {
                            options.loaded(err, sound, instance);
                        }
                        resolve(instance);
                    }
                });
            });
        }
        if (this.singleInstance) {
            this._removeInstances();
        }
        var instance = SoundInstance_1.default.create(this);
        this._instances.push(instance);
        this.isPlaying = true;
        instance.once("end", function () {
            if (options.complete) {
                options.complete(_this);
            }
            _this._onComplete(instance);
        });
        instance.once("stop", function () {
            _this._onComplete(instance);
        });
        instance.play(options.start, options.end, options.speed, options.loop, options.fadeIn, options.fadeOut);
        return instance;
    };
    Sound.prototype.stop = function () {
        if (!this.isPlayable) {
            this.autoPlay = false;
            this._autoPlayOptions = null;
            return this;
        }
        this.isPlaying = false;
        for (var i = this._instances.length - 1; i >= 0; i--) {
            this._instances[i].stop();
        }
        return this;
    };
    Sound.prototype.pause = function () {
        for (var i = this._instances.length - 1; i >= 0; i--) {
            this._instances[i].paused = true;
        }
        this.isPlaying = false;
        return this;
    };
    ;
    Sound.prototype.resume = function () {
        for (var i = this._instances.length - 1; i >= 0; i--) {
            this._instances[i].paused = false;
        }
        this.isPlaying = this._instances.length > 0;
        return this;
    };
    Sound.prototype._beginPreload = function (callback) {
        if (this.src) {
            this.useXHR ? this._loadUrl(callback) : this._loadPath(callback);
        }
        else if (this.srcBuffer) {
            this._decode(this.srcBuffer, callback);
        }
        else if (callback) {
            callback(new Error("sound.src or sound.srcBuffer must be set"));
        }
        else {
            console.error("sound.src or sound.srcBuffer must be set");
        }
    };
    Sound.prototype._onComplete = function (instance) {
        if (this._instances) {
            var index = this._instances.indexOf(instance);
            if (index > -1) {
                this._instances.splice(index, 1);
            }
            this.isPlaying = this._instances.length > 0;
        }
        instance.destroy();
    };
    Sound.prototype._removeInstances = function () {
        for (var i = this._instances.length - 1; i >= 0; i--) {
            this._instances[i].destroy();
        }
        this._instances.length = 0;
    };
    Sound.prototype._loadUrl = function (callback) {
        var _this = this;
        var request = new XMLHttpRequest();
        var src = this.src;
        request.open("GET", src, true);
        request.responseType = "arraybuffer";
        request.onload = function () {
            _this.srcBuffer = request.response;
            _this._decode(request.response, callback);
        };
        request.send();
    };
    Sound.prototype._loadPath = function (callback) {
        var _this = this;
        var fs = require("fs");
        var src = this.src;
        fs.readFile(src, function (err, data) {
            if (err) {
                console.error(err);
                if (callback) {
                    callback(new Error("File not found " + _this.src));
                }
                return;
            }
            var arrayBuffer = new ArrayBuffer(data.length);
            var view = new Uint8Array(arrayBuffer);
            for (var i = 0; i < data.length; ++i) {
                view[i] = data[i];
            }
            _this.srcBuffer = arrayBuffer;
            _this._decode(arrayBuffer, callback);
        });
    };
    Sound.prototype._decode = function (arrayBuffer, callback) {
        var _this = this;
        this._context.decode(arrayBuffer, function (err, buffer) {
            if (err) {
                if (callback) {
                    callback(err);
                }
            }
            else {
                _this.isLoaded = true;
                _this.buffer = buffer;
                var instance = void 0;
                if (_this.autoPlay) {
                    instance = _this.play(_this._autoPlayOptions);
                }
                if (callback) {
                    callback(null, _this, instance);
                }
            }
        });
    };
    return Sound;
}());
exports.default = Sound;

},{"./SoundInstance":5,"./SoundNodes":7,"./SoundSprite":8,"./index":17,"fs":undefined}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Filterable_1 = require("./Filterable");
var SoundContext = (function (_super) {
    __extends(SoundContext, _super);
    function SoundContext() {
        var _this = this;
        var ctx = new SoundContext.AudioContext();
        var gain = ctx.createGain();
        var compressor = ctx.createDynamicsCompressor();
        var analyser = ctx.createAnalyser();
        analyser.connect(gain);
        gain.connect(compressor);
        compressor.connect(ctx.destination);
        _this = _super.call(this, analyser, gain) || this;
        _this._ctx = ctx;
        _this._offlineCtx = new SoundContext.OfflineAudioContext(1, 2, ctx.sampleRate);
        _this._unlocked = false;
        _this.gain = gain;
        _this.compressor = compressor;
        _this.analyser = analyser;
        _this.volume = 1;
        _this.muted = false;
        _this.paused = false;
        if ("ontouchstart" in window && ctx.state !== "running") {
            _this._unlock();
            _this._unlock = _this._unlock.bind(_this);
            document.addEventListener("mousedown", _this._unlock, true);
            document.addEventListener("touchstart", _this._unlock, true);
            document.addEventListener("touchend", _this._unlock, true);
        }
        return _this;
    }
    SoundContext.prototype._unlock = function () {
        if (this._unlocked) {
            return;
        }
        this.playEmptySound();
        if (this._ctx.state === "running") {
            document.removeEventListener("mousedown", this._unlock, true);
            document.removeEventListener("touchend", this._unlock, true);
            document.removeEventListener("touchstart", this._unlock, true);
            this._unlocked = true;
        }
    };
    SoundContext.prototype.playEmptySound = function () {
        var source = this._ctx.createBufferSource();
        source.buffer = this._ctx.createBuffer(1, 1, 22050);
        source.connect(this._ctx.destination);
        source.start(0, 0, 0);
    };
    Object.defineProperty(SoundContext, "AudioContext", {
        get: function () {
            var win = window;
            return (win.AudioContext ||
                win.webkitAudioContext ||
                null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundContext, "OfflineAudioContext", {
        get: function () {
            var win = window;
            return (win.OfflineAudioContext ||
                win.webkitOfflineAudioContext ||
                null);
        },
        enumerable: true,
        configurable: true
    });
    SoundContext.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        var ctx = this._ctx;
        if (typeof ctx.close !== "undefined") {
            ctx.close();
        }
        this.analyser.disconnect();
        this.gain.disconnect();
        this.compressor.disconnect();
        this.gain = null;
        this.analyser = null;
        this.compressor = null;
        this._offlineCtx = null;
        this._ctx = null;
    };
    Object.defineProperty(SoundContext.prototype, "audioContext", {
        get: function () {
            return this._ctx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundContext.prototype, "offlineContext", {
        get: function () {
            return this._offlineCtx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundContext.prototype, "muted", {
        get: function () {
            return this._muted;
        },
        set: function (muted) {
            this._muted = !!muted;
            this.gain.gain.value = this._muted ? 0 : this._volume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundContext.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (volume) {
            this._volume = volume;
            if (!this._muted) {
                this.gain.gain.value = this._volume;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundContext.prototype, "paused", {
        get: function () {
            return this._paused;
        },
        set: function (paused) {
            if (paused && this._ctx.state === "running") {
                this._ctx.suspend();
            }
            else if (!paused && this._ctx.state === "suspended") {
                this._ctx.resume();
            }
            this._paused = paused;
        },
        enumerable: true,
        configurable: true
    });
    SoundContext.prototype.toggleMute = function () {
        this.muted = !this.muted;
        return this._muted;
    };
    SoundContext.prototype.decode = function (arrayBuffer, callback) {
        this._offlineCtx.decodeAudioData(arrayBuffer, function (buffer) {
            callback(null, buffer);
        }, function () {
            callback(new Error("Unable to decode file"));
        });
    };
    return SoundContext;
}(Filterable_1.default));
exports.default = SoundContext;

},{"./Filterable":1}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var id = 0;
var SoundInstance = (function (_super) {
    __extends(SoundInstance, _super);
    function SoundInstance(parent) {
        var _this = _super.call(this) || this;
        _this.id = id++;
        _this._parent = null;
        _this._paused = false;
        _this._elapsed = 0;
        _this._init(parent);
        return _this;
    }
    SoundInstance.create = function (parent) {
        if (SoundInstance._pool.length > 0) {
            var sound = SoundInstance._pool.pop();
            sound._init(parent);
            return sound;
        }
        else {
            return new SoundInstance(parent);
        }
    };
    SoundInstance.prototype.stop = function () {
        if (this._source) {
            this._internalStop();
            this.emit("stop");
        }
    };
    SoundInstance.prototype.play = function (start, end, speed, loop, fadeIn, fadeOut) {
        if (end) {
            console.assert(end > start, "End time is before start time");
        }
        this._paused = false;
        this._source = this._parent.nodes.cloneBufferSource();
        if (speed !== undefined) {
            this._source.playbackRate.value = speed;
        }
        this._speed = this._source.playbackRate.value;
        if (loop !== undefined) {
            this._loop = this._source.loop = !!loop;
        }
        if (this._loop && end !== undefined) {
            console.warn('Looping not support when specifying an "end" time');
            this._loop = this._source.loop = false;
        }
        this._end = end;
        var duration = this._source.buffer.duration;
        fadeIn = this._toSec(fadeIn);
        if (fadeIn > duration) {
            fadeIn = duration;
        }
        if (!this._loop) {
            fadeOut = this._toSec(fadeOut);
            if (fadeOut > duration - fadeIn) {
                fadeOut = duration - fadeIn;
            }
        }
        this._duration = duration;
        this._fadeIn = fadeIn;
        this._fadeOut = fadeOut;
        this._lastUpdate = this._now();
        this._elapsed = start;
        this._source.onended = this._onComplete.bind(this);
        this._source.start(0, start, (end ? end - start : undefined));
        this.emit("start");
        this._update(true);
        this._enabled = true;
    };
    SoundInstance.prototype._toSec = function (time) {
        if (time > 10) {
            time /= 1000;
        }
        return time || 0;
    };
    Object.defineProperty(SoundInstance.prototype, "_enabled", {
        set: function (enabled) {
            var _this = this;
            this._parent.nodes.script.onaudioprocess = !enabled ? null : function () {
                _this._update();
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundInstance.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundInstance.prototype, "paused", {
        get: function () {
            return this._paused;
        },
        set: function (paused) {
            if (paused !== this._paused) {
                this._paused = paused;
                if (paused) {
                    this._internalStop();
                    this.emit("paused");
                }
                else {
                    this.emit("resumed");
                    this.play(this._elapsed % this._duration, this._end, this._speed, this._loop, this._fadeIn, this._fadeOut);
                }
                this.emit("pause", paused);
            }
        },
        enumerable: true,
        configurable: true
    });
    SoundInstance.prototype.destroy = function () {
        this.removeAllListeners();
        this._internalStop();
        this._source = null;
        this._speed = 0;
        this._end = 0;
        this._parent = null;
        this._elapsed = 0;
        this._duration = 0;
        this._loop = false;
        this._fadeIn = 0;
        this._fadeOut = 0;
        this._paused = false;
        if (SoundInstance._pool.indexOf(this) < 0) {
            SoundInstance._pool.push(this);
        }
    };
    SoundInstance.prototype.toString = function () {
        return "[SoundInstance id=" + this.id + "]";
    };
    SoundInstance.prototype._now = function () {
        return this._parent.context.audioContext.currentTime;
    };
    SoundInstance.prototype._update = function (force) {
        if (force === void 0) { force = false; }
        if (this._source) {
            var now = this._now();
            var delta = now - this._lastUpdate;
            if (delta > 0 || force) {
                this._elapsed += delta;
                this._lastUpdate = now;
                var duration = this._duration;
                var progress = ((this._elapsed * this._speed) % duration) / duration;
                if (this._fadeIn || this._fadeOut) {
                    var position = progress * duration;
                    var gain = this._parent.nodes.gain.gain;
                    var maxVolume = this._parent.volume;
                    if (this._fadeIn) {
                        if (position <= this._fadeIn && progress < 1) {
                            gain.value = maxVolume * (position / this._fadeIn);
                        }
                        else {
                            gain.value = maxVolume;
                            this._fadeIn = 0;
                        }
                    }
                    if (this._fadeOut && position >= duration - this._fadeOut) {
                        var percent = (duration - position) / this._fadeOut;
                        gain.value = maxVolume * percent;
                    }
                }
                this._progress = progress;
                this.emit("progress", this._progress, duration);
            }
        }
    };
    SoundInstance.prototype._init = function (parent) {
        this._parent = parent;
    };
    SoundInstance.prototype._internalStop = function () {
        if (this._source) {
            this._enabled = false;
            this._source.onended = null;
            this._source.stop();
            this._source = null;
            this._parent.volume = this._parent.volume;
        }
    };
    SoundInstance.prototype._onComplete = function () {
        if (this._source) {
            this._enabled = false;
            this._source.onended = null;
        }
        this._source = null;
        this._progress = 1;
        this.emit("progress", 1, this._duration);
        this.emit("end", this);
    };
    return SoundInstance;
}(PIXI.utils.EventEmitter));
SoundInstance._pool = [];
exports.default = SoundInstance;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filterable_1 = require("./Filterable");
var filters = require("./filters");
var Sound_1 = require("./Sound");
var SoundContext_1 = require("./SoundContext");
var SoundInstance_1 = require("./SoundInstance");
var SoundSprite_1 = require("./SoundSprite");
var SoundUtils_1 = require("./SoundUtils");
var SoundLibrary = (function () {
    function SoundLibrary() {
        if (this.supported) {
            this._context = new SoundContext_1.default();
        }
        this._sounds = {};
        this.utils = SoundUtils_1.default;
        this.filters = filters;
        this.Sound = Sound_1.default;
        this.SoundInstance = SoundInstance_1.default;
        this.SoundLibrary = SoundLibrary;
        this.SoundSprite = SoundSprite_1.default;
        this.Filterable = Filterable_1.default;
    }
    Object.defineProperty(SoundLibrary.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundLibrary.prototype, "filtersAll", {
        get: function () {
            return this._context.filters;
        },
        set: function (filters) {
            this._context.filters = filters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundLibrary.prototype, "supported", {
        get: function () {
            return SoundContext_1.default.AudioContext !== null;
        },
        enumerable: true,
        configurable: true
    });
    SoundLibrary.prototype.add = function (source, sourceOptions) {
        if (typeof source === "object") {
            var results = {};
            for (var alias in source) {
                var options = this._getOptions(source[alias], sourceOptions);
                results[alias] = this.add(alias, options);
            }
            return results;
        }
        else if (typeof source === "string") {
            console.assert(!this._sounds[source], "Sound with alias " + source + " already exists.");
            if (sourceOptions instanceof Sound_1.default) {
                this._sounds[source] = sourceOptions;
                return sourceOptions;
            }
            else {
                var options = this._getOptions(sourceOptions);
                var sound = new Sound_1.default(this.context, options);
                this._sounds[source] = sound;
                return sound;
            }
        }
    };
    SoundLibrary.prototype._getOptions = function (source, overrides) {
        var options;
        if (typeof source === "string") {
            options = { src: source };
        }
        else if (source instanceof ArrayBuffer) {
            options = { srcBuffer: source };
        }
        else {
            options = source;
        }
        return Object.assign(options, overrides || {});
    };
    SoundLibrary.prototype.remove = function (alias) {
        this.exists(alias, true);
        this._sounds[alias].destroy();
        delete this._sounds[alias];
        return this;
    };
    Object.defineProperty(SoundLibrary.prototype, "volumeAll", {
        get: function () {
            return this._context.volume;
        },
        set: function (volume) {
            this._context.volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    SoundLibrary.prototype.pauseAll = function () {
        this._context.paused = true;
        return this;
    };
    SoundLibrary.prototype.resumeAll = function () {
        this._context.paused = false;
        return this;
    };
    SoundLibrary.prototype.muteAll = function () {
        this._context.muted = true;
        return this;
    };
    SoundLibrary.prototype.unmuteAll = function () {
        this._context.muted = false;
        return this;
    };
    SoundLibrary.prototype.removeAll = function () {
        for (var alias in this._sounds) {
            this._sounds[alias].destroy();
            delete this._sounds[alias];
        }
        return this;
    };
    SoundLibrary.prototype.stopAll = function () {
        for (var alias in this._sounds) {
            this._sounds[alias].stop();
        }
        return this;
    };
    SoundLibrary.prototype.exists = function (alias, assert) {
        if (assert === void 0) { assert = false; }
        var exists = !!this._sounds[alias];
        if (assert) {
            console.assert(exists, "No sound matching alias '" + alias + "'.");
        }
        return exists;
    };
    SoundLibrary.prototype.find = function (alias) {
        this.exists(alias, true);
        return this._sounds[alias];
    };
    SoundLibrary.prototype.play = function (alias, options) {
        return this.find(alias).play(options);
    };
    SoundLibrary.prototype.stop = function (alias) {
        return this.find(alias).stop();
    };
    SoundLibrary.prototype.pause = function (alias) {
        return this.find(alias).pause();
    };
    SoundLibrary.prototype.resume = function (alias) {
        return this.find(alias).resume();
    };
    SoundLibrary.prototype.volume = function (alias, volume) {
        var sound = this.find(alias);
        if (volume !== undefined) {
            sound.volume = volume;
        }
        return sound.volume;
    };
    SoundLibrary.prototype.duration = function (alias) {
        return this.find(alias).duration;
    };
    SoundLibrary.prototype.destroy = function () {
        this.removeAll();
        this._sounds = null;
        this._context = null;
    };
    return SoundLibrary;
}());
exports.default = SoundLibrary;

},{"./Filterable":1,"./Sound":3,"./SoundContext":4,"./SoundInstance":5,"./SoundSprite":8,"./SoundUtils":9,"./filters":16}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Filterable_1 = require("./Filterable");
var SoundNodes = (function (_super) {
    __extends(SoundNodes, _super);
    function SoundNodes(context) {
        var _this = this;
        var audioContext = context.audioContext;
        var bufferSource = audioContext.createBufferSource();
        var script = audioContext.createScriptProcessor(SoundNodes.BUFFER_SIZE);
        var gain = audioContext.createGain();
        var analyser = audioContext.createAnalyser();
        bufferSource.connect(analyser);
        analyser.connect(gain);
        gain.connect(context.destination);
        script.connect(context.destination);
        _this = _super.call(this, analyser, gain) || this;
        _this.context = context;
        _this.bufferSource = bufferSource;
        _this.script = script;
        _this.gain = gain;
        _this.analyser = analyser;
        return _this;
    }
    SoundNodes.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.bufferSource.disconnect();
        this.script.disconnect();
        this.gain.disconnect();
        this.analyser.disconnect();
        this.bufferSource = null;
        this.script = null;
        this.gain = null;
        this.analyser = null;
        this.context = null;
    };
    SoundNodes.prototype.cloneBufferSource = function () {
        var orig = this.bufferSource;
        var clone = this.context.audioContext.createBufferSource();
        clone.buffer = orig.buffer;
        clone.playbackRate.value = orig.playbackRate.value;
        clone.loop = orig.loop;
        clone.connect(this.destination);
        return clone;
    };
    return SoundNodes;
}(Filterable_1.default));
SoundNodes.BUFFER_SIZE = 256;
exports.default = SoundNodes;

},{"./Filterable":1}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundSprite = (function () {
    function SoundSprite(parent, options) {
        this.parent = parent;
        Object.assign(this, options);
        this.duration = this.end - this.start;
        console.assert(this.duration > 0, "End time must be after start time");
    }
    SoundSprite.prototype.play = function (complete) {
        return this.parent.play(Object.assign({
            complete: complete,
            speed: this.speed || this.parent.speed,
            end: this.end,
            start: this.start,
        }));
    };
    SoundSprite.prototype.destroy = function () {
        this.parent = null;
    };
    return SoundSprite;
}());
exports.default = SoundSprite;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid/v4");
var index_1 = require("./index");
var Sound_1 = require("./Sound");
var SoundUtils = (function () {
    function SoundUtils() {
    }
    SoundUtils.sineTone = function (hertz, seconds) {
        if (hertz === void 0) { hertz = 200; }
        if (seconds === void 0) { seconds = 1; }
        var soundContext = index_1.default.context;
        var soundInstance = new Sound_1.default(soundContext, {
            singleInstance: true,
        });
        var nChannels = 1;
        var sampleRate = 48000;
        var amplitude = 2;
        var buffer = soundContext.audioContext.createBuffer(nChannels, seconds * sampleRate, sampleRate);
        var fArray = buffer.getChannelData(0);
        for (var i = 0; i < fArray.length; i++) {
            var time = i / buffer.sampleRate;
            var angle = hertz * time * Math.PI;
            fArray[i] = Math.sin(angle) * amplitude;
        }
        soundInstance.buffer = buffer;
        soundInstance.isLoaded = true;
        return soundInstance;
    };
    SoundUtils.render = function (sound, options) {
        options = Object.assign({
            width: 512,
            height: 128,
            fill: "black",
        }, options || {});
        console.assert(!!sound.buffer, "No buffer found, load first");
        var canvas = document.createElement("canvas");
        canvas.width = options.width;
        canvas.height = options.height;
        var context = canvas.getContext("2d");
        context.fillStyle = options.fill;
        var data = sound.buffer.getChannelData(0);
        var step = Math.ceil(data.length / options.width);
        var amp = options.height / 2;
        for (var i = 0; i < options.width; i++) {
            var min = 1.0;
            var max = -1.0;
            for (var j = 0; j < step; j++) {
                var datum = data[(i * step) + j];
                if (datum < min) {
                    min = datum;
                }
                if (datum > max) {
                    max = datum;
                }
            }
            context.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
        }
        return PIXI.BaseTexture.fromCanvas(canvas);
    };
    SoundUtils.playOnce = function (src, callback) {
        var alias = uuid();
        index_1.default.add(alias, {
            src: src,
            preload: true,
            autoPlay: true,
            loaded: function (err) {
                if (err) {
                    console.error(err);
                    index_1.default.remove(alias);
                    if (callback) {
                        callback(err);
                    }
                }
            },
            complete: function () {
                index_1.default.remove(alias);
                if (callback) {
                    callback(null);
                }
            },
        });
        return alias;
    };
    return SoundUtils;
}());
exports.default = SoundUtils;

},{"./Sound":3,"./index":17,"uuid/v4":20}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sound_1 = require("./Sound");
var SoundLibrary_1 = require("./SoundLibrary");
var SoundLibraryPrototype = SoundLibrary_1.default.prototype;
var SoundPrototype = Sound_1.default.prototype;
SoundLibraryPrototype.sound = function sound(alias) {
    console.warn("PIXI.sound.sound is deprecated, use PIXI.sound.find");
    return this.find(alias);
};
SoundLibraryPrototype.panning = function panning(alias, panningValue) {
    console.warn("PIXI.sound.panning is deprecated, use PIXI.sound.filters.StereoPan");
    return 0;
};
SoundLibraryPrototype.addMap = function addMap(map, globalOptions) {
    console.warn("PIXI.sound.addMap is deprecated, use PIXI.sound.add");
    return this.add(map, globalOptions);
};
Object.defineProperty(SoundLibraryPrototype, "SoundUtils", {
    get: function () {
        console.warn("PIXI.sound.SoundUtils is deprecated, use PIXI.sound.utils");
        return this.utils;
    },
});
Object.defineProperty(SoundPrototype, "block", {
    get: function () {
        console.warn("PIXI.sound.Sound.prototype.block is deprecated, use singleInstance instead");
        return this.singleInstance;
    },
    set: function (value) {
        console.warn("PIXI.sound.Sound.prototype.block is deprecated, use singleInstance instead");
        this.singleInstance = value;
    },
});
Object.defineProperty(SoundPrototype, "loaded", {
    get: function () {
        console.warn("PIXI.sound.Sound.prototype.loaded is deprecated, use constructor option instead");
        return null;
    },
    set: function (value) {
        console.warn("PIXI.sound.Sound.prototype.loaded is deprecated, use constructor option instead");
    },
});
Object.defineProperty(SoundPrototype, "complete", {
    get: function () {
        console.warn("PIXI.sound.Sound.prototype.complete is deprecated, use constructor option instead");
        return null;
    },
    set: function (value) {
        console.warn("PIXI.sound.Sound.prototype.complete is deprecated, use constructor option instead");
    },
});

},{"./Sound":3,"./SoundLibrary":6}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Filter_1 = require("./Filter");
var index_1 = require("../index");
var DistortionFilter = (function (_super) {
    __extends(DistortionFilter, _super);
    function DistortionFilter(amount) {
        if (amount === void 0) { amount = 0; }
        var _this = this;
        var distortion = index_1.default.context.audioContext.createWaveShaper();
        _this = _super.call(this, distortion) || this;
        _this._distortion = distortion;
        _this.amount = amount;
        return _this;
    }
    Object.defineProperty(DistortionFilter.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        set: function (value) {
            value *= 1000;
            this._amount = value;
            var samples = 44100;
            var curve = new Float32Array(samples);
            var deg = Math.PI / 180;
            var i = 0;
            var x;
            for (; i < samples; ++i) {
                x = i * 2 / samples - 1;
                curve[i] = (3 + value) * x * 20 * deg / (Math.PI + value * Math.abs(x));
            }
            this._distortion.curve = curve;
            this._distortion.oversample = '4x';
        },
        enumerable: true,
        configurable: true
    });
    DistortionFilter.prototype.destroy = function () {
        this._distortion = null;
        _super.prototype.destroy.call(this);
    };
    return DistortionFilter;
}(Filter_1.default));
exports.default = DistortionFilter;

},{"../index":17,"./Filter":13}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Filter_1 = require("./Filter");
var index_1 = require("../index");
var EqualizerFilter = (function (_super) {
    __extends(EqualizerFilter, _super);
    function EqualizerFilter(f32, f64, f125, f250, f500, f1k, f2k, f4k, f8k, f16k) {
        if (f32 === void 0) { f32 = 0; }
        if (f64 === void 0) { f64 = 0; }
        if (f125 === void 0) { f125 = 0; }
        if (f250 === void 0) { f250 = 0; }
        if (f500 === void 0) { f500 = 0; }
        if (f1k === void 0) { f1k = 0; }
        if (f2k === void 0) { f2k = 0; }
        if (f4k === void 0) { f4k = 0; }
        if (f8k === void 0) { f8k = 0; }
        if (f16k === void 0) { f16k = 0; }
        var _this = this;
        var equalizerBands = [
            {
                f: EqualizerFilter.F32,
                type: 'lowshelf',
                gain: f32
            },
            {
                f: EqualizerFilter.F64,
                type: 'peaking',
                gain: f64
            },
            {
                f: EqualizerFilter.F125,
                type: 'peaking',
                gain: f125
            },
            {
                f: EqualizerFilter.F250,
                type: 'peaking',
                gain: f250
            },
            {
                f: EqualizerFilter.F500,
                type: 'peaking',
                gain: f500
            },
            {
                f: EqualizerFilter.F1K,
                type: 'peaking',
                gain: f1k
            },
            {
                f: EqualizerFilter.F2K,
                type: 'peaking',
                gain: f2k
            },
            {
                f: EqualizerFilter.F4K,
                type: 'peaking',
                gain: f4k
            },
            {
                f: EqualizerFilter.F8K,
                type: 'peaking',
                gain: f8k
            },
            {
                f: EqualizerFilter.F16K,
                type: 'highshelf',
                gain: f16k
            }
        ];
        var bands = equalizerBands.map(function (band) {
            var filter = index_1.default.context.audioContext.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = band.gain;
            filter.Q.value = 1;
            filter.frequency.value = band.f;
            return filter;
        });
        _this = _super.call(this, bands[0], bands[bands.length - 1]) || this;
        _this.bands = bands;
        _this.bandsMap = {};
        for (var i = 0; i < _this.bands.length; i++) {
            var node = _this.bands[i];
            if (i > 0) {
                _this.bands[i - 1].connect(node);
            }
            _this.bandsMap[node.frequency.value] = node;
        }
        return _this;
    }
    EqualizerFilter.prototype.setGain = function (frequency, gain) {
        if (gain === void 0) { gain = 0; }
        if (!this.bandsMap[frequency]) {
            throw 'No band found for frequency ' + frequency;
        }
        this.bandsMap[frequency].gain.value = gain;
    };
    EqualizerFilter.prototype.reset = function () {
        this.bands.forEach(function (band) {
            band.gain.value = 0;
        });
    };
    EqualizerFilter.prototype.destroy = function () {
        this.bands.forEach(function (band) {
            band.disconnect();
        });
        this.bands = null;
        this.bandsMap = null;
    };
    return EqualizerFilter;
}(Filter_1.default));
EqualizerFilter.F32 = 32;
EqualizerFilter.F64 = 64;
EqualizerFilter.F125 = 125;
EqualizerFilter.F250 = 250;
EqualizerFilter.F500 = 500;
EqualizerFilter.F1K = 1000;
EqualizerFilter.F2K = 2000;
EqualizerFilter.F4K = 4000;
EqualizerFilter.F8K = 8000;
EqualizerFilter.F16K = 16000;
exports.default = EqualizerFilter;

},{"../index":17,"./Filter":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter = (function () {
    function Filter(destination, source) {
        this.destination = destination;
        this.source = source || destination;
    }
    Filter.prototype.connect = function (destination) {
        this.source.connect(destination);
    };
    Filter.prototype.disconnect = function () {
        this.source.disconnect();
    };
    Filter.prototype.destroy = function () {
        this.disconnect();
        this.destination = null;
        this.source = null;
    };
    return Filter;
}());
exports.default = Filter;

},{}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Filter_1 = require("./Filter");
var index_1 = require("../index");
var ReverbFilter = (function (_super) {
    __extends(ReverbFilter, _super);
    function ReverbFilter(seconds, decay, reverse) {
        if (seconds === void 0) { seconds = 3; }
        if (decay === void 0) { decay = 2; }
        if (reverse === void 0) { reverse = false; }
        var _this = this;
        var convolver = index_1.default.context.audioContext.createConvolver();
        _this = _super.call(this, convolver) || this;
        _this._convolver = convolver;
        _this._seconds = _this._clamp(seconds, 1, 50);
        _this._decay = _this._clamp(decay, 0, 100);
        _this._reverse = reverse;
        _this._rebuild();
        return _this;
    }
    ReverbFilter.prototype._clamp = function (value, min, max) {
        return Math.min(max, Math.max(min, value));
    };
    Object.defineProperty(ReverbFilter.prototype, "seconds", {
        get: function () {
            return this._seconds;
        },
        set: function (seconds) {
            this._seconds = this._clamp(seconds, 1, 50);
            this._rebuild();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReverbFilter.prototype, "decay", {
        get: function () {
            return this._decay;
        },
        set: function (decay) {
            this._decay = this._clamp(decay, 0, 100);
            this._rebuild();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReverbFilter.prototype, "reverse", {
        get: function () {
            return this._reverse;
        },
        set: function (reverse) {
            this._reverse = reverse;
            this._rebuild();
        },
        enumerable: true,
        configurable: true
    });
    ReverbFilter.prototype._rebuild = function () {
        var context = index_1.default.context.audioContext;
        var rate = context.sampleRate;
        var length = rate * this._seconds;
        var impulse = context.createBuffer(2, length, rate);
        var impulseL = impulse.getChannelData(0);
        var impulseR = impulse.getChannelData(1);
        var n;
        for (var i = 0; i < length; i++) {
            n = this._reverse ? length - i : i;
            impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, this._decay);
            impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, this._decay);
        }
        this._convolver.buffer = impulse;
    };
    ReverbFilter.prototype.destroy = function () {
        this._convolver = null;
        _super.prototype.destroy.call(this);
    };
    return ReverbFilter;
}(Filter_1.default));
exports.default = ReverbFilter;

},{"../index":17,"./Filter":13}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Filter_1 = require("./Filter");
var index_1 = require("../index");
var StereoFilter = (function (_super) {
    __extends(StereoFilter, _super);
    function StereoFilter(pan) {
        if (pan === void 0) { pan = 0; }
        var _this = this;
        var stereo;
        var panner;
        var destination;
        var audioContext = index_1.default.context.audioContext;
        if (audioContext.createStereoPanner) {
            stereo = audioContext.createStereoPanner();
            destination = stereo;
        }
        else {
            panner = audioContext.createPanner();
            panner.panningModel = 'equalpower';
            destination = panner;
        }
        _this = _super.call(this, destination) || this;
        _this._stereo = stereo;
        _this._panner = panner;
        _this.pan = pan;
        return _this;
    }
    Object.defineProperty(StereoFilter.prototype, "pan", {
        get: function () {
            return this._pan;
        },
        set: function (value) {
            this._pan = value;
            if (this._stereo) {
                this._stereo.pan.value = value;
            }
            else {
                this._panner.setPosition(value, 0, 1 - Math.abs(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    StereoFilter.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._stereo = null;
        this._panner = null;
    };
    return StereoFilter;
}(Filter_1.default));
exports.default = StereoFilter;

},{"../index":17,"./Filter":13}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter_1 = require("./Filter");
exports.Filter = Filter_1.default;
var EqualizerFilter_1 = require("./EqualizerFilter");
exports.EqualizerFilter = EqualizerFilter_1.default;
var DistortionFilter_1 = require("./DistortionFilter");
exports.DistortionFilter = DistortionFilter_1.default;
var StereoFilter_1 = require("./StereoFilter");
exports.StereoFilter = StereoFilter_1.default;
var ReverbFilter_1 = require("./ReverbFilter");
exports.ReverbFilter = ReverbFilter_1.default;

},{"./DistortionFilter":11,"./EqualizerFilter":12,"./Filter":13,"./ReverbFilter":14,"./StereoFilter":15}],17:[function(require,module,exports){
(function (global){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoaderMiddleware_1 = require("./LoaderMiddleware");
var SoundLibrary_1 = require("./SoundLibrary");
require("./deprecations");
var sound = new SoundLibrary_1.default();
if (global.PIXI === undefined) {
    throw new Error("pixi.js is required");
}
if (PIXI.loaders !== undefined) {
    LoaderMiddleware_1.install();
}
Object.defineProperty(PIXI, "sound", {
    get: function () { return sound; },
});
exports.default = sound;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./LoaderMiddleware":2,"./SoundLibrary":6,"./deprecations":10}],18:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

},{}],19:[function(require,module,exports){
(function (global){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":18,"./lib/rng":19}]},{},[17])(17)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvRmlsdGVyYWJsZS5qcyIsImxpYi9Mb2FkZXJNaWRkbGV3YXJlLmpzIiwibGliL1NvdW5kLmpzIiwibGliL1NvdW5kQ29udGV4dC5qcyIsImxpYi9Tb3VuZEluc3RhbmNlLmpzIiwibGliL1NvdW5kTGlicmFyeS5qcyIsImxpYi9Tb3VuZE5vZGVzLmpzIiwibGliL1NvdW5kU3ByaXRlLmpzIiwibGliL1NvdW5kVXRpbHMuanMiLCJsaWIvZGVwcmVjYXRpb25zLmpzIiwibGliL2ZpbHRlcnMvRGlzdG9ydGlvbkZpbHRlci5qcyIsImxpYi9maWx0ZXJzL0VxdWFsaXplckZpbHRlci5qcyIsImxpYi9maWx0ZXJzL0ZpbHRlci5qcyIsImxpYi9maWx0ZXJzL1JldmVyYkZpbHRlci5qcyIsImxpYi9maWx0ZXJzL1N0ZXJlb0ZpbHRlci5qcyIsImxpYi9maWx0ZXJzL2luZGV4LmpzIiwibGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGaWx0ZXJhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGaWx0ZXJhYmxlKGlucHV0LCBvdXRwdXQpIHtcbiAgICAgICAgdGhpcy5fb3V0cHV0ID0gb3V0cHV0O1xuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRmlsdGVyYWJsZS5wcm90b3R5cGUsIFwiZGVzdGluYXRpb25cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnB1dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZpbHRlcmFibGUucHJvdG90eXBlLCBcImZpbHRlcnNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJzLmZvckVhY2goZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5wdXQuY29ubmVjdCh0aGlzLl9vdXRwdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJzID0gZmlsdGVycy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnB1dC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZGaWx0ZXJfMSA9IG51bGw7XG4gICAgICAgICAgICAgICAgZmlsdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZGaWx0ZXJfMSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2lucHV0LmNvbm5lY3QoZmlsdGVyLmRlc3RpbmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZGaWx0ZXJfMS5jb25uZWN0KGZpbHRlci5kZXN0aW5hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJldkZpbHRlcl8xID0gZmlsdGVyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHByZXZGaWx0ZXJfMS5jb25uZWN0KHRoaXMuX291dHB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZpbHRlcmFibGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0ID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBGaWx0ZXJhYmxlO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IEZpbHRlcmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWx0ZXJhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGluZGV4XzEgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcbnZhciBBVURJT19FWFRFTlNJT05TID0gW1wid2F2XCIsIFwibXAzXCIsIFwib2dnXCIsIFwib2dhXCIsIFwibTRhXCJdO1xuZnVuY3Rpb24gbWlkZGxld2FyZShyZXNvdXJjZSwgbmV4dCkge1xuICAgIGlmIChyZXNvdXJjZS5kYXRhICYmIEFVRElPX0VYVEVOU0lPTlMuaW5kZXhPZihyZXNvdXJjZS5fZ2V0RXh0ZW5zaW9uKCkpID4gLTEpIHtcbiAgICAgICAgcmVzb3VyY2Uuc291bmQgPSBpbmRleF8xLmRlZmF1bHQuYWRkKHJlc291cmNlLm5hbWUsIHtcbiAgICAgICAgICAgIGxvYWRlZDogbmV4dCxcbiAgICAgICAgICAgIHByZWxvYWQ6IHRydWUsXG4gICAgICAgICAgICBzcmNCdWZmZXI6IHJlc291cmNlLmRhdGEsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbmV4dCgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1pZGRsZXdhcmVGYWN0b3J5KCkge1xuICAgIHJldHVybiBtaWRkbGV3YXJlO1xufVxuZnVuY3Rpb24gaW5zdGFsbCgpIHtcbiAgICB2YXIgUmVzb3VyY2UgPSBQSVhJLmxvYWRlcnMuUmVzb3VyY2U7XG4gICAgQVVESU9fRVhURU5TSU9OUy5mb3JFYWNoKGZ1bmN0aW9uIChleHQpIHtcbiAgICAgICAgUmVzb3VyY2Uuc2V0RXh0ZW5zaW9uWGhyVHlwZShleHQsIFJlc291cmNlLlhIUl9SRVNQT05TRV9UWVBFLkJVRkZFUik7XG4gICAgICAgIFJlc291cmNlLnNldEV4dGVuc2lvbkxvYWRUeXBlKGV4dCwgUmVzb3VyY2UuTE9BRF9UWVBFLlhIUik7XG4gICAgfSk7XG4gICAgUElYSS5sb2FkZXJzLkxvYWRlci5hZGRQaXhpTWlkZGxld2FyZShtaWRkbGV3YXJlRmFjdG9yeSk7XG4gICAgUElYSS5sb2FkZXIudXNlKG1pZGRsZXdhcmUpO1xufVxuZXhwb3J0cy5pbnN0YWxsID0gaW5zdGFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxvYWRlck1pZGRsZXdhcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCIuL2luZGV4XCIpO1xudmFyIFNvdW5kSW5zdGFuY2VfMSA9IHJlcXVpcmUoXCIuL1NvdW5kSW5zdGFuY2VcIik7XG52YXIgU291bmROb2Rlc18xID0gcmVxdWlyZShcIi4vU291bmROb2Rlc1wiKTtcbnZhciBTb3VuZFNwcml0ZV8xID0gcmVxdWlyZShcIi4vU291bmRTcHJpdGVcIik7XG52YXIgU291bmQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNvdW5kKGNvbnRleHQsIHNvdXJjZSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgb3B0aW9ucy5zcmMgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc291cmNlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc3JjQnVmZmVyID0gc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBhdXRvUGxheTogZmFsc2UsXG4gICAgICAgICAgICBzaW5nbGVJbnN0YW5jZTogZmFsc2UsXG4gICAgICAgICAgICBzcmM6IG51bGwsXG4gICAgICAgICAgICBzcmNCdWZmZXI6IG51bGwsXG4gICAgICAgICAgICBwcmVsb2FkOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxLFxuICAgICAgICAgICAgY29tcGxldGU6IG51bGwsXG4gICAgICAgICAgICBsb2FkZWQ6IG51bGwsXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZVhIUjogdHJ1ZSxcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLl9ub2RlcyA9IG5ldyBTb3VuZE5vZGVzXzEuZGVmYXVsdCh0aGlzLl9jb250ZXh0KTtcbiAgICAgICAgdGhpcy5fc291cmNlID0gdGhpcy5fbm9kZXMuYnVmZmVyU291cmNlO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc3ByaXRlcyA9IHt9O1xuICAgICAgICB2YXIgY29tcGxldGUgPSBvcHRpb25zLmNvbXBsZXRlO1xuICAgICAgICB0aGlzLl9hdXRvUGxheU9wdGlvbnMgPSBjb21wbGV0ZSA/IHsgY29tcGxldGU6IGNvbXBsZXRlIH0gOiBudWxsO1xuICAgICAgICB0aGlzLmlzTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXV0b1BsYXkgPSBvcHRpb25zLmF1dG9QbGF5O1xuICAgICAgICB0aGlzLnNpbmdsZUluc3RhbmNlID0gb3B0aW9ucy5zaW5nbGVJbnN0YW5jZTtcbiAgICAgICAgdGhpcy5wcmVsb2FkID0gb3B0aW9ucy5wcmVsb2FkIHx8IHRoaXMuYXV0b1BsYXk7XG4gICAgICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmM7XG4gICAgICAgIHRoaXMuc3JjQnVmZmVyID0gb3B0aW9ucy5zcmNCdWZmZXI7XG4gICAgICAgIHRoaXMudXNlWEhSID0gb3B0aW9ucy51c2VYSFI7XG4gICAgICAgIHRoaXMudm9sdW1lID0gb3B0aW9ucy52b2x1bWU7XG4gICAgICAgIHRoaXMubG9vcCA9IG9wdGlvbnMubG9vcDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IG9wdGlvbnMuc3BlZWQ7XG4gICAgICAgIGlmIChvcHRpb25zLnNwcml0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU3ByaXRlcyhvcHRpb25zLnNwcml0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZWxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2JlZ2luUHJlbG9hZChvcHRpb25zLmxvYWRlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgU291bmQuZnJvbSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgU291bmQoaW5kZXhfMS5kZWZhdWx0LmNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX25vZGVzLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fbm9kZXMgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc291cmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZW1vdmVTcHJpdGVzKCk7XG4gICAgICAgIHRoaXMuX3Nwcml0ZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnNyY0J1ZmZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlbW92ZUluc3RhbmNlcygpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXMgPSBudWxsO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kLnByb3RvdHlwZSwgXCJpc1BsYXlhYmxlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0xvYWRlZCAmJiAhIXRoaXMuX3NvdXJjZSAmJiAhIXRoaXMuX3NvdXJjZS5idWZmZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZC5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZC5wcm90b3R5cGUsIFwidm9sdW1lXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdm9sdW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2b2x1bWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZvbHVtZSA9IHRoaXMuX25vZGVzLmdhaW4uZ2Fpbi52YWx1ZSA9IHZvbHVtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kLnByb3RvdHlwZSwgXCJsb29wXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlLmxvb3A7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGxvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5sb29wID0gISFsb29wO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmQucHJvdG90eXBlLCBcImJ1ZmZlclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZS5idWZmZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fc291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kLnByb3RvdHlwZSwgXCJkdXJhdGlvblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodGhpcy5pc1BsYXlhYmxlLCBcIlNvdW5kIG5vdCB5ZXQgcGxheWFibGUsIG5vIGR1cmF0aW9uXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZS5idWZmZXIuZHVyYXRpb247XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZC5wcm90b3R5cGUsIFwibm9kZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ub2RlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kLnByb3RvdHlwZSwgXCJmaWx0ZXJzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbm9kZXMuZmlsdGVycztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZmlsdGVycykge1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZC5wcm90b3R5cGUsIFwic3BlZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmQucHJvdG90eXBlLCBcImluc3RhbmNlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kLnByb3RvdHlwZSwgXCJzcHJpdGVzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ByaXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU291bmQucHJvdG90eXBlLmFkZFNwcml0ZXMgPSBmdW5jdGlvbiAoc291cmNlLCBkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgYWxpYXMgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1thbGlhc10gPSB0aGlzLmFkZFNwcml0ZXMoYWxpYXMsIHNvdXJjZVthbGlhc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY29uc29sZS5hc3NlcnQoIXRoaXMuX3Nwcml0ZXNbc291cmNlXSwgXCJBbGlhcyBcIiArIHNvdXJjZSArIFwiIGlzIGFscmVhZHkgdGFrZW5cIik7XG4gICAgICAgICAgICB2YXIgc3ByaXRlID0gbmV3IFNvdW5kU3ByaXRlXzEuZGVmYXVsdCh0aGlzLCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZXNbc291cmNlXSA9IHNwcml0ZTtcbiAgICAgICAgICAgIHJldHVybiBzcHJpdGU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5yZW1vdmVTcHJpdGVzID0gZnVuY3Rpb24gKGFsaWFzKSB7XG4gICAgICAgIGlmICghYWxpYXMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWVfMSBpbiB0aGlzLl9zcHJpdGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTcHJpdGVzKG5hbWVfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3ByaXRlID0gdGhpcy5fc3ByaXRlc1thbGlhc107XG4gICAgICAgICAgICBpZiAoc3ByaXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzcHJpdGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zcHJpdGVzW2FsaWFzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKHNvdXJjZSwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgc3ByaXRlID0gc291cmNlO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHsgc3ByaXRlOiBzcHJpdGUsIGNvbXBsZXRlOiBjb21wbGV0ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZSA9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgY29tcGxldGU6IG51bGwsXG4gICAgICAgICAgICBsb2FkZWQ6IG51bGwsXG4gICAgICAgICAgICBzcHJpdGU6IG51bGwsXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGZhZGVJbjogMCxcbiAgICAgICAgICAgIGZhZGVPdXQ6IDAsXG4gICAgICAgIH0sIG9wdGlvbnMgfHwge30pO1xuICAgICAgICBpZiAob3B0aW9ucy5zcHJpdGUpIHtcbiAgICAgICAgICAgIHZhciBhbGlhcyA9IG9wdGlvbnMuc3ByaXRlO1xuICAgICAgICAgICAgY29uc29sZS5hc3NlcnQoISF0aGlzLl9zcHJpdGVzW2FsaWFzXSwgXCJBbGlhcyBcIiArIGFsaWFzICsgXCIgaXMgbm90IGF2YWlsYWJsZVwiKTtcbiAgICAgICAgICAgIHZhciBzcHJpdGUgPSB0aGlzLl9zcHJpdGVzW2FsaWFzXTtcbiAgICAgICAgICAgIG9wdGlvbnMuc3RhcnQgPSBzcHJpdGUuc3RhcnQ7XG4gICAgICAgICAgICBvcHRpb25zLmVuZCA9IHNwcml0ZS5lbmQ7XG4gICAgICAgICAgICBvcHRpb25zLnNwZWVkID0gc3ByaXRlLnNwZWVkO1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuc3ByaXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm9mZnNldCkge1xuICAgICAgICAgICAgb3B0aW9ucy5zdGFydCA9IG9wdGlvbnMub2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hdXRvUGxheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2F1dG9QbGF5T3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2JlZ2luUHJlbG9hZChmdW5jdGlvbiAoZXJyLCBzb3VuZCwgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvYWRlZChlcnIsIHNvdW5kLCBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUluc3RhbmNlcygpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnN0YW5jZSA9IFNvdW5kSW5zdGFuY2VfMS5kZWZhdWx0LmNyZWF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICAgIGluc3RhbmNlLm9uY2UoXCJlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNvbXBsZXRlKF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLl9vbkNvbXBsZXRlKGluc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGluc3RhbmNlLm9uY2UoXCJzdG9wXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9vbkNvbXBsZXRlKGluc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGluc3RhbmNlLnBsYXkob3B0aW9ucy5zdGFydCwgb3B0aW9ucy5lbmQsIG9wdGlvbnMuc3BlZWQsIG9wdGlvbnMubG9vcCwgb3B0aW9ucy5mYWRlSW4sIG9wdGlvbnMuZmFkZU91dCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5hdXRvUGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fYXV0b1BsYXlPcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgO1xuICAgIFNvdW5kLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1tpXS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRoaXMuX2luc3RhbmNlcy5sZW5ndGggPiAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5fYmVnaW5QcmVsb2FkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgICAgICAgdGhpcy51c2VYSFIgPyB0aGlzLl9sb2FkVXJsKGNhbGxiYWNrKSA6IHRoaXMuX2xvYWRQYXRoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNyY0J1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fZGVjb2RlKHRoaXMuc3JjQnVmZmVyLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihcInNvdW5kLnNyYyBvciBzb3VuZC5zcmNCdWZmZXIgbXVzdCBiZSBzZXRcIikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInNvdW5kLnNyYyBvciBzb3VuZC5zcmNCdWZmZXIgbXVzdCBiZSBzZXRcIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5fb25Db21wbGV0ZSA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2VzKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9pbnN0YW5jZXMuaW5kZXhPZihpbnN0YW5jZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgICBTb3VuZC5wcm90b3R5cGUuX3JlbW92ZUluc3RhbmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX2luc3RhbmNlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbnN0YW5jZXMubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5fbG9hZFVybCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgc3JjID0gdGhpcy5zcmM7XG4gICAgICAgIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBzcmMsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5zcmNCdWZmZXIgPSByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgICAgICAgX3RoaXMuX2RlY29kZShyZXF1ZXN0LnJlc3BvbnNlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH07XG4gICAgU291bmQucHJvdG90eXBlLl9sb2FkUGF0aCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZnMgPSByZXF1aXJlKFwiZnNcIik7XG4gICAgICAgIHZhciBzcmMgPSB0aGlzLnNyYztcbiAgICAgICAgZnMucmVhZEZpbGUoc3JjLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJGaWxlIG5vdCBmb3VuZCBcIiArIF90aGlzLnNyYykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYXJyYXlCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2aWV3W2ldID0gZGF0YVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNyY0J1ZmZlciA9IGFycmF5QnVmZmVyO1xuICAgICAgICAgICAgX3RoaXMuX2RlY29kZShhcnJheUJ1ZmZlciwgY2FsbGJhY2spO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNvdW5kLnByb3RvdHlwZS5fZGVjb2RlID0gZnVuY3Rpb24gKGFycmF5QnVmZmVyLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmRlY29kZShhcnJheUJ1ZmZlciwgZnVuY3Rpb24gKGVyciwgYnVmZmVyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIF90aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmF1dG9QbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlID0gX3RoaXMucGxheShfdGhpcy5fYXV0b1BsYXlPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIF90aGlzLCBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTb3VuZDtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTb3VuZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNvdW5kLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRmlsdGVyYWJsZV8xID0gcmVxdWlyZShcIi4vRmlsdGVyYWJsZVwiKTtcbnZhciBTb3VuZENvbnRleHQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTb3VuZENvbnRleHQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU291bmRDb250ZXh0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY3R4ID0gbmV3IFNvdW5kQ29udGV4dC5BdWRpb0NvbnRleHQoKTtcbiAgICAgICAgdmFyIGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICB2YXIgY29tcHJlc3NvciA9IGN0eC5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3IoKTtcbiAgICAgICAgdmFyIGFuYWx5c2VyID0gY3R4LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgICAgIGFuYWx5c2VyLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChjb21wcmVzc29yKTtcbiAgICAgICAgY29tcHJlc3Nvci5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgYW5hbHlzZXIsIGdhaW4pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIF90aGlzLl9vZmZsaW5lQ3R4ID0gbmV3IFNvdW5kQ29udGV4dC5PZmZsaW5lQXVkaW9Db250ZXh0KDEsIDIsIGN0eC5zYW1wbGVSYXRlKTtcbiAgICAgICAgX3RoaXMuX3VubG9ja2VkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmdhaW4gPSBnYWluO1xuICAgICAgICBfdGhpcy5jb21wcmVzc29yID0gY29tcHJlc3NvcjtcbiAgICAgICAgX3RoaXMuYW5hbHlzZXIgPSBhbmFseXNlcjtcbiAgICAgICAgX3RoaXMudm9sdW1lID0gMTtcbiAgICAgICAgX3RoaXMubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIGlmIChcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdyAmJiBjdHguc3RhdGUgIT09IFwicnVubmluZ1wiKSB7XG4gICAgICAgICAgICBfdGhpcy5fdW5sb2NrKCk7XG4gICAgICAgICAgICBfdGhpcy5fdW5sb2NrID0gX3RoaXMuX3VubG9jay5iaW5kKF90aGlzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgX3RoaXMuX3VubG9jaywgdHJ1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBfdGhpcy5fdW5sb2NrLCB0cnVlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBfdGhpcy5fdW5sb2NrLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNvdW5kQ29udGV4dC5wcm90b3R5cGUuX3VubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VubG9ja2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbGF5RW1wdHlTb3VuZCgpO1xuICAgICAgICBpZiAodGhpcy5fY3R4LnN0YXRlID09PSBcInJ1bm5pbmdcIikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl91bmxvY2ssIHRydWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3VubG9jaywgdHJ1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl91bmxvY2ssIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5fdW5sb2NrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTb3VuZENvbnRleHQucHJvdG90eXBlLnBsYXlFbXB0eVNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc291cmNlID0gdGhpcy5fY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBzb3VyY2UuYnVmZmVyID0gdGhpcy5fY3R4LmNyZWF0ZUJ1ZmZlcigxLCAxLCAyMjA1MCk7XG4gICAgICAgIHNvdXJjZS5jb25uZWN0KHRoaXMuX2N0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIHNvdXJjZS5zdGFydCgwLCAwLCAwKTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZENvbnRleHQsIFwiQXVkaW9Db250ZXh0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd2luID0gd2luZG93O1xuICAgICAgICAgICAgcmV0dXJuICh3aW4uQXVkaW9Db250ZXh0IHx8XG4gICAgICAgICAgICAgICAgd2luLndlYmtpdEF1ZGlvQ29udGV4dCB8fFxuICAgICAgICAgICAgICAgIG51bGwpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRDb250ZXh0LCBcIk9mZmxpbmVBdWRpb0NvbnRleHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3aW4gPSB3aW5kb3c7XG4gICAgICAgICAgICByZXR1cm4gKHdpbi5PZmZsaW5lQXVkaW9Db250ZXh0IHx8XG4gICAgICAgICAgICAgICAgd2luLndlYmtpdE9mZmxpbmVBdWRpb0NvbnRleHQgfHxcbiAgICAgICAgICAgICAgICBudWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU291bmRDb250ZXh0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgaWYgKHR5cGVvZiBjdHguY2xvc2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGN0eC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5hbHlzZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmdhaW4uZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmNvbXByZXNzb3IuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmdhaW4gPSBudWxsO1xuICAgICAgICB0aGlzLmFuYWx5c2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb21wcmVzc29yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb2ZmbGluZUN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N0eCA9IG51bGw7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRDb250ZXh0LnByb3RvdHlwZSwgXCJhdWRpb0NvbnRleHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdHg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZENvbnRleHQucHJvdG90eXBlLCBcIm9mZmxpbmVDb250ZXh0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb2ZmbGluZUN0eDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kQ29udGV4dC5wcm90b3R5cGUsIFwibXV0ZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tdXRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobXV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX211dGVkID0gISFtdXRlZDtcbiAgICAgICAgICAgIHRoaXMuZ2Fpbi5nYWluLnZhbHVlID0gdGhpcy5fbXV0ZWQgPyAwIDogdGhpcy5fdm9sdW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRDb250ZXh0LnByb3RvdHlwZSwgXCJ2b2x1bWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZvbHVtZSkge1xuICAgICAgICAgICAgdGhpcy5fdm9sdW1lID0gdm9sdW1lO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9tdXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2Fpbi5nYWluLnZhbHVlID0gdGhpcy5fdm9sdW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRDb250ZXh0LnByb3RvdHlwZSwgXCJwYXVzZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXVzZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHBhdXNlZCkge1xuICAgICAgICAgICAgaWYgKHBhdXNlZCAmJiB0aGlzLl9jdHguc3RhdGUgPT09IFwicnVubmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LnN1c3BlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFwYXVzZWQgJiYgdGhpcy5fY3R4LnN0YXRlID09PSBcInN1c3BlbmRlZFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LnJlc3VtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcGF1c2VkID0gcGF1c2VkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBTb3VuZENvbnRleHQucHJvdG90eXBlLnRvZ2dsZU11dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubXV0ZWQgPSAhdGhpcy5tdXRlZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211dGVkO1xuICAgIH07XG4gICAgU291bmRDb250ZXh0LnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoYXJyYXlCdWZmZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX29mZmxpbmVDdHguZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyLCBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBidWZmZXIpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJVbmFibGUgdG8gZGVjb2RlIGZpbGVcIikpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTb3VuZENvbnRleHQ7XG59KEZpbHRlcmFibGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTb3VuZENvbnRleHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Tb3VuZENvbnRleHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpZCA9IDA7XG52YXIgU291bmRJbnN0YW5jZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNvdW5kSW5zdGFuY2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU291bmRJbnN0YW5jZShwYXJlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaWQgPSBpZCsrO1xuICAgICAgICBfdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5fZWxhcHNlZCA9IDA7XG4gICAgICAgIF90aGlzLl9pbml0KHBhcmVudCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU291bmRJbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIGlmIChTb3VuZEluc3RhbmNlLl9wb29sLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzb3VuZCA9IFNvdW5kSW5zdGFuY2UuX3Bvb2wucG9wKCk7XG4gICAgICAgICAgICBzb3VuZC5faW5pdChwYXJlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHNvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTb3VuZEluc3RhbmNlKHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNvdW5kSW5zdGFuY2UucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsU3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwic3RvcFwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU291bmRJbnN0YW5jZS5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCBzcGVlZCwgbG9vcCwgZmFkZUluLCBmYWRlT3V0KSB7XG4gICAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KGVuZCA+IHN0YXJ0LCBcIkVuZCB0aW1lIGlzIGJlZm9yZSBzdGFydCB0aW1lXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zb3VyY2UgPSB0aGlzLl9wYXJlbnQubm9kZXMuY2xvbmVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgaWYgKHNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5wbGF5YmFja1JhdGUudmFsdWUgPSBzcGVlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zcGVlZCA9IHRoaXMuX3NvdXJjZS5wbGF5YmFja1JhdGUudmFsdWU7XG4gICAgICAgIGlmIChsb29wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvb3AgPSB0aGlzLl9zb3VyY2UubG9vcCA9ICEhbG9vcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9vcCAmJiBlbmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdMb29waW5nIG5vdCBzdXBwb3J0IHdoZW4gc3BlY2lmeWluZyBhbiBcImVuZFwiIHRpbWUnKTtcbiAgICAgICAgICAgIHRoaXMuX2xvb3AgPSB0aGlzLl9zb3VyY2UubG9vcCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VuZCA9IGVuZDtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gdGhpcy5fc291cmNlLmJ1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgZmFkZUluID0gdGhpcy5fdG9TZWMoZmFkZUluKTtcbiAgICAgICAgaWYgKGZhZGVJbiA+IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICBmYWRlSW4gPSBkdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2xvb3ApIHtcbiAgICAgICAgICAgIGZhZGVPdXQgPSB0aGlzLl90b1NlYyhmYWRlT3V0KTtcbiAgICAgICAgICAgIGlmIChmYWRlT3V0ID4gZHVyYXRpb24gLSBmYWRlSW4pIHtcbiAgICAgICAgICAgICAgICBmYWRlT3V0ID0gZHVyYXRpb24gLSBmYWRlSW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5fZmFkZUluID0gZmFkZUluO1xuICAgICAgICB0aGlzLl9mYWRlT3V0ID0gZmFkZU91dDtcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9IHRoaXMuX25vdygpO1xuICAgICAgICB0aGlzLl9lbGFwc2VkID0gc3RhcnQ7XG4gICAgICAgIHRoaXMuX3NvdXJjZS5vbmVuZGVkID0gdGhpcy5fb25Db21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9zb3VyY2Uuc3RhcnQoMCwgc3RhcnQsIChlbmQgPyBlbmQgLSBzdGFydCA6IHVuZGVmaW5lZCkpO1xuICAgICAgICB0aGlzLmVtaXQoXCJzdGFydFwiKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlKHRydWUpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIFNvdW5kSW5zdGFuY2UucHJvdG90eXBlLl90b1NlYyA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIGlmICh0aW1lID4gMTApIHtcbiAgICAgICAgICAgIHRpbWUgLz0gMTAwMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZSB8fCAwO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kSW5zdGFuY2UucHJvdG90eXBlLCBcIl9lbmFibGVkXCIsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZW5hYmxlZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5ub2Rlcy5zY3JpcHQub25hdWRpb3Byb2Nlc3MgPSAhZW5hYmxlZCA/IG51bGwgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kSW5zdGFuY2UucHJvdG90eXBlLCBcInByb2dyZXNzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3M7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZEluc3RhbmNlLnByb3RvdHlwZSwgXCJwYXVzZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXVzZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHBhdXNlZCkge1xuICAgICAgICAgICAgaWYgKHBhdXNlZCAhPT0gdGhpcy5fcGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF1c2VkID0gcGF1c2VkO1xuICAgICAgICAgICAgICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxTdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInBhdXNlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInJlc3VtZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSh0aGlzLl9lbGFwc2VkICUgdGhpcy5fZHVyYXRpb24sIHRoaXMuX2VuZCwgdGhpcy5fc3BlZWQsIHRoaXMuX2xvb3AsIHRoaXMuX2ZhZGVJbiwgdGhpcy5fZmFkZU91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInBhdXNlXCIsIHBhdXNlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFNvdW5kSW5zdGFuY2UucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuX2ludGVybmFsU3RvcCgpO1xuICAgICAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuX2VuZCA9IDA7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZmFkZUluID0gMDtcbiAgICAgICAgdGhpcy5fZmFkZU91dCA9IDA7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoU291bmRJbnN0YW5jZS5fcG9vbC5pbmRleE9mKHRoaXMpIDwgMCkge1xuICAgICAgICAgICAgU291bmRJbnN0YW5jZS5fcG9vbC5wdXNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTb3VuZEluc3RhbmNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiW1NvdW5kSW5zdGFuY2UgaWQ9XCIgKyB0aGlzLmlkICsgXCJdXCI7XG4gICAgfTtcbiAgICBTb3VuZEluc3RhbmNlLnByb3RvdHlwZS5fbm93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmNvbnRleHQuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuICAgIH07XG4gICAgU291bmRJbnN0YW5jZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIChmb3JjZSkge1xuICAgICAgICBpZiAoZm9yY2UgPT09IHZvaWQgMCkgeyBmb3JjZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcbiAgICAgICAgICAgIHZhciBub3cgPSB0aGlzLl9ub3coKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoaXMuX2xhc3RVcGRhdGU7XG4gICAgICAgICAgICBpZiAoZGVsdGEgPiAwIHx8IGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0VXBkYXRlID0gbm93O1xuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9ICgodGhpcy5fZWxhcHNlZCAqIHRoaXMuX3NwZWVkKSAlIGR1cmF0aW9uKSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mYWRlSW4gfHwgdGhpcy5fZmFkZU91dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBwcm9ncmVzcyAqIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ2FpbiA9IHRoaXMuX3BhcmVudC5ub2Rlcy5nYWluLmdhaW47XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhWb2x1bWUgPSB0aGlzLl9wYXJlbnQudm9sdW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmFkZUluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gdGhpcy5fZmFkZUluICYmIHByb2dyZXNzIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhaW4udmFsdWUgPSBtYXhWb2x1bWUgKiAocG9zaXRpb24gLyB0aGlzLl9mYWRlSW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2Fpbi52YWx1ZSA9IG1heFZvbHVtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9mYWRlSW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mYWRlT3V0ICYmIHBvc2l0aW9uID49IGR1cmF0aW9uIC0gdGhpcy5fZmFkZU91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAoZHVyYXRpb24gLSBwb3NpdGlvbikgLyB0aGlzLl9mYWRlT3V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2Fpbi52YWx1ZSA9IG1heFZvbHVtZSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLCB0aGlzLl9wcm9ncmVzcywgZHVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTb3VuZEluc3RhbmNlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIH07XG4gICAgU291bmRJbnN0YW5jZS5wcm90b3R5cGUuX2ludGVybmFsU3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fc291cmNlLm9uZW5kZWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc291cmNlLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQudm9sdW1lID0gdGhpcy5fcGFyZW50LnZvbHVtZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU291bmRJbnN0YW5jZS5wcm90b3R5cGUuX29uQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5vbmVuZGVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9wcm9ncmVzcyA9IDE7XG4gICAgICAgIHRoaXMuZW1pdChcInByb2dyZXNzXCIsIDEsIHRoaXMuX2R1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiZW5kXCIsIHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kSW5zdGFuY2U7XG59KFBJWEkudXRpbHMuRXZlbnRFbWl0dGVyKSk7XG5Tb3VuZEluc3RhbmNlLl9wb29sID0gW107XG5leHBvcnRzLmRlZmF1bHQgPSBTb3VuZEluc3RhbmNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U291bmRJbnN0YW5jZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGaWx0ZXJhYmxlXzEgPSByZXF1aXJlKFwiLi9GaWx0ZXJhYmxlXCIpO1xudmFyIGZpbHRlcnMgPSByZXF1aXJlKFwiLi9maWx0ZXJzXCIpO1xudmFyIFNvdW5kXzEgPSByZXF1aXJlKFwiLi9Tb3VuZFwiKTtcbnZhciBTb3VuZENvbnRleHRfMSA9IHJlcXVpcmUoXCIuL1NvdW5kQ29udGV4dFwiKTtcbnZhciBTb3VuZEluc3RhbmNlXzEgPSByZXF1aXJlKFwiLi9Tb3VuZEluc3RhbmNlXCIpO1xudmFyIFNvdW5kU3ByaXRlXzEgPSByZXF1aXJlKFwiLi9Tb3VuZFNwcml0ZVwiKTtcbnZhciBTb3VuZFV0aWxzXzEgPSByZXF1aXJlKFwiLi9Tb3VuZFV0aWxzXCIpO1xudmFyIFNvdW5kTGlicmFyeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU291bmRMaWJyYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBuZXcgU291bmRDb250ZXh0XzEuZGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NvdW5kcyA9IHt9O1xuICAgICAgICB0aGlzLnV0aWxzID0gU291bmRVdGlsc18xLmRlZmF1bHQ7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgIHRoaXMuU291bmQgPSBTb3VuZF8xLmRlZmF1bHQ7XG4gICAgICAgIHRoaXMuU291bmRJbnN0YW5jZSA9IFNvdW5kSW5zdGFuY2VfMS5kZWZhdWx0O1xuICAgICAgICB0aGlzLlNvdW5kTGlicmFyeSA9IFNvdW5kTGlicmFyeTtcbiAgICAgICAgdGhpcy5Tb3VuZFNwcml0ZSA9IFNvdW5kU3ByaXRlXzEuZGVmYXVsdDtcbiAgICAgICAgdGhpcy5GaWx0ZXJhYmxlID0gRmlsdGVyYWJsZV8xLmRlZmF1bHQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZExpYnJhcnkucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRMaWJyYXJ5LnByb3RvdHlwZSwgXCJmaWx0ZXJzQWxsXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5maWx0ZXJzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChmaWx0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRMaWJyYXJ5LnByb3RvdHlwZSwgXCJzdXBwb3J0ZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBTb3VuZENvbnRleHRfMS5kZWZhdWx0LkF1ZGlvQ29udGV4dCAhPT0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU291bmRMaWJyYXJ5LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoc291cmNlLCBzb3VyY2VPcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgYWxpYXMgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKHNvdXJjZVthbGlhc10sIHNvdXJjZU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbYWxpYXNdID0gdGhpcy5hZGQoYWxpYXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNvdXJjZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY29uc29sZS5hc3NlcnQoIXRoaXMuX3NvdW5kc1tzb3VyY2VdLCBcIlNvdW5kIHdpdGggYWxpYXMgXCIgKyBzb3VyY2UgKyBcIiBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICAgICAgICBpZiAoc291cmNlT3B0aW9ucyBpbnN0YW5jZW9mIFNvdW5kXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kc1tzb3VyY2VdID0gc291cmNlT3B0aW9ucztcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlT3B0aW9ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9ucyhzb3VyY2VPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgc291bmQgPSBuZXcgU291bmRfMS5kZWZhdWx0KHRoaXMuY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRzW3NvdXJjZV0gPSBzb3VuZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc291bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNvdW5kTGlicmFyeS5wcm90b3R5cGUuX2dldE9wdGlvbnMgPSBmdW5jdGlvbiAoc291cmNlLCBvdmVycmlkZXMpIHtcbiAgICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBvcHRpb25zID0geyBzcmM6IHNvdXJjZSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBvcHRpb25zID0geyBzcmNCdWZmZXI6IHNvdXJjZSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihvcHRpb25zLCBvdmVycmlkZXMgfHwge30pO1xuICAgIH07XG4gICAgU291bmRMaWJyYXJ5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgdGhpcy5leGlzdHMoYWxpYXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9zb3VuZHNbYWxpYXNdLmRlc3Ryb3koKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3NvdW5kc1thbGlhc107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kTGlicmFyeS5wcm90b3R5cGUsIFwidm9sdW1lQWxsXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC52b2x1bWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZvbHVtZSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFNvdW5kTGlicmFyeS5wcm90b3R5cGUucGF1c2VBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTb3VuZExpYnJhcnkucHJvdG90eXBlLnJlc3VtZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTb3VuZExpYnJhcnkucHJvdG90eXBlLm11dGVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubXV0ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNvdW5kTGlicmFyeS5wcm90b3R5cGUudW5tdXRlQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm11dGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU291bmRMaWJyYXJ5LnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGFsaWFzIGluIHRoaXMuX3NvdW5kcykge1xuICAgICAgICAgICAgdGhpcy5fc291bmRzW2FsaWFzXS5kZXN0cm95KCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fc291bmRzW2FsaWFzXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNvdW5kTGlicmFyeS5wcm90b3R5cGUuc3RvcEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgYWxpYXMgaW4gdGhpcy5fc291bmRzKSB7XG4gICAgICAgICAgICB0aGlzLl9zb3VuZHNbYWxpYXNdLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNvdW5kTGlicmFyeS5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gKGFsaWFzLCBhc3NlcnQpIHtcbiAgICAgICAgaWYgKGFzc2VydCA9PT0gdm9pZCAwKSB7IGFzc2VydCA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBleGlzdHMgPSAhIXRoaXMuX3NvdW5kc1thbGlhc107XG4gICAgICAgIGlmIChhc3NlcnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KGV4aXN0cywgXCJObyBzb3VuZCBtYXRjaGluZyBhbGlhcyAnXCIgKyBhbGlhcyArIFwiJy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4aXN0cztcbiAgICB9O1xuICAgIFNvdW5kTGlicmFyeS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChhbGlhcykge1xuICAgICAgICB0aGlzLmV4aXN0cyhhbGlhcywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb3VuZHNbYWxpYXNdO1xuICAgIH07XG4gICAgU291bmRMaWJyYXJ5LnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKGFsaWFzLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQoYWxpYXMpLnBsYXkob3B0aW9ucyk7XG4gICAgfTtcbiAgICBTb3VuZExpYnJhcnkucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZChhbGlhcykuc3RvcCgpO1xuICAgIH07XG4gICAgU291bmRMaWJyYXJ5LnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChhbGlhcykge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKGFsaWFzKS5wYXVzZSgpO1xuICAgIH07XG4gICAgU291bmRMaWJyYXJ5LnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZChhbGlhcykucmVzdW1lKCk7XG4gICAgfTtcbiAgICBTb3VuZExpYnJhcnkucHJvdG90eXBlLnZvbHVtZSA9IGZ1bmN0aW9uIChhbGlhcywgdm9sdW1lKSB7XG4gICAgICAgIHZhciBzb3VuZCA9IHRoaXMuZmluZChhbGlhcyk7XG4gICAgICAgIGlmICh2b2x1bWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc291bmQudm9sdW1lID0gdm9sdW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3VuZC52b2x1bWU7XG4gICAgfTtcbiAgICBTb3VuZExpYnJhcnkucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24gKGFsaWFzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQoYWxpYXMpLmR1cmF0aW9uO1xuICAgIH07XG4gICAgU291bmRMaWJyYXJ5LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuICAgICAgICB0aGlzLl9zb3VuZHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBTb3VuZExpYnJhcnk7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gU291bmRMaWJyYXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U291bmRMaWJyYXJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRmlsdGVyYWJsZV8xID0gcmVxdWlyZShcIi4vRmlsdGVyYWJsZVwiKTtcbnZhciBTb3VuZE5vZGVzID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU291bmROb2RlcywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTb3VuZE5vZGVzKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGF1ZGlvQ29udGV4dCA9IGNvbnRleHQuYXVkaW9Db250ZXh0O1xuICAgICAgICB2YXIgYnVmZmVyU291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICB2YXIgc2NyaXB0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcihTb3VuZE5vZGVzLkJVRkZFUl9TSVpFKTtcbiAgICAgICAgdmFyIGdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgICAgICB2YXIgYW5hbHlzZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICAgICAgYnVmZmVyU291cmNlLmNvbm5lY3QoYW5hbHlzZXIpO1xuICAgICAgICBhbmFseXNlci5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICAgIHNjcmlwdC5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGFuYWx5c2VyLCBnYWluKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgX3RoaXMuYnVmZmVyU291cmNlID0gYnVmZmVyU291cmNlO1xuICAgICAgICBfdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG4gICAgICAgIF90aGlzLmdhaW4gPSBnYWluO1xuICAgICAgICBfdGhpcy5hbmFseXNlciA9IGFuYWx5c2VyO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNvdW5kTm9kZXMucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1ZmZlclNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuc2NyaXB0LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5nYWluLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5hbmFseXNlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuYnVmZmVyU291cmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICAgICAgICB0aGlzLmdhaW4gPSBudWxsO1xuICAgICAgICB0aGlzLmFuYWx5c2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB9O1xuICAgIFNvdW5kTm9kZXMucHJvdG90eXBlLmNsb25lQnVmZmVyU291cmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3JpZyA9IHRoaXMuYnVmZmVyU291cmNlO1xuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLmNvbnRleHQuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBjbG9uZS5idWZmZXIgPSBvcmlnLmJ1ZmZlcjtcbiAgICAgICAgY2xvbmUucGxheWJhY2tSYXRlLnZhbHVlID0gb3JpZy5wbGF5YmFja1JhdGUudmFsdWU7XG4gICAgICAgIGNsb25lLmxvb3AgPSBvcmlnLmxvb3A7XG4gICAgICAgIGNsb25lLmNvbm5lY3QodGhpcy5kZXN0aW5hdGlvbik7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9O1xuICAgIHJldHVybiBTb3VuZE5vZGVzO1xufShGaWx0ZXJhYmxlXzEuZGVmYXVsdCkpO1xuU291bmROb2Rlcy5CVUZGRVJfU0laRSA9IDI1NjtcbmV4cG9ydHMuZGVmYXVsdCA9IFNvdW5kTm9kZXM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Tb3VuZE5vZGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFNvdW5kU3ByaXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTb3VuZFNwcml0ZShwYXJlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSB0aGlzLmVuZCAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuZHVyYXRpb24gPiAwLCBcIkVuZCB0aW1lIG11c3QgYmUgYWZ0ZXIgc3RhcnQgdGltZVwiKTtcbiAgICB9XG4gICAgU291bmRTcHJpdGUucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LnBsYXkoT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBjb21wbGV0ZTogY29tcGxldGUsXG4gICAgICAgICAgICBzcGVlZDogdGhpcy5zcGVlZCB8fCB0aGlzLnBhcmVudC5zcGVlZCxcbiAgICAgICAgICAgIGVuZDogdGhpcy5lbmQsXG4gICAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgU291bmRTcHJpdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBTb3VuZFNwcml0ZTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTb3VuZFNwcml0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNvdW5kU3ByaXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV1aWQgPSByZXF1aXJlKFwidXVpZC92NFwiKTtcbnZhciBpbmRleF8xID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XG52YXIgU291bmRfMSA9IHJlcXVpcmUoXCIuL1NvdW5kXCIpO1xudmFyIFNvdW5kVXRpbHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNvdW5kVXRpbHMoKSB7XG4gICAgfVxuICAgIFNvdW5kVXRpbHMuc2luZVRvbmUgPSBmdW5jdGlvbiAoaGVydHosIHNlY29uZHMpIHtcbiAgICAgICAgaWYgKGhlcnR6ID09PSB2b2lkIDApIHsgaGVydHogPSAyMDA7IH1cbiAgICAgICAgaWYgKHNlY29uZHMgPT09IHZvaWQgMCkgeyBzZWNvbmRzID0gMTsgfVxuICAgICAgICB2YXIgc291bmRDb250ZXh0ID0gaW5kZXhfMS5kZWZhdWx0LmNvbnRleHQ7XG4gICAgICAgIHZhciBzb3VuZEluc3RhbmNlID0gbmV3IFNvdW5kXzEuZGVmYXVsdChzb3VuZENvbnRleHQsIHtcbiAgICAgICAgICAgIHNpbmdsZUluc3RhbmNlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG5DaGFubmVscyA9IDE7XG4gICAgICAgIHZhciBzYW1wbGVSYXRlID0gNDgwMDA7XG4gICAgICAgIHZhciBhbXBsaXR1ZGUgPSAyO1xuICAgICAgICB2YXIgYnVmZmVyID0gc291bmRDb250ZXh0LmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIobkNoYW5uZWxzLCBzZWNvbmRzICogc2FtcGxlUmF0ZSwgc2FtcGxlUmF0ZSk7XG4gICAgICAgIHZhciBmQXJyYXkgPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdGltZSA9IGkgLyBidWZmZXIuc2FtcGxlUmF0ZTtcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IGhlcnR6ICogdGltZSAqIE1hdGguUEk7XG4gICAgICAgICAgICBmQXJyYXlbaV0gPSBNYXRoLnNpbihhbmdsZSkgKiBhbXBsaXR1ZGU7XG4gICAgICAgIH1cbiAgICAgICAgc291bmRJbnN0YW5jZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIHNvdW5kSW5zdGFuY2UuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gc291bmRJbnN0YW5jZTtcbiAgICB9O1xuICAgIFNvdW5kVXRpbHMucmVuZGVyID0gZnVuY3Rpb24gKHNvdW5kLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHdpZHRoOiA1MTIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEyOCxcbiAgICAgICAgICAgIGZpbGw6IFwiYmxhY2tcIixcbiAgICAgICAgfSwgb3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KCEhc291bmQuYnVmZmVyLCBcIk5vIGJ1ZmZlciBmb3VuZCwgbG9hZCBmaXJzdFwiKTtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IG9wdGlvbnMuZmlsbDtcbiAgICAgICAgdmFyIGRhdGEgPSBzb3VuZC5idWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgICAgIHZhciBzdGVwID0gTWF0aC5jZWlsKGRhdGEubGVuZ3RoIC8gb3B0aW9ucy53aWR0aCk7XG4gICAgICAgIHZhciBhbXAgPSBvcHRpb25zLmhlaWdodCAvIDI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy53aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWluID0gMS4wO1xuICAgICAgICAgICAgdmFyIG1heCA9IC0xLjA7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0ZXA7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBkYXR1bSA9IGRhdGFbKGkgKiBzdGVwKSArIGpdO1xuICAgICAgICAgICAgICAgIGlmIChkYXR1bSA8IG1pbikge1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSBkYXR1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdHVtID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IGRhdHVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoaSwgKDEgKyBtaW4pICogYW1wLCAxLCBNYXRoLm1heCgxLCAobWF4IC0gbWluKSAqIGFtcCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQSVhJLkJhc2VUZXh0dXJlLmZyb21DYW52YXMoY2FudmFzKTtcbiAgICB9O1xuICAgIFNvdW5kVXRpbHMucGxheU9uY2UgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgYWxpYXMgPSB1dWlkKCk7XG4gICAgICAgIGluZGV4XzEuZGVmYXVsdC5hZGQoYWxpYXMsIHtcbiAgICAgICAgICAgIHNyYzogc3JjLFxuICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9QbGF5OiB0cnVlLFxuICAgICAgICAgICAgbG9hZGVkOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4XzEuZGVmYXVsdC5yZW1vdmUoYWxpYXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpbmRleF8xLmRlZmF1bHQucmVtb3ZlKGFsaWFzKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhbGlhcztcbiAgICB9O1xuICAgIHJldHVybiBTb3VuZFV0aWxzO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFNvdW5kVXRpbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Tb3VuZFV0aWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFNvdW5kXzEgPSByZXF1aXJlKFwiLi9Tb3VuZFwiKTtcbnZhciBTb3VuZExpYnJhcnlfMSA9IHJlcXVpcmUoXCIuL1NvdW5kTGlicmFyeVwiKTtcbnZhciBTb3VuZExpYnJhcnlQcm90b3R5cGUgPSBTb3VuZExpYnJhcnlfMS5kZWZhdWx0LnByb3RvdHlwZTtcbnZhciBTb3VuZFByb3RvdHlwZSA9IFNvdW5kXzEuZGVmYXVsdC5wcm90b3R5cGU7XG5Tb3VuZExpYnJhcnlQcm90b3R5cGUuc291bmQgPSBmdW5jdGlvbiBzb3VuZChhbGlhcykge1xuICAgIGNvbnNvbGUud2FybihcIlBJWEkuc291bmQuc291bmQgaXMgZGVwcmVjYXRlZCwgdXNlIFBJWEkuc291bmQuZmluZFwiKTtcbiAgICByZXR1cm4gdGhpcy5maW5kKGFsaWFzKTtcbn07XG5Tb3VuZExpYnJhcnlQcm90b3R5cGUucGFubmluZyA9IGZ1bmN0aW9uIHBhbm5pbmcoYWxpYXMsIHBhbm5pbmdWYWx1ZSkge1xuICAgIGNvbnNvbGUud2FybihcIlBJWEkuc291bmQucGFubmluZyBpcyBkZXByZWNhdGVkLCB1c2UgUElYSS5zb3VuZC5maWx0ZXJzLlN0ZXJlb1BhblwiKTtcbiAgICByZXR1cm4gMDtcbn07XG5Tb3VuZExpYnJhcnlQcm90b3R5cGUuYWRkTWFwID0gZnVuY3Rpb24gYWRkTWFwKG1hcCwgZ2xvYmFsT3B0aW9ucykge1xuICAgIGNvbnNvbGUud2FybihcIlBJWEkuc291bmQuYWRkTWFwIGlzIGRlcHJlY2F0ZWQsIHVzZSBQSVhJLnNvdW5kLmFkZFwiKTtcbiAgICByZXR1cm4gdGhpcy5hZGQobWFwLCBnbG9iYWxPcHRpb25zKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRMaWJyYXJ5UHJvdG90eXBlLCBcIlNvdW5kVXRpbHNcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJQSVhJLnNvdW5kLlNvdW5kVXRpbHMgaXMgZGVwcmVjYXRlZCwgdXNlIFBJWEkuc291bmQudXRpbHNcIik7XG4gICAgICAgIHJldHVybiB0aGlzLnV0aWxzO1xuICAgIH0sXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VuZFByb3RvdHlwZSwgXCJibG9ja1wiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlBJWEkuc291bmQuU291bmQucHJvdG90eXBlLmJsb2NrIGlzIGRlcHJlY2F0ZWQsIHVzZSBzaW5nbGVJbnN0YW5jZSBpbnN0ZWFkXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5zaW5nbGVJbnN0YW5jZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlBJWEkuc291bmQuU291bmQucHJvdG90eXBlLmJsb2NrIGlzIGRlcHJlY2F0ZWQsIHVzZSBzaW5nbGVJbnN0YW5jZSBpbnN0ZWFkXCIpO1xuICAgICAgICB0aGlzLnNpbmdsZUluc3RhbmNlID0gdmFsdWU7XG4gICAgfSxcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdW5kUHJvdG90eXBlLCBcImxvYWRlZFwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlBJWEkuc291bmQuU291bmQucHJvdG90eXBlLmxvYWRlZCBpcyBkZXByZWNhdGVkLCB1c2UgY29uc3RydWN0b3Igb3B0aW9uIGluc3RlYWRcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiUElYSS5zb3VuZC5Tb3VuZC5wcm90b3R5cGUubG9hZGVkIGlzIGRlcHJlY2F0ZWQsIHVzZSBjb25zdHJ1Y3RvciBvcHRpb24gaW5zdGVhZFwiKTtcbiAgICB9LFxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU291bmRQcm90b3R5cGUsIFwiY29tcGxldGVcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJQSVhJLnNvdW5kLlNvdW5kLnByb3RvdHlwZS5jb21wbGV0ZSBpcyBkZXByZWNhdGVkLCB1c2UgY29uc3RydWN0b3Igb3B0aW9uIGluc3RlYWRcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiUElYSS5zb3VuZC5Tb3VuZC5wcm90b3R5cGUuY29tcGxldGUgaXMgZGVwcmVjYXRlZCwgdXNlIGNvbnN0cnVjdG9yIG9wdGlvbiBpbnN0ZWFkXCIpO1xuICAgIH0sXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlcHJlY2F0aW9ucy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEZpbHRlcl8xID0gcmVxdWlyZShcIi4vRmlsdGVyXCIpO1xudmFyIGluZGV4XzEgPSByZXF1aXJlKFwiLi4vaW5kZXhcIik7XG52YXIgRGlzdG9ydGlvbkZpbHRlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERpc3RvcnRpb25GaWx0ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRGlzdG9ydGlvbkZpbHRlcihhbW91bnQpIHtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDA7IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGRpc3RvcnRpb24gPSBpbmRleF8xLmRlZmF1bHQuY29udGV4dC5hdWRpb0NvbnRleHQuY3JlYXRlV2F2ZVNoYXBlcigpO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRpc3RvcnRpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9kaXN0b3J0aW9uID0gZGlzdG9ydGlvbjtcbiAgICAgICAgX3RoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaXN0b3J0aW9uRmlsdGVyLnByb3RvdHlwZSwgXCJhbW91bnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbW91bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZSAqPSAxMDAwO1xuICAgICAgICAgICAgdGhpcy5fYW1vdW50ID0gdmFsdWU7XG4gICAgICAgICAgICB2YXIgc2FtcGxlcyA9IDQ0MTAwO1xuICAgICAgICAgICAgdmFyIGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheShzYW1wbGVzKTtcbiAgICAgICAgICAgIHZhciBkZWcgPSBNYXRoLlBJIC8gMTgwO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgdmFyIHg7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IHNhbXBsZXM7ICsraSkge1xuICAgICAgICAgICAgICAgIHggPSBpICogMiAvIHNhbXBsZXMgLSAxO1xuICAgICAgICAgICAgICAgIGN1cnZlW2ldID0gKDMgKyB2YWx1ZSkgKiB4ICogMjAgKiBkZWcgLyAoTWF0aC5QSSArIHZhbHVlICogTWF0aC5hYnMoeCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGlzdG9ydGlvbi5jdXJ2ZSA9IGN1cnZlO1xuICAgICAgICAgICAgdGhpcy5fZGlzdG9ydGlvbi5vdmVyc2FtcGxlID0gJzR4JztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgRGlzdG9ydGlvbkZpbHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZGlzdG9ydGlvbiA9IG51bGw7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIERpc3RvcnRpb25GaWx0ZXI7XG59KEZpbHRlcl8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IERpc3RvcnRpb25GaWx0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXN0b3J0aW9uRmlsdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRmlsdGVyXzEgPSByZXF1aXJlKFwiLi9GaWx0ZXJcIik7XG52YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCIuLi9pbmRleFwiKTtcbnZhciBFcXVhbGl6ZXJGaWx0ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFcXVhbGl6ZXJGaWx0ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRXF1YWxpemVyRmlsdGVyKGYzMiwgZjY0LCBmMTI1LCBmMjUwLCBmNTAwLCBmMWssIGYyaywgZjRrLCBmOGssIGYxNmspIHtcbiAgICAgICAgaWYgKGYzMiA9PT0gdm9pZCAwKSB7IGYzMiA9IDA7IH1cbiAgICAgICAgaWYgKGY2NCA9PT0gdm9pZCAwKSB7IGY2NCA9IDA7IH1cbiAgICAgICAgaWYgKGYxMjUgPT09IHZvaWQgMCkgeyBmMTI1ID0gMDsgfVxuICAgICAgICBpZiAoZjI1MCA9PT0gdm9pZCAwKSB7IGYyNTAgPSAwOyB9XG4gICAgICAgIGlmIChmNTAwID09PSB2b2lkIDApIHsgZjUwMCA9IDA7IH1cbiAgICAgICAgaWYgKGYxayA9PT0gdm9pZCAwKSB7IGYxayA9IDA7IH1cbiAgICAgICAgaWYgKGYyayA9PT0gdm9pZCAwKSB7IGYyayA9IDA7IH1cbiAgICAgICAgaWYgKGY0ayA9PT0gdm9pZCAwKSB7IGY0ayA9IDA7IH1cbiAgICAgICAgaWYgKGY4ayA9PT0gdm9pZCAwKSB7IGY4ayA9IDA7IH1cbiAgICAgICAgaWYgKGYxNmsgPT09IHZvaWQgMCkgeyBmMTZrID0gMDsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZXF1YWxpemVyQmFuZHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZjogRXF1YWxpemVyRmlsdGVyLkYzMixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbG93c2hlbGYnLFxuICAgICAgICAgICAgICAgIGdhaW46IGYzMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmOiBFcXVhbGl6ZXJGaWx0ZXIuRjY0LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwZWFraW5nJyxcbiAgICAgICAgICAgICAgICBnYWluOiBmNjRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZjogRXF1YWxpemVyRmlsdGVyLkYxMjUsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BlYWtpbmcnLFxuICAgICAgICAgICAgICAgIGdhaW46IGYxMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZjogRXF1YWxpemVyRmlsdGVyLkYyNTAsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BlYWtpbmcnLFxuICAgICAgICAgICAgICAgIGdhaW46IGYyNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZjogRXF1YWxpemVyRmlsdGVyLkY1MDAsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BlYWtpbmcnLFxuICAgICAgICAgICAgICAgIGdhaW46IGY1MDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZjogRXF1YWxpemVyRmlsdGVyLkYxSyxcbiAgICAgICAgICAgICAgICB0eXBlOiAncGVha2luZycsXG4gICAgICAgICAgICAgICAgZ2FpbjogZjFrXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGY6IEVxdWFsaXplckZpbHRlci5GMkssXG4gICAgICAgICAgICAgICAgdHlwZTogJ3BlYWtpbmcnLFxuICAgICAgICAgICAgICAgIGdhaW46IGYya1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmOiBFcXVhbGl6ZXJGaWx0ZXIuRjRLLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwZWFraW5nJyxcbiAgICAgICAgICAgICAgICBnYWluOiBmNGtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZjogRXF1YWxpemVyRmlsdGVyLkY4SyxcbiAgICAgICAgICAgICAgICB0eXBlOiAncGVha2luZycsXG4gICAgICAgICAgICAgICAgZ2FpbjogZjhrXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGY6IEVxdWFsaXplckZpbHRlci5GMTZLLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdoaWdoc2hlbGYnLFxuICAgICAgICAgICAgICAgIGdhaW46IGYxNmtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGJhbmRzID0gZXF1YWxpemVyQmFuZHMubWFwKGZ1bmN0aW9uIChiYW5kKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gaW5kZXhfMS5kZWZhdWx0LmNvbnRleHQuYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgICAgICAgICAgZmlsdGVyLnR5cGUgPSBiYW5kLnR5cGU7XG4gICAgICAgICAgICBmaWx0ZXIuZ2Fpbi52YWx1ZSA9IGJhbmQuZ2FpbjtcbiAgICAgICAgICAgIGZpbHRlci5RLnZhbHVlID0gMTtcbiAgICAgICAgICAgIGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSBiYW5kLmY7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICB9KTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBiYW5kc1swXSwgYmFuZHNbYmFuZHMubGVuZ3RoIC0gMV0pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmJhbmRzID0gYmFuZHM7XG4gICAgICAgIF90aGlzLmJhbmRzTWFwID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3RoaXMuYmFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gX3RoaXMuYmFuZHNbaV07XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5iYW5kc1tpIC0gMV0uY29ubmVjdChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmJhbmRzTWFwW25vZGUuZnJlcXVlbmN5LnZhbHVlXSA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBFcXVhbGl6ZXJGaWx0ZXIucHJvdG90eXBlLnNldEdhaW4gPSBmdW5jdGlvbiAoZnJlcXVlbmN5LCBnYWluKSB7XG4gICAgICAgIGlmIChnYWluID09PSB2b2lkIDApIHsgZ2FpbiA9IDA7IH1cbiAgICAgICAgaWYgKCF0aGlzLmJhbmRzTWFwW2ZyZXF1ZW5jeV0pIHtcbiAgICAgICAgICAgIHRocm93ICdObyBiYW5kIGZvdW5kIGZvciBmcmVxdWVuY3kgJyArIGZyZXF1ZW5jeTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJhbmRzTWFwW2ZyZXF1ZW5jeV0uZ2Fpbi52YWx1ZSA9IGdhaW47XG4gICAgfTtcbiAgICBFcXVhbGl6ZXJGaWx0ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJhbmRzLmZvckVhY2goZnVuY3Rpb24gKGJhbmQpIHtcbiAgICAgICAgICAgIGJhbmQuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXF1YWxpemVyRmlsdGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJhbmRzLmZvckVhY2goZnVuY3Rpb24gKGJhbmQpIHtcbiAgICAgICAgICAgIGJhbmQuZGlzY29ubmVjdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iYW5kcyA9IG51bGw7XG4gICAgICAgIHRoaXMuYmFuZHNNYXAgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIEVxdWFsaXplckZpbHRlcjtcbn0oRmlsdGVyXzEuZGVmYXVsdCkpO1xuRXF1YWxpemVyRmlsdGVyLkYzMiA9IDMyO1xuRXF1YWxpemVyRmlsdGVyLkY2NCA9IDY0O1xuRXF1YWxpemVyRmlsdGVyLkYxMjUgPSAxMjU7XG5FcXVhbGl6ZXJGaWx0ZXIuRjI1MCA9IDI1MDtcbkVxdWFsaXplckZpbHRlci5GNTAwID0gNTAwO1xuRXF1YWxpemVyRmlsdGVyLkYxSyA9IDEwMDA7XG5FcXVhbGl6ZXJGaWx0ZXIuRjJLID0gMjAwMDtcbkVxdWFsaXplckZpbHRlci5GNEsgPSA0MDAwO1xuRXF1YWxpemVyRmlsdGVyLkY4SyA9IDgwMDA7XG5FcXVhbGl6ZXJGaWx0ZXIuRjE2SyA9IDE2MDAwO1xuZXhwb3J0cy5kZWZhdWx0ID0gRXF1YWxpemVyRmlsdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXF1YWxpemVyRmlsdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEZpbHRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmlsdGVyKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZSB8fCBkZXN0aW5hdGlvbjtcbiAgICB9XG4gICAgRmlsdGVyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QoZGVzdGluYXRpb24pO1xuICAgIH07XG4gICAgRmlsdGVyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgICBGaWx0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIEZpbHRlcjtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGaWx0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWx0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGaWx0ZXJfMSA9IHJlcXVpcmUoXCIuL0ZpbHRlclwiKTtcbnZhciBpbmRleF8xID0gcmVxdWlyZShcIi4uL2luZGV4XCIpO1xudmFyIFJldmVyYkZpbHRlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJldmVyYkZpbHRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZXZlcmJGaWx0ZXIoc2Vjb25kcywgZGVjYXksIHJldmVyc2UpIHtcbiAgICAgICAgaWYgKHNlY29uZHMgPT09IHZvaWQgMCkgeyBzZWNvbmRzID0gMzsgfVxuICAgICAgICBpZiAoZGVjYXkgPT09IHZvaWQgMCkgeyBkZWNheSA9IDI7IH1cbiAgICAgICAgaWYgKHJldmVyc2UgPT09IHZvaWQgMCkgeyByZXZlcnNlID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNvbnZvbHZlciA9IGluZGV4XzEuZGVmYXVsdC5jb250ZXh0LmF1ZGlvQ29udGV4dC5jcmVhdGVDb252b2x2ZXIoKTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb252b2x2ZXIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9jb252b2x2ZXIgPSBjb252b2x2ZXI7XG4gICAgICAgIF90aGlzLl9zZWNvbmRzID0gX3RoaXMuX2NsYW1wKHNlY29uZHMsIDEsIDUwKTtcbiAgICAgICAgX3RoaXMuX2RlY2F5ID0gX3RoaXMuX2NsYW1wKGRlY2F5LCAwLCAxMDApO1xuICAgICAgICBfdGhpcy5fcmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgICAgIF90aGlzLl9yZWJ1aWxkKCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUmV2ZXJiRmlsdGVyLnByb3RvdHlwZS5fY2xhbXAgPSBmdW5jdGlvbiAodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZXZlcmJGaWx0ZXIucHJvdG90eXBlLCBcInNlY29uZHNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWNvbmRzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzZWNvbmRzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWNvbmRzID0gdGhpcy5fY2xhbXAoc2Vjb25kcywgMSwgNTApO1xuICAgICAgICAgICAgdGhpcy5fcmVidWlsZCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmV2ZXJiRmlsdGVyLnByb3RvdHlwZSwgXCJkZWNheVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlY2F5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkZWNheSkge1xuICAgICAgICAgICAgdGhpcy5fZGVjYXkgPSB0aGlzLl9jbGFtcChkZWNheSwgMCwgMTAwKTtcbiAgICAgICAgICAgIHRoaXMuX3JlYnVpbGQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJldmVyYkZpbHRlci5wcm90b3R5cGUsIFwicmV2ZXJzZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JldmVyc2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHJldmVyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3JldmVyc2UgPSByZXZlcnNlO1xuICAgICAgICAgICAgdGhpcy5fcmVidWlsZCgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBSZXZlcmJGaWx0ZXIucHJvdG90eXBlLl9yZWJ1aWxkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IGluZGV4XzEuZGVmYXVsdC5jb250ZXh0LmF1ZGlvQ29udGV4dDtcbiAgICAgICAgdmFyIHJhdGUgPSBjb250ZXh0LnNhbXBsZVJhdGU7XG4gICAgICAgIHZhciBsZW5ndGggPSByYXRlICogdGhpcy5fc2Vjb25kcztcbiAgICAgICAgdmFyIGltcHVsc2UgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlcigyLCBsZW5ndGgsIHJhdGUpO1xuICAgICAgICB2YXIgaW1wdWxzZUwgPSBpbXB1bHNlLmdldENoYW5uZWxEYXRhKDApO1xuICAgICAgICB2YXIgaW1wdWxzZVIgPSBpbXB1bHNlLmdldENoYW5uZWxEYXRhKDEpO1xuICAgICAgICB2YXIgbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbiA9IHRoaXMuX3JldmVyc2UgPyBsZW5ndGggLSBpIDogaTtcbiAgICAgICAgICAgIGltcHVsc2VMW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgKiBNYXRoLnBvdygxIC0gbiAvIGxlbmd0aCwgdGhpcy5fZGVjYXkpO1xuICAgICAgICAgICAgaW1wdWxzZVJbaV0gPSAoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIE1hdGgucG93KDEgLSBuIC8gbGVuZ3RoLCB0aGlzLl9kZWNheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udm9sdmVyLmJ1ZmZlciA9IGltcHVsc2U7XG4gICAgfTtcbiAgICBSZXZlcmJGaWx0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnZvbHZlciA9IG51bGw7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIFJldmVyYkZpbHRlcjtcbn0oRmlsdGVyXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUmV2ZXJiRmlsdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmV2ZXJiRmlsdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRmlsdGVyXzEgPSByZXF1aXJlKFwiLi9GaWx0ZXJcIik7XG52YXIgaW5kZXhfMSA9IHJlcXVpcmUoXCIuLi9pbmRleFwiKTtcbnZhciBTdGVyZW9GaWx0ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdGVyZW9GaWx0ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3RlcmVvRmlsdGVyKHBhbikge1xuICAgICAgICBpZiAocGFuID09PSB2b2lkIDApIHsgcGFuID0gMDsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc3RlcmVvO1xuICAgICAgICB2YXIgcGFubmVyO1xuICAgICAgICB2YXIgZGVzdGluYXRpb247XG4gICAgICAgIHZhciBhdWRpb0NvbnRleHQgPSBpbmRleF8xLmRlZmF1bHQuY29udGV4dC5hdWRpb0NvbnRleHQ7XG4gICAgICAgIGlmIChhdWRpb0NvbnRleHQuY3JlYXRlU3RlcmVvUGFubmVyKSB7XG4gICAgICAgICAgICBzdGVyZW8gPSBhdWRpb0NvbnRleHQuY3JlYXRlU3RlcmVvUGFubmVyKCk7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IHN0ZXJlbztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhbm5lciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVQYW5uZXIoKTtcbiAgICAgICAgICAgIHBhbm5lci5wYW5uaW5nTW9kZWwgPSAnZXF1YWxwb3dlcic7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IHBhbm5lcjtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fc3RlcmVvID0gc3RlcmVvO1xuICAgICAgICBfdGhpcy5fcGFubmVyID0gcGFubmVyO1xuICAgICAgICBfdGhpcy5wYW4gPSBwYW47XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0ZXJlb0ZpbHRlci5wcm90b3R5cGUsIFwicGFuXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcGFuID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RlcmVvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RlcmVvLnBhbi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFubmVyLnNldFBvc2l0aW9uKHZhbHVlLCAwLCAxIC0gTWF0aC5hYnModmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU3RlcmVvRmlsdGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3RlcmVvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFubmVyID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBTdGVyZW9GaWx0ZXI7XG59KEZpbHRlcl8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFN0ZXJlb0ZpbHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0ZXJlb0ZpbHRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGaWx0ZXJfMSA9IHJlcXVpcmUoXCIuL0ZpbHRlclwiKTtcbmV4cG9ydHMuRmlsdGVyID0gRmlsdGVyXzEuZGVmYXVsdDtcbnZhciBFcXVhbGl6ZXJGaWx0ZXJfMSA9IHJlcXVpcmUoXCIuL0VxdWFsaXplckZpbHRlclwiKTtcbmV4cG9ydHMuRXF1YWxpemVyRmlsdGVyID0gRXF1YWxpemVyRmlsdGVyXzEuZGVmYXVsdDtcbnZhciBEaXN0b3J0aW9uRmlsdGVyXzEgPSByZXF1aXJlKFwiLi9EaXN0b3J0aW9uRmlsdGVyXCIpO1xuZXhwb3J0cy5EaXN0b3J0aW9uRmlsdGVyID0gRGlzdG9ydGlvbkZpbHRlcl8xLmRlZmF1bHQ7XG52YXIgU3RlcmVvRmlsdGVyXzEgPSByZXF1aXJlKFwiLi9TdGVyZW9GaWx0ZXJcIik7XG5leHBvcnRzLlN0ZXJlb0ZpbHRlciA9IFN0ZXJlb0ZpbHRlcl8xLmRlZmF1bHQ7XG52YXIgUmV2ZXJiRmlsdGVyXzEgPSByZXF1aXJlKFwiLi9SZXZlcmJGaWx0ZXJcIik7XG5leHBvcnRzLlJldmVyYkZpbHRlciA9IFJldmVyYkZpbHRlcl8xLmRlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMb2FkZXJNaWRkbGV3YXJlXzEgPSByZXF1aXJlKFwiLi9Mb2FkZXJNaWRkbGV3YXJlXCIpO1xudmFyIFNvdW5kTGlicmFyeV8xID0gcmVxdWlyZShcIi4vU291bmRMaWJyYXJ5XCIpO1xucmVxdWlyZShcIi4vZGVwcmVjYXRpb25zXCIpO1xudmFyIHNvdW5kID0gbmV3IFNvdW5kTGlicmFyeV8xLmRlZmF1bHQoKTtcbmlmIChnbG9iYWwuUElYSSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicGl4aS5qcyBpcyByZXF1aXJlZFwiKTtcbn1cbmlmIChQSVhJLmxvYWRlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgIExvYWRlck1pZGRsZXdhcmVfMS5pbnN0YWxsKCk7XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUElYSSwgXCJzb3VuZFwiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzb3VuZDsgfSxcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gc291bmQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG52YXIgcm5nO1xuXG52YXIgY3J5cHRvID0gZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG87IC8vIGZvciBJRSAxMVxuaWYgKGNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyICBybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIl19

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_javascript_state_machine_state_machine__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_javascript_state_machine_state_machine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_javascript_state_machine_state_machine__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_PortalCell__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_consts__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_EventManager__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var Actor = function () {
    function Actor() {
        _classCallCheck(this, Actor);

        this.sprites = {
            moving: this.createMovingSprite()
        };
        this.container = new PIXI.Container();
        this.container.pivot.set(12, 12);
        this.speed = 2;
        this.direction = __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].RIGHT;
        this.cell = null;
    }

    _createClass(Actor, [{
        key: 'setCell',
        value: function setCell(cell) {
            this.cell = cell;
        }
    }, {
        key: 'warpToCell',
        value: function warpToCell(cell) {
            this.setCell(cell);
            this.container.x = cell.sprite.x;
            this.container.y = cell.sprite.y;
        }
    }, {
        key: 'onstartmoving',
        value: function onstartmoving(event, from, to) {
            this.sprites.moving.play();
        }
    }, {
        key: 'onleavemoving',
        value: function onleavemoving(event, from, to) {
            this.sprites.moving.stop();
        }
    }, {
        key: 'onbeforestartup',
        value: function onbeforestartup(event, from, to) {
            this.container.addChild(this.sprites.moving);
        }
    }, {
        key: 'onstartfiring',
        value: function onstartfiring(event, from, to) {
            var _this = this;

            var sprite = this.createFiringSprite();

            if (sprite) {
                if (this.sprites.firing) {
                    this.sprites.firing.destroy();
                }

                this.sprites.firing = sprite;
                this.container.removeChildren();
                this.container.addChild(sprite);
                sprite.onComplete = function () {
                    _this.stopfiring();
                };
                sprite.play();
                PIXI.sound.stopAll();
                PIXI.sound.play('player-fire');
            } else {
                this.stopfiring();
            }
        }
    }, {
        key: 'onstopfiring',
        value: function onstopfiring(event, from, to) {
            if (this.sprites.firing) {
                this.container.removeChildren();
                this.container.addChild(this.sprites.moving);
            }
        }
    }, {
        key: 'fire',
        value: function fire() {
            if (this.can('startfiring')) {
                this.startfiring();
            }
        }
    }, {
        key: 'move',
        value: function move(direction) {
            var _move = function (direction) {
                if (this.current === 'idle') {
                    this.startmoving();
                }

                switch (direction) {
                    case __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].UP:
                        this.container.y -= this.speed;
                        this.container.rotation = -(Math.PI / 2);
                        this.container.scale.set(1, 1);

                        break;
                    case __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].DOWN:
                        this.container.y += this.speed;
                        this.container.rotation = Math.PI / 2;
                        this.container.scale.set(1, -1);

                        break;
                    case __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].LEFT:
                        this.container.x -= this.speed;
                        this.container.rotation = Math.PI;
                        this.container.scale.set(1, -1);

                        break;
                    case __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].RIGHT:
                        this.container.x += this.speed;
                        this.container.rotation = 0;
                        this.container.scale.set(1, 1);

                        break;
                }
            }.bind(this);

            if (this.current === 'firing') {
                return false;
            }

            var cellX = this.cell.sprite.x,
                cellY = this.cell.sprite.y,
                actorX = this.container.x,
                actorY = this.container.y;

            // is the actor at the origin of the cell?
            if (cellX === actorX && cellY === actorY) {
                // can the actor move in the direction requested?
                if (this.cell.hasNeighbor(direction)) {
                    if (this.cell instanceof __WEBPACK_IMPORTED_MODULE_1_PortalCell__["a" /* default */] && this.cell.direction === direction) {
                        __WEBPACK_IMPORTED_MODULE_3_EventManager__["a" /* default */].global().trigger('Portal', { actor: this });
                    } else {
                        this.direction = direction;
                        _move(direction);
                    }
                    // the actor can not move in the requested direction. Stop the "moving" animation
                } else if (this.can('stopmoving')) {
                    this.stopmoving();
                }
                // the actor is not at the origin of the cell they occupy
            } else {
                // is the actor already facing the requested direction?
                if (direction === this.direction) {
                    _move(direction);

                    var distanceFromCenter = Math.sqrt(Math.pow(this.container.x - this.cell.sprite.x, 2) + Math.pow(this.container.y - this.cell.sprite.y, 2));

                    // Did this move result in the actor leaving their current cell?
                    if (distanceFromCenter >= __WEBPACK_IMPORTED_MODULE_2_consts__["c" /* CELL_SIZE */] / 2) {
                        this.cell = this.cell.getNeighbor(direction);
                    }
                } else {
                    // requested direction is valid and is the inverse of the current direction,
                    // so just invert the direction
                    var yOffset = actorY - cellY,
                        xOffset = actorX - cellX;

                    if (yOffset !== 0 && direction > __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].LEFT || xOffset && direction <= __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].LEFT) {
                        this.direction = direction;
                    } else {
                        // requested direction is of a different axis than the current one, which requires that the actor
                        // move back to the origin of the current cell before the direction axis can be changed.
                        if (this.direction <= __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].LEFT) {
                            if (xOffset > 0) {
                                this.direction = __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].LEFT;
                            } else {
                                this.direction = __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].RIGHT;
                            }
                        } else {
                            if (yOffset > 0) {
                                this.direction = __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].UP;
                            } else {
                                this.direction = __WEBPACK_IMPORTED_MODULE_2_consts__["b" /* DIRECTIONS */].DOWN;
                            }
                        }
                    }

                    _move(this.direction);
                }
            }
        }
    }]);

    return Actor;
}();

// none
// idle
// moving
// firing


/* harmony default export */ __webpack_exports__["a"] = (Actor);
__WEBPACK_IMPORTED_MODULE_0_javascript_state_machine_state_machine___default.a.create({
    target: Actor.prototype,
    events: [{ name: 'startup', from: 'none', to: 'idle' }, { name: 'startmoving', from: 'idle', to: 'moving' }, { name: 'stopmoving', from: 'moving', to: 'idle' }, { name: 'startfiring', from: ['idle', 'moving'], to: 'firing' }, { name: 'stopfiring', from: 'firing', to: 'idle' }]
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Cell__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_PortalCell__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_EventManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_consts__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var LEFT_PORTAL_INDEX = 22;
var RIGHT_PORTAL_INDEX = 32;
var WALL_WIDTH = 4;
var BOARD_HEIGHT = 6;
var BOARD_WIDTH = 11;

var Dungeon = function () {
    function Dungeon() {
        _classCallCheck(this, Dungeon);

        this.cells = [];
        this.container = new PIXI.Container();

        var board = new PIXI.Sprite(PIXI.Texture.fromFrame('board.png'));
        var leftPortal = new PIXI.Sprite(PIXI.Texture.fromFrame('portal-open.png'));
        var rightPortal = new PIXI.Sprite(PIXI.Texture.fromFrame('portal-open.png'));

        board.alpha = 0;
        leftPortal.y = WALL_WIDTH / 2 + __WEBPACK_IMPORTED_MODULE_3_consts__["c" /* CELL_SIZE */] * 2;
        rightPortal.y = leftPortal.y;
        rightPortal.x = (BOARD_WIDTH + 2) * __WEBPACK_IMPORTED_MODULE_3_consts__["c" /* CELL_SIZE */];
        rightPortal.scale.set(-1, 1);

        this.sprites = { board: board, leftPortal: leftPortal, rightPortal: rightPortal };
        this.isPortalOpen = true;
        this.onPortalTrigger = this.onPortalTrigger.bind(this);

        this.container.addChild(this.sprites.board);
        this.container.addChild(this.sprites.leftPortal);
        this.container.addChild(this.sprites.rightPortal);

        __WEBPACK_IMPORTED_MODULE_2_EventManager__["a" /* default */].global().on('Portal', this.onPortalTrigger);
    }

    _createClass(Dungeon, [{
        key: 'destroy',
        value: function destroy() {
            __WEBPACK_IMPORTED_MODULE_2_EventManager__["a" /* default */].global().off('Portal', this.onPortalTrigger);
        }
    }, {
        key: 'onPortalTrigger',
        value: function onPortalTrigger(e) {
            if (!this.isPortalOpen) {
                e.cancel();
            } else {
                var actor = e.data.actor;

                switch (actor.cell.index) {
                    case LEFT_PORTAL_INDEX:
                        actor.warpToCell(this.cells[RIGHT_PORTAL_INDEX]);
                        break;
                    case RIGHT_PORTAL_INDEX:
                        actor.warpToCell(this.cells[LEFT_PORTAL_INDEX]);
                        break;
                    default:
                        return;
                }

                this.closePortal();
            }
        }
    }, {
        key: 'openPortal',
        value: function openPortal() {
            if (!this.isPortalOpen) {
                var texture = PIXI.Texture.fromFrame('portal-open.png');

                this.isPortalOpen = true;
                this.sprites.leftPortal.texture = texture;
                this.sprites.rightPortal.texture = texture;
            }
        }
    }, {
        key: 'closePortal',
        value: function closePortal() {
            if (this.isPortalOpen) {
                var texture = PIXI.Texture.fromFrame('portal-closed.png');
                PIXI.sound.play('portal-trigger');

                this.isPortalOpen = false;
                this.sprites.leftPortal.texture = texture;
                this.sprites.rightPortal.texture = texture;
            }
        }
    }, {
        key: 'spawnActor',
        value: function spawnActor(actor) {
            actor.warpToCell(this.cells[5]);
            this.cellsContainer.addChild(actor.container);
        }
    }, {
        key: 'load',
        value: function load(layout) {
            function _invert(config) {
                if ((config & 3) === __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].LEFT || (config & 3) === __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].RIGHT) {
                    return (config & 0xFC) + (config & 0x03 ^ 3);
                }

                return config;
            }

            var index = 0,
                direction = 1,
                count = 0,
                xPosition = 0,
                yPosition = __WEBPACK_IMPORTED_MODULE_3_consts__["c" /* CELL_SIZE */] / 2,
                cellsContainer = new PIXI.Container(),
                cell,
                config,
                board = this;

            cellsContainer.x = __WEBPACK_IMPORTED_MODULE_3_consts__["c" /* CELL_SIZE */];
            cellsContainer.y = WALL_WIDTH / 2;

            function _getNeighbor(direction) {
                var neighbor = null;

                if (this.hasNeighbor(direction)) {
                    switch (direction) {
                        case __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].UP:
                            neighbor = board.cells[this.index - 11];break;
                        case __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].DOWN:
                            neighbor = board.cells[this.index + 11];break;
                        case __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].LEFT:
                            neighbor = board.cells[this.index - 1];break;
                        case __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].RIGHT:
                            neighbor = board.cells[this.index + 1];break;
                    }
                }

                return neighbor;
            }

            while (index < layout.length) {
                xPosition = count % BOARD_WIDTH * __WEBPACK_IMPORTED_MODULE_3_consts__["c" /* CELL_SIZE */] + __WEBPACK_IMPORTED_MODULE_3_consts__["c" /* CELL_SIZE */] / 2;
                config = layout[index];

                if (direction < 0) {
                    config = _invert(config);
                }

                if (count === LEFT_PORTAL_INDEX) {
                    cell = new __WEBPACK_IMPORTED_MODULE_1_PortalCell__["a" /* default */](config, xPosition, yPosition, __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].LEFT);
                } else if (count === RIGHT_PORTAL_INDEX) {
                    cell = new __WEBPACK_IMPORTED_MODULE_1_PortalCell__["a" /* default */](config, xPosition, yPosition, __WEBPACK_IMPORTED_MODULE_3_consts__["b" /* DIRECTIONS */].RIGHT);
                } else {
                    cell = new __WEBPACK_IMPORTED_MODULE_0_Cell__["a" /* default */](config, xPosition, yPosition);
                }

                cell.index = count;
                cell.getNeighbor = _getNeighbor;

                if ((index + direction) % BOARD_HEIGHT === 0 && direction > 0) {
                    direction *= -1;
                    index += direction;
                } else if (index % BOARD_HEIGHT === 0 && direction < 0) {
                    direction *= -1;
                    index += BOARD_HEIGHT;
                    yPosition += __WEBPACK_IMPORTED_MODULE_3_consts__["c" /* CELL_SIZE */];
                } else {
                    index += direction;
                }

                cellsContainer.addChild(cell.sprite);
                this.cells.push(cell);

                count++;
            }

            this.cellsContainer = cellsContainer;
            this.container.addChild(cellsContainer);
        }
    }]);

    return Dungeon;
}();

/* harmony default export */ __webpack_exports__["a"] = (Dungeon);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_EventManager__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Player__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Input__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Dungeon__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_consts__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var PORTAL_COOLDOWN = 5000;

var DungeonView = function () {
    function DungeonView() {
        _classCallCheck(this, DungeonView);

        var app = new PIXI.Application({ width: 500, height: 350 });

        var board = new __WEBPACK_IMPORTED_MODULE_3_Dungeon__["a" /* default */]();
        var player = new __WEBPACK_IMPORTED_MODULE_1_Player__["a" /* default */]();

        board.load(function (d) {
            return d[~~(Math.random() * d.length)];
        }(__WEBPACK_IMPORTED_MODULE_4_consts__["a" /* DUNGEONS */].WORRIOR));
        board.spawnActor(player);

        var container = board.container;

        container.x = 500 / 2;
        container.y = 350 / 2;
        container.pivot.set(container.width / 2, container.height / 2);
        app.stage.addChild(container);

        this.board = board;
        this.player = player;
        this.input = new __WEBPACK_IMPORTED_MODULE_2_Input__["a" /* default */]();
        this.element = app.view;

        // this belongs in GameLogic
        this.onPortalTrigger = this.onPortalTrigger.bind(this);
        __WEBPACK_IMPORTED_MODULE_0_EventManager__["a" /* default */].global().on('Portal', this.onPortalTrigger);
    }

    _createClass(DungeonView, [{
        key: 'onAttach',
        value: function onAttach() {}
    }, {
        key: 'onPortalTrigger',
        value: function onPortalTrigger(e) {
            var _this = this;

            setTimeout(function () {
                _this.board.openPortal();
            }, PORTAL_COOLDOWN);
        }
    }, {
        key: 'processInput',
        value: function processInput() {
            if (this.player.can('stopmoving') && !this.input.direction) {
                this.player.stopmoving();
            }

            if (this.input.direction) {
                this.player.move(this.input.direction);
            }

            if (this.input.firing) {
                this.player.fire();
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            __WEBPACK_IMPORTED_MODULE_0_EventManager__["a" /* default */].global().off('Portal', this.onPortalTrigger);
            this.input.destroy();
        }
    }, {
        key: 'onUpdateFrame',
        value: function onUpdateFrame() {
            this.processInput();
        }
    }]);

    return DungeonView;
}();

/* harmony default export */ __webpack_exports__["a"] = (DungeonView);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_EventManager__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var GetReadyView = function () {
    function GetReadyView() {
        _classCallCheck(this, GetReadyView);

        this.template = ['<div class="getready">', '<p class="terminal-font blue">GET</p>', '<p class="terminal-font yellow">READY</p>', '</div>'].join('');

        var element = document.createElement('div');
        element.innerHTML = this.template;
        this.element = element;
        this.timeoutId;
        this.onKeyDown = this.onKeyDown.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('click', this.onKeyDown);
    }

    _createClass(GetReadyView, [{
        key: 'onKeyDown',
        value: function onKeyDown(e) {
            this.requestViewChange();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            window.removeEventListener('keydown', this.onKeyDown);
            window.removeEventListener('click', this.onKeyDown);
        }
    }, {
        key: 'requestViewChange',
        value: function requestViewChange() {
            PIXI.sound.stopAll();
            clearTimeout(this.timeoutId);
            __WEBPACK_IMPORTED_MODULE_0_EventManager__["a" /* default */].global().trigger('RequestViewChange', 'Go');
        }
    }, {
        key: 'onAttach',
        value: function onAttach() {
            this.timeoutId = setTimeout(this.requestViewChange.bind(this), 3210);
            PIXI.sound.play('getready');
        }
    }, {
        key: 'onUpdateFrame',
        value: function onUpdateFrame() {}
    }]);

    return GetReadyView;
}();

/* harmony default export */ __webpack_exports__["a"] = (GetReadyView);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_EventManager__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var GoView = function () {
    function GoView() {
        _classCallCheck(this, GoView);

        this.template = ['<div class="go">', '<p class="terminal-font blue">GO</p>', '</div>'].join('');

        var element = document.createElement('div');
        element.innerHTML = this.template;
        this.element = element;
        this.timeoutId;
        this.onKeyDown = this.onKeyDown.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('click', this.onKeyDown);
    }

    _createClass(GoView, [{
        key: 'onKeyDown',
        value: function onKeyDown(e) {
            this.requestViewChange();
        }
    }, {
        key: 'requestViewChange',
        value: function requestViewChange() {
            PIXI.sound.stopAll();
            clearTimeout(this.timeoutId);
            __WEBPACK_IMPORTED_MODULE_0_EventManager__["a" /* default */].global().trigger('RequestViewChange', 'Dungeon');
        }
    }, {
        key: 'onAttach',
        value: function onAttach() {
            this.timeoutId = setTimeout(this.requestViewChange.bind(this), 1810);
            PIXI.sound.play('go');
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            window.removeEventListener('keydown', this.onKeyDown);
            window.removeEventListener('click', this.onKeyDown);
        }
    }, {
        key: 'onUpdateFrame',
        value: function onUpdateFrame() {}
    }]);

    return GoView;
}();

/* harmony default export */ __webpack_exports__["a"] = (GoView);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_consts__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Input = function () {
    function Input() {
        _classCallCheck(this, Input);

        var keyStack = [],
            keysPressed = {},
            moveKeys = {
            ArrowLeft: __WEBPACK_IMPORTED_MODULE_0_consts__["b" /* DIRECTIONS */].LEFT,
            ArrowRight: __WEBPACK_IMPORTED_MODULE_0_consts__["b" /* DIRECTIONS */].RIGHT,
            ArrowUp: __WEBPACK_IMPORTED_MODULE_0_consts__["b" /* DIRECTIONS */].UP,
            ArrowDown: __WEBPACK_IMPORTED_MODULE_0_consts__["b" /* DIRECTIONS */].DOWN
        };

        this.direction = 0;
        this.firing = false;

        this.onKeyDown = function (e) {
            if (e.code in moveKeys && !keysPressed[e.code]) {
                keyStack.push(e.code);
                keysPressed[e.code] = true;

                this.direction = moveKeys[e.code];
            }

            if (e.code === 'Space' && !this.firing) {
                this.firing = true;
            }
        }.bind(this);

        this.onKeyUp = function (e) {
            if (e.code in moveKeys && keysPressed[e.code]) {
                keyStack.splice(keyStack.indexOf(e.code), 1);
                delete keysPressed[e.code];

                this.direction = moveKeys[keyStack[keyStack.length - 1]] || 0;
            }

            if (e.code === 'Space' && this.firing) {
                this.firing = false;
            }
        }.bind(this);

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    _createClass(Input, [{
        key: 'destroy',
        value: function destroy() {
            window.removeEventListener('keydown', this.onKeyDown);
            window.removeEventListener('keyup', this.onKeyUp);
        }
    }]);

    return Input;
}();

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Actor__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Player = function (_Actor) {
    _inherits(Player, _Actor);

    _createClass(Player, [{
        key: 'createMovingSprite',
        value: function createMovingSprite() {
            var sprite = new PIXI.extras.AnimatedSprite([PIXI.Texture.fromFrame('worrior-one.walk1.png'), PIXI.Texture.fromFrame('worrior-one.walk2.png'), PIXI.Texture.fromFrame('worrior-one.walk3.png')]);

            sprite.animationSpeed = 0.25;

            return sprite;
        }
    }, {
        key: 'createFiringSprite',
        value: function createFiringSprite() {
            var sprite = new PIXI.extras.AnimatedSprite([PIXI.Texture.fromFrame('worrior-one.fire1.png'), PIXI.Texture.fromFrame('worrior-one.fire2.png'), PIXI.Texture.fromFrame('worrior-one.fire1.png')]);

            sprite.animationSpeed = 0.2;
            sprite.loop = false;

            return sprite;
        }
    }]);

    function Player() {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

        _this.startup();
        return _this;
    }

    return Player;
}(__WEBPACK_IMPORTED_MODULE_0_Actor__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Application__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pixi_sound_dist_pixi_sound__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pixi_sound_dist_pixi_sound___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_pixi_sound_dist_pixi_sound__);



(function () {
    "use strict";

    function loadSounds(urls, callback) {
        var count = urls.length;
        var _loaded = 0;

        urls.forEach(function (url) {
            PIXI.sound.add(url.split('/')[1].replace('.m4a', ''), {
                src: url,
                preload: true,
                loaded: function loaded() {
                    _loaded++;

                    if (_loaded === count) {
                        callback();
                    }
                }
            });
        });
    }

    function loadTextures(callback) {
        PIXI.loader.add('assets/wizard.json').load(callback);
    };

    function startGame() {
        var app = new __WEBPACK_IMPORTED_MODULE_0_Application__["a" /* default */]({ width: 500, height: 350 });

        (function gameLoop() {
            requestAnimationFrame(gameLoop);
            app.onUpdateFrame();
        })();
    }

    loadSounds(['assets/getready.m4a', 'assets/go.m4a', 'assets/portal-trigger.m4a', 'assets/player-fire.m4a', 'assets/player-spawn.m4a'], function () {
        loadTextures(startGame);
    });
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*

  Javascript State Machine Library - https://github.com/jakesgordon/javascript-state-machine

  Copyright (c) 2012, 2013, 2014, 2015, Jake Gordon and contributors
  Released under the MIT license - https://github.com/jakesgordon/javascript-state-machine/blob/master/LICENSE

*/

(function () {

  var StateMachine = {

    //---------------------------------------------------------------------------

    VERSION: "2.4.0",

    //---------------------------------------------------------------------------

    Result: {
      SUCCEEDED:    1, // the event transitioned successfully from one state to another
      NOTRANSITION: 2, // the event was successfull but no state transition was necessary
      CANCELLED:    3, // the event was cancelled by the caller in a beforeEvent callback
      PENDING:      4  // the event is asynchronous and the caller is in control of when the transition occurs
    },

    Error: {
      INVALID_TRANSITION: 100, // caller tried to fire an event that was innapropriate in the current state
      PENDING_TRANSITION: 200, // caller tried to fire an event while an async transition was still pending
      INVALID_CALLBACK:   300 // caller provided callback function threw an exception
    },

    WILDCARD: '*',
    ASYNC: 'async',

    //---------------------------------------------------------------------------

    create: function(cfg, target) {

      var initial      = (typeof cfg.initial == 'string') ? { state: cfg.initial } : cfg.initial; // allow for a simple string, or an object with { state: 'foo', event: 'setup', defer: true|false }
      var terminal     = cfg.terminal || cfg['final'];
      var fsm          = target || cfg.target  || {};
      var events       = cfg.events || [];
      var callbacks    = cfg.callbacks || {};
      var map          = {}; // track state transitions allowed for an event { event: { from: [ to ] } }
      var transitions  = {}; // track events allowed from a state            { state: [ event ] }

      var add = function(e) {
        var from = Array.isArray(e.from) ? e.from : (e.from ? [e.from] : [StateMachine.WILDCARD]); // allow 'wildcard' transition if 'from' is not specified
        map[e.name] = map[e.name] || {};
        for (var n = 0 ; n < from.length ; n++) {
          transitions[from[n]] = transitions[from[n]] || [];
          transitions[from[n]].push(e.name);

          map[e.name][from[n]] = e.to || from[n]; // allow no-op transition if 'to' is not specified
        }
        if (e.to)
          transitions[e.to] = transitions[e.to] || [];
      };

      if (initial) {
        initial.event = initial.event || 'startup';
        add({ name: initial.event, from: 'none', to: initial.state });
      }

      for(var n = 0 ; n < events.length ; n++)
        add(events[n]);

      for(var name in map) {
        if (map.hasOwnProperty(name))
          fsm[name] = StateMachine.buildEvent(name, map[name]);
      }

      for(var name in callbacks) {
        if (callbacks.hasOwnProperty(name))
          fsm[name] = callbacks[name]
      }

      fsm.current     = 'none';
      fsm.is          = function(state) { return Array.isArray(state) ? (state.indexOf(this.current) >= 0) : (this.current === state); };
      fsm.can         = function(event) { return !this.transition && (map[event] !== undefined) && (map[event].hasOwnProperty(this.current) || map[event].hasOwnProperty(StateMachine.WILDCARD)); }
      fsm.cannot      = function(event) { return !this.can(event); };
      fsm.transitions = function()      { return (transitions[this.current] || []).concat(transitions[StateMachine.WILDCARD] || []); };
      fsm.isFinished  = function()      { return this.is(terminal); };
      fsm.error       = cfg.error || function(name, from, to, args, error, msg, e) { throw e || msg; }; // default behavior when something unexpected happens is to throw an exception, but caller can override this behavior if desired (see github issue #3 and #17)
      fsm.states      = function() { return Object.keys(transitions).sort() };

      if (initial && !initial.defer)
        fsm[initial.event]();

      return fsm;

    },

    //===========================================================================

    doCallback: function(fsm, func, name, from, to, args) {
      if (func) {
        try {
          return func.apply(fsm, [name, from, to].concat(args));
        }
        catch(e) {
          return fsm.error(name, from, to, args, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e);
        }
      }
    },

    beforeAnyEvent:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onbeforeevent'],                       name, from, to, args); },
    afterAnyEvent:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onafterevent'] || fsm['onevent'],      name, from, to, args); },
    leaveAnyState:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onleavestate'],                        name, from, to, args); },
    enterAnyState:   function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onenterstate'] || fsm['onstate'],      name, from, to, args); },
    changeState:     function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onchangestate'],                       name, from, to, args); },

    beforeThisEvent: function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onbefore' + name],                     name, from, to, args); },
    afterThisEvent:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onafter'  + name] || fsm['on' + name], name, from, to, args); },
    leaveThisState:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onleave'  + from],                     name, from, to, args); },
    enterThisState:  function(fsm, name, from, to, args) { return StateMachine.doCallback(fsm, fsm['onenter'  + to]   || fsm['on' + to],   name, from, to, args); },

    beforeEvent: function(fsm, name, from, to, args) {
      if ((false === StateMachine.beforeThisEvent(fsm, name, from, to, args)) ||
          (false === StateMachine.beforeAnyEvent( fsm, name, from, to, args)))
        return false;
    },

    afterEvent: function(fsm, name, from, to, args) {
      StateMachine.afterThisEvent(fsm, name, from, to, args);
      StateMachine.afterAnyEvent( fsm, name, from, to, args);
    },

    leaveState: function(fsm, name, from, to, args) {
      var specific = StateMachine.leaveThisState(fsm, name, from, to, args),
          general  = StateMachine.leaveAnyState( fsm, name, from, to, args);
      if ((false === specific) || (false === general))
        return false;
      else if ((StateMachine.ASYNC === specific) || (StateMachine.ASYNC === general))
        return StateMachine.ASYNC;
    },

    enterState: function(fsm, name, from, to, args) {
      StateMachine.enterThisState(fsm, name, from, to, args);
      StateMachine.enterAnyState( fsm, name, from, to, args);
    },

    //===========================================================================

    buildEvent: function(name, map) {
      return function() {

        var from  = this.current;
        var to    = map[from] || (map[StateMachine.WILDCARD] != StateMachine.WILDCARD ? map[StateMachine.WILDCARD] : from) || from;
        var args  = Array.prototype.slice.call(arguments); // turn arguments into pure array

        if (this.transition)
          return this.error(name, from, to, args, StateMachine.Error.PENDING_TRANSITION, "event " + name + " inappropriate because previous transition did not complete");

        if (this.cannot(name))
          return this.error(name, from, to, args, StateMachine.Error.INVALID_TRANSITION, "event " + name + " inappropriate in current state " + this.current);

        if (false === StateMachine.beforeEvent(this, name, from, to, args))
          return StateMachine.Result.CANCELLED;

        if (from === to) {
          StateMachine.afterEvent(this, name, from, to, args);
          return StateMachine.Result.NOTRANSITION;
        }

        // prepare a transition method for use EITHER lower down, or by caller if they want an async transition (indicated by an ASYNC return value from leaveState)
        var fsm = this;
        this.transition = function() {
          fsm.transition = null; // this method should only ever be called once
          fsm.current = to;
          StateMachine.enterState( fsm, name, from, to, args);
          StateMachine.changeState(fsm, name, from, to, args);
          StateMachine.afterEvent( fsm, name, from, to, args);
          return StateMachine.Result.SUCCEEDED;
        };
        this.transition.cancel = function() { // provide a way for caller to cancel async transition if desired (issue #22)
          fsm.transition = null;
          StateMachine.afterEvent(fsm, name, from, to, args);
        }

        var leave = StateMachine.leaveState(this, name, from, to, args);
        if (false === leave) {
          this.transition = null;
          return StateMachine.Result.CANCELLED;
        }
        else if (StateMachine.ASYNC === leave) {
          return StateMachine.Result.PENDING;
        }
        else {
          if (this.transition) // need to check in case user manually called transition() but forgot to return StateMachine.ASYNC
            return this.transition();
        }

      };
    }

  }; // StateMachine

  //===========================================================================

  //======
  // NODE
  //======
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = StateMachine;
    }
    exports.StateMachine = StateMachine;
  }
  //============
  // AMD/REQUIRE
  //============
  else if (typeof define === 'function' && define.amd) {
    define(function(require) { return StateMachine; });
  }
  //========
  // BROWSER
  //========
  else if (typeof window !== 'undefined') {
    window.StateMachine = StateMachine;
  }
  //===========
  // WEB WORKER
  //===========
  else if (typeof self !== 'undefined') {
    self.StateMachine = StateMachine;
  }

}());


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);