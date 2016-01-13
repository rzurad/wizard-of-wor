import detector from '../utilities/detector';

function parseQueryString() {
    let qs = {};

    if (detector.browser && window.location.search.length) {
        let str = window.location.search.substring(1);

        str = str.charAt(str.length - 1) === '/' ? str.substr(0, str.length - 1) : str;
        str = str.split('&');

        str.forEach(function (kvp) {
            let split = kvp.split('=');

            //TODO: handle comma-separated array?: qs[split[0]] = split[1].split(',');
            qs[split[0]] = split[1];
        });
    }

    return qs;
}

export class GameOptions {
    constructor() {
        this.whitelist = [
            'renderer',
            'soundEffectsVolume',
            'musicVolume',
            'screenWidth',
            'screenHeight',
            'language'
        ];

        // Level options
        this.level = '';

        // Rendering options
        this.renderer = 'WebGL';
        this.runFullSpeed = false;
        this.screenWidth = 1024;
        this.screenHeight = 768;

        // Sound options
        this.soundEffectsVolume = 1;
        this.musicVolume = 1;

        // Language options
        this.language = 'en';

        // Multiplayer options
        this.gameHost = 'fiddle-1337';
        this.expectedPlayers = 1;
        this.listenPort = -1;
        this.numAIs = 1;
        this.maxAIs = 4;

        // Resource Cache options
        //TODO: `useDevelopmentResources` can probably be removed, since in the C++ source
        //it is only used when determining use the `DevelopmentResourceZipFile` or the
        //`ResourceZipFile` for the `IResource *zipFile` that is given to the `ResourceCache`
        //during `fiddleApplication.initInstance`
        this.useDevelopmentResources = false;

        // What key should options to stored under in localstorage
        this.localStorageKey = 'fiddle';
    }

    // Load all player/game options/settings/preferences so they can be passed into
    // the application when it is created. There are three possible sources for an option, and their
    // order of precedence is as follows:
    //  - A querystring key/value pair: `index.html?antialiasing=false`
    //  - Local Storage
    //  - Values from the "player-options.json" file, which is loaded at runtime
    init(jsonUrl) {
        let instance = this;

        function getLocalOverrides() {
            let types = {
                    number: Number,
                    string: function () {},
                    boolean: function (v) { return v === 'true'; }
                },
                overrides = {},
                qs = parseQueryString();

            instance.whitelist.forEach(function (key) {
                let value;

                // When you read in from querystrings or localStorage, unfortunately all of the
                // values get converted to strings, so we'll run the value through a converter
                // function stored in `types` and keyed off of the object's answer to `typeof`.
                if (qs[key] !== void 0) {
                    value = types[typeof instance[key]](qs[key]);
                } else if (detector.localStorage && instance.localStorageKey) {
                    let item = localStorage.getItem(instance.localStorageKey + key);

                    if (item !== null) {
                        value = types[typeof instance[key]](item);
                    }
                }

                if (typeof value !== 'undefined') {
                    // Make sure that if there is an override option for the `renderer`, it
                    // is a valid value, otherwise just keep the default.
                    if (key === 'renderer' && !(value in { Canvas: 0, WebGL: 0 })) {
                        console.warn(`Ignoring unrecongnized value passed to 'renderer' option: ${overrides.renderer}`);

                        return;
                    }

                    overrides[key] = value;
                }
            });

            return overrides;
        }

        function merge(data, overrides) {
            data = $.extend({}, data, overrides);

            Object.keys(data).forEach(function (key) {
                instance[key] = data[key];
            });
        }

        return new RSVP.Promise(function (resolve, reject) {
            if (!jsonUrl) {
                merge({}, getLocalOverrides());
                resolve();
            } else {
                $.getJSON(jsonUrl).done(function (data) {
                    if (data.whitelist) {
                        if (typeof data.whitelist.forEach === 'function') {
                            instance.whitelist = data.whitelist;
                        }

                        delete data.whitelist;
                    }

                    merge(data, getLocalOverrides());
                    resolve();
                }).fail(function () {
                    reject(arguments[2]);
                });
            }
        });
    }
}
