(function () {
    "use strict";

    // Worrior is 24x24 pixels; 8x8 color cells
    var app;

    function setup() {
        app = new PIXI.Application();

        var anim;

        PIXI.loader.add('../assets/sprite.json').load(function () {
            var frames = [
                    PIXI.Texture.fromFrame('WorriorOne-Walk1'),
                    PIXI.Texture.fromFrame('WorriorOne-Walk2'),
                    PIXI.Texture.fromFrame('WorriorOne-Walk3'),
                    PIXI.Texture.fromFrame('WorriorOne-Fire1'),
                    PIXI.Texture.fromFrame('WorriorOne-Fire2')
                ],

                twoframes = [
                    PIXI.Texture.fromFrame('WorriorTwo-Walk1'),
                    PIXI.Texture.fromFrame('WorriorTwo-Walk2'),
                    PIXI.Texture.fromFrame('WorriorTwo-Walk3')
                ];

            anim = new PIXI.extras.AnimatedSprite(twoframes);

            anim.x = app.renderer.width / 2;
            anim.y = app.renderer.height / 2;
            anim.anchor.set(0.5);
            anim.animationSpeed = 0.33;
            anim.play();

            app.stage.addChild(anim);
            document.body.appendChild(app.view);
            startGameLoop();
        });

        window.addEventListener('keydown', function (e) {
            
        });

        window.addEventListener('keyup', function (e) {

        });
    }

    function startGameLoop() {
        requestAnimationFrame(function gameLoop() {
            // onGameUpdate(deltaTime, elapsedTime);
            // onFrameRender(deltaTime, elapsedTime);
            requestAnimationFrame(gameLoop);
        });
    }

    setup();
}());
