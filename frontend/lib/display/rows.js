var particleSystem;
var clock = new THREE.Clock(true);
// var pointLightR;
// var pointLightL;
var sphere;

var spawnerparticlesL = {
  spawnRate: 1,
  horizontalSpeed: 0,
  verticalSpeed: 0,
  timeScale: 1
}

var rows = [{}, {}, {}, {}];
rows.forEach(function (row) {
  row.l = {
    position: new THREE.Vector3(),
    light: null
  };
  row.r = {
    position: new THREE.Vector3(),
    light: null
  };
});

function initFireflies () {
  function createLight( color ) {
    var newLight = new THREE.PointLight( color, 1, 30 );
    newLight.castShadow = true;
    newLight.shadowCameraNear = 1;
    newLight.shadowCameraFar = 300000;
    // newLight.shadowCameraVisible = true;
    newLight.shadowMapWidth = 204;
    newLight.shadowMapHeight = 102;
    newLight.shadowBias = 0.1;
    newLight.shadowDarkness = 0.2;

    var geometry = new THREE.SphereGeometry( 20, 16, 16 );
    var material = new THREE.MeshBasicMaterial( { color: color } );
    var sphere = new THREE.Mesh( geometry, material );
    newLight.add( sphere );

    return newLight
  }

  colors = [0xaa0000, 0x00aa00, 0x0000aa, 0xaa00aa];
  rows.forEach(function (row, index) {
    row.l.light = createLight(colors[index]);
    row.r.light = createLight(colors[index]);

    scene.add( row.l.light );
    scene.add( row.r.light );
  });
}

function initParticles () {
  rows.forEach(function (row) {
    row.l.particles = new THREE.GPUParticleSystem({
      maxParticles: 2500,
      position: new THREE.Vector3(),
      positionRandomness: 0,
      velocity: new THREE.Vector3(),
      velocityRandomness: 0,
      color: 0xff99ff,
      colorRandomness: .5,
      turbulence: 0,
      lifetime: 15,
      size: 2,
      sizeRandomness: 2
    });
    row.r.particles = new THREE.GPUParticleSystem({
      maxParticles: 2500,
      position: new THREE.Vector3(),
      positionRandomness: 0,
      velocity: new THREE.Vector3(),
      velocityRandomness: 0,
      color: 0xff99ff,
      colorRandomness: .5,
      turbulence: 0,
      lifetime: 15,
      size: 2,
      sizeRandomness: 2
    });

    scene.add( row.l.particles );
    scene.add( row.r.particles );
  });
}
