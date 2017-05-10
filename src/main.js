import Application from 'Application';
import 'pixi-sound/dist/pixi-sound';

(function () {
    "use strict";

    function loadSounds(urls, callback) {
        const count = urls.length;
        let loaded = 0;

        urls.forEach(function (url) {
            PIXI.sound.add(url.split('/')[1].replace('.m4a', ''), {
                src: url,
                preload: true,
                loaded: function () {
                    loaded++;

                    if (loaded === count) {
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
        const app = new Application({ width: 500, height: 350 });

        (function gameLoop() {
            requestAnimationFrame(gameLoop);
            app.onUpdateFrame();
        }());
    }

    loadSounds([
        'assets/getready.m4a',
        'assets/go.m4a',
        'assets/portal-trigger.m4a',
        'assets/player-fire.m4a',
        'assets/player-spawn.m4a'
    ], function () {
        loadTextures(startGame);
    });
}());
