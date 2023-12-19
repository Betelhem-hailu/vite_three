import './style.css'

import * as THREE from 'three';


var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
var sceneLight, portalLight, clock, portalParticles = [], smokeParticles = [];

var renderer = new THREE.WebGLRenderer();

function initScene() {

  sceneLight = new THREE.DirectionalLight(0xffffff, 0.5)
  sceneLight.position.set(0, 0, 1);
  scene.add(sceneLight);

  portalLight = new THREE.PointLight( 0x85abff, 30, 450, 0.6);
  portalLight.position.set(0,0,250);
  scene.add(portalLight);

  cam.position.z = 1000;
  scene.add(cam);

  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  particleSetup();
}

function particleSetup() {


  const loader = new THREE.TextureLoader();
  loader.load("./images.png", function (myTexture) {
    var geometry = new THREE.PlaneGeometry(350, 350);
    var material = new THREE.MeshStandardMaterial(
      {
        map: myTexture,
        transparent: true
      });

      var smokeGeometry = new THREE.PlaneGeometry(1000, 1000);
      var smokeMaterial = new THREE.MeshStandardMaterial(
        {
          map: myTexture,
          transparent: true
        });

    for (let p = 880; p > 250; p--) {
      let particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        0.5 * p * Math.cos((4 * p * Math.PI) / 180),
        0.5 * p * Math.sin((4 * p * Math.PI) / 180),
        0.1 * p
      );
      particle.rotation.z = Math.random() * 360;
      portalParticles.push(particle);
      scene.add(particle);
    }

    for (let p = 0; p < 40; p++) {
      let particle = new THREE.Mesh(smokeGeometry, smokeMaterial);
      particle.position.set(
        Math.random() * 1000-500,
        Math.random() * 400-200,
        25
      );
      particle.rotation.z = Math.random() * 360;
      particle.material.opacity= 0.4;
      portalParticles.push(particle);
      scene.add(particle);
    }

    clock = new THREE.Clock();
    animate();
   
  });

}

function animate(){
let delta = clock.getDelta();
portalParticles.forEach(p => {
  p.rotation.z -= delta *1.5;
});
smokeParticles.forEach(p => {
  p.rotation.z -= delta *0.2;
});
if(Math.random() > 0.9){
  portalLight.power = 950 + Math.random()*500;
}
renderer.render(scene, cam);
requestAnimationFrame(animate);
}

initScene();
