import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

//lil gui initiate
const gui = new GUI();

//sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//canvas
const target = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

//fullscreen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    target.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//loadingmanager (to load fast)
const loading = new THREE.LoadingManager();

//texture
const texture = new THREE.TextureLoader(loading);
const minecraft = texture.load("/textures/minecraft.png");
minecraft.colorSpace = THREE.SRGBColorSpace;
minecraft.magFilter = THREE.NearestFilter;

//object
const material = new THREE.MeshBasicMaterial({ map: minecraft });
const geometry = new THREE.BoxGeometry(1, 1, 1);

const box = new THREE.Mesh(geometry, material);

scene.add(box);

// debug ui
gui.add(box.position, "y").min(0).max(3).step(1);
gui.add(box, "visible");

// guiProps.color = "red";
// gui.addColor(guiProps, "color").onChange(() => {
//   material.color.set(guiProps.color);
// });

//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 2;

scene.add(camera);

//orbit control(control object with mouse)
const control = new OrbitControls(camera, target);

//damping(smooth animation)
control.enableDamping = true;

//resize
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: target });
renderer.setSize(size.width, size.height);

//pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//clock
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // box.rotation.y = elapsedTime;
  // box.rotation.x = elapsedTime;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 3;
  control.update();
  camera.lookAt(box.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
