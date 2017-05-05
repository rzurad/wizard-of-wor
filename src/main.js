import Application from 'Application';
import 'pixi.js/dist/pixi';

(function () {
    "use strict";

    PIXI.loader.add('assets/wizard.json').load(function () {
        var app = new Application({ width: 500, height: 350 });

        (function gameLoop() {
            requestAnimationFrame(gameLoop);
            
            app.onUpdateGame();
        }());
    });
}());
