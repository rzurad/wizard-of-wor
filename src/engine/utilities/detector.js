// Utility module that when loaded will examine the browser environment for
// specific features. Other files can then import the results and examine
// the environment to make decisions based upon the environment they're being
// run in.
let isBrowser = typeof window !== 'undefined',
    detector;

detector = {
    // Detect if the browser supports WebGL
    WebGL: (function () {
        if (!isBrowser) {
            return false;
        }

        try {
            return !!(
                window.WebGLRenderingContext &&
                document.createElement('canvas').getContext('experimental-webgl')
            );
        } catch (e) {
            return false;
        }
    }()),

    // Detect if the browser suppords a 2d canvas
    Canvas: isBrowser && !!window.CanvasRenderingContext2D,

    // Detect if the browser supports local storage
    localStorage: (function () {
        if (!isBrowser) {
            return false;
        }

        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }()),

    browser: typeof window !== 'undefined'
};

// the Detector object can potentially end up tracking quite of bit of things, but not all
// of them are neccessary to run the application. We'll add a shortcut key `isEnvSane` that
// will tell us if all of the "mission critical" features are supported, thus telling us
// wether or not we can run the game in a minimum working state.
detector.isEnvSane = !isBrowser || isBrowser && (detector.webGL || detector.canvas);

export default detector;
