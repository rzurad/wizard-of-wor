(function () {
    "use strict";

    function Dungeon() {
        this._entities = [];
        this._cells = [];
        this._isPortalOpen = false;

        this.width = 11;
        this.height = 6;
    }

    var app = new PIXI.Application({
            width: 720,
            height: 480
        });

    document.body.appendChild(app.view);

    function gameLoop() {
        requestAnimationFrame(gameLoop);
    }

    PIXI.loader.add('../assets/sprite.json').load(gameLoop);
}());
