var detector;

// Environment Feature Detection module
// ------------------------------------

// Utility module that when loaded will examine the browser environment for
// specific features. Other files can then import the results and examine
// the environment to make decisions based upon the environment they're being
// run in.
detector = {
    // Detect if the browser supports WebGL
    /* detect WebGL */
    WebGL: (function () {
        try {
            return !!(window.WebGLRenderingContext && document.createElement('canvas').getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    }()),

    // Detect if the browser supports local storage
    /* detect localStorage */
    localStorage: (function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }())
};

// the Detector object can potentially end up tracking quite of bit of things, but not all
// of them are neccessary to run the application. We'll add a shortcut key `isEnvSane` that
// will tell us if all of the "mission critical" features are supported, thus telling us
// wether or not we can run the game in a minimum working state.
detector.isEnvSane = detector.WebGL;

export default detector;
