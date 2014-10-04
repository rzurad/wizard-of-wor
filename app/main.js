var scene = new THREE.Scene(),
    SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    
    topCamera = new THREE.OrthographicCamera(
        window.innderWidth / -4, // left
        window.innerWidth / 4, // right
        window.innerHeight / 4, // top
        window.innerHeight / -4, // bottom
        -5000, // near
        10000 // far
    );

topCamera.up = new THREE.Vector3(0, 0, -1);
topCamera.lookAt(new THREE.Vector3(0, -1, 0));
scene.add(topCamera);

var renderer = new THREE.WebGLRenderer({ antialias: true }),
    container = document.getElementById('container');

renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
container.appendChild(renderer.domElement);

var light = new THREE.PointLight(0xffffff);

light.position.set(0, 250, 0);
scene.add(light);

var floorTexture = new THREE.ImageUtils.loadTexture('assets/textures/checkerboard.jpg');

floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.repeat.set( 10, 10 );

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide }),
    floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10),
    floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.position.y = -0.5;
floor.rotation.x = Math.PI / 2;
scene.add(floor);
scene.add(new THREE.AxisHelper(100));

renderer.setClearColor(0x000000, 1);
renderer.autoClear = false;

function render() {
    console.log('animate');
    renderer.render(scene, topCamera);
}

(function animate() {
    requestAnimationFrame(animate);
    render();
}());
