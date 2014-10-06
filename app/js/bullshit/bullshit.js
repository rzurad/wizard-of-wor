import dungeons from 'dungeons';


// standard global variables
var container, scene, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var MovingCube;
var topCamera;

init();
animate();

// FUNCTIONS        
function init() {
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

    // orthographic cameras
    topCamera = new THREE.OrthographicCamera(
        window.innerWidth / -4, // Left
        window.innerWidth / 4, // Right
        window.innerHeight / 4, // Top
        window.innerHeight / -4, // Bottom
        -5000, // Near 
        10000 // far
    );

    topCamera.up = new THREE.Vector3(0,0,-1);
    topCamera.lookAt( new THREE.Vector3(0,-1,0) );
    scene.add(topCamera);

    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer(); 
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, topCamera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

    // CONTROLS
    // controls = ...

    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );
    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/checkerboard.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 10, 10 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    
    ////////////
    // CUSTOM //
    ////////////
    
    var MovingCubeGeom = new THREE.BoxGeometry( 50, 50, 50, 1, 1, 1);
    MovingCube = new THREE.Mesh(MovingCubeGeom);
    MovingCube.position.set(0, 25.1, 0);
    scene.add(MovingCube);    
    
    // a little bit of scenery...

    var ambientlight = new THREE.AmbientLight(0x111111);
    scene.add( ambientlight );

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 1 );
    renderer.autoClear = false;
}

function animate() 
{
    requestAnimationFrame( animate );
    render();       
    update();
}

function update()
{
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 200 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
    
    // local transformations

    // move forwards/backwards/left/right
    if ( keyboard.pressed("W") )
        MovingCube.translateZ( -moveDistance );
    if ( keyboard.pressed("S") )
        MovingCube.translateZ(  moveDistance );
    if ( keyboard.pressed("Q") )
        MovingCube.translateX( -moveDistance );
    if ( keyboard.pressed("E") )
        MovingCube.translateX(  moveDistance ); 

    // rotate left/right/up/down
    var rotation_matrix = new THREE.Matrix4().identity();
    if ( keyboard.pressed("A") )
        MovingCube.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
    if ( keyboard.pressed("D") )
        MovingCube.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
    if ( keyboard.pressed("R") )
        MovingCube.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
    if ( keyboard.pressed("F") )
        MovingCube.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
    
    if ( keyboard.pressed("Z") )
    {
        MovingCube.position.set(0,25.1,0);
        MovingCube.rotation.set(0,0,0);
    }

    stats.update();
}

function render() 
{
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

    renderer.clear();
    renderer.render( scene, topCamera );
}
