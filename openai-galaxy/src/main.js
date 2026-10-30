import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import "./style.css";

// ------------------------------------
// SCENE
// ------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

// ------------------------------------
// CAMERA
// ------------------------------------

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 12, 35);

// ------------------------------------
// RENDERER
// ------------------------------------

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

document.body.appendChild(renderer.domElement);

// ------------------------------------
// CONTROLS
// ------------------------------------

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.enablePan = false;

controls.minDistance = 15;
controls.maxDistance = 70;

controls.autoRotate = true;
controls.autoRotateSpeed = 0.25;

// ------------------------------------
// PARTICLE SYSTEM
// ------------------------------------

const PARTICLE_COUNT = 120000;

const positions = new Float32Array(
  PARTICLE_COUNT * 3
);

const colors = new Float32Array(
  PARTICLE_COUNT * 3
);

const sizes = new Float32Array(
  PARTICLE_COUNT
);

// ------------------------------------
// COLORS
// ------------------------------------

const colorInside = new THREE.Color(
  0xfff3d0
);

const colorMiddle = new THREE.Color(
  0xffb347
);

const colorOutside = new THREE.Color(
  0xffffff
);

// ------------------------------------
// RANDOM GAUSSIAN
// ------------------------------------

function randomGaussian() {
  let u = 0;
  let v = 0;

  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  return Math.sqrt(-2 * Math.log(u)) *
    Math.cos(2 * Math.PI * v);
}

// ------------------------------------
// CREATE GALAXY
// ------------------------------------

const arms = 5;

for (let i = 0; i < PARTICLE_COUNT; i++) {

  const i3 = i * 3;

  // Radius
  const radius =
    Math.pow(Math.random(), 1.7) * 22;

  // Which spiral arm
  const arm =
    i % arms;

  // Spiral angle
  const baseAngle =
    (arm / arms) * Math.PI * 2;

  const spin =
    radius * 0.55;

  const randomAngle =
    randomGaussian() * 0.25;

  const angle =
    baseAngle +
    spin +
    randomAngle;

  // Galaxy thickness
  const thickness =
    Math.pow(Math.random(), 2) *
    3.0;

  const x =
    Math.cos(angle) * radius +
    randomGaussian() * thickness;

  const z =
    Math.sin(angle) * radius +
    randomGaussian() * thickness;

  const y =
    randomGaussian() *
    (0.15 + radius * 0.025);

  positions[i3] = x;
  positions[i3 + 1] = y;
  positions[i3 + 2] = z;

  // --------------------------------
  // COLOR BASED ON DISTANCE
  // --------------------------------

  const normalized =
    radius / 22;

  let particleColor;

  if (normalized < 0.3) {

    particleColor =
      colorInside.clone().lerp(
        colorMiddle,
        normalized / 0.3
      );

  } else {

    particleColor =
      colorMiddle.clone().lerp(
        colorOutside,
        (normalized - 0.3) / 0.7
      );
  }

  colors[i3] =
    particleColor.r;

  colors[i3 + 1] =
    particleColor.g;

  colors[i3 + 2] =
    particleColor.b;

  // Particle size
  sizes[i] =
    1.0 + Math.random() * 2.5;
}

// ------------------------------------
// GEOMETRY
// ------------------------------------

const geometry =
  new THREE.BufferGeometry();

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    positions,
    3
  )
);

geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(
    colors,
    3
  )
);

geometry.setAttribute(
  "size",
  new THREE.BufferAttribute(
    sizes,
    1
  )
);

// ------------------------------------
// PARTICLE SHADER
// ------------------------------------

const vertexShader = `

  attribute float size;
  attribute vec3 color;

  varying vec3 vColor;

  void main() {

    vColor = color;

    vec4 mvPosition =
      modelViewMatrix *
      vec4(position, 1.0);

    gl_PointSize =
      size *
      (250.0 / -mvPosition.z);

    gl_Position =
      projectionMatrix *
      mvPosition;
  }

`;

const fragmentShader = `

  varying vec3 vColor;

  void main() {

    vec2 uv =
      gl_PointCoord - 0.5;

    float distance =
      length(uv);

    if (distance > 0.5) {
      discard;
    }

    // Soft glowing particle
    float glow =
      1.0 - smoothstep(
        0.0,
        0.5,
        distance
      );

    glow = pow(glow, 2.5);

    gl_FragColor =
      vec4(
        vColor,
        glow
      );
  }

`;

// ------------------------------------
// MATERIAL
// ------------------------------------

const material =
  new THREE.ShaderMaterial({

    vertexShader,
    fragmentShader,

    transparent: true,

    depthWrite: false,

    blending:
      THREE.AdditiveBlending,

    vertexColors: true,

  });

// ------------------------------------
// PARTICLES
// ------------------------------------

const galaxy =
  new THREE.Points(
    geometry,
    material
  );

scene.add(galaxy);

// ------------------------------------
// BLOOM
// ------------------------------------

const composer =
  new EffectComposer(renderer);

const renderPass =
  new RenderPass(
    scene,
    camera
  );

composer.addPass(renderPass);

const bloomPass =
  new UnrealBloomPass(
    new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    ),
    1.5,
    0.5,
    0.15
  );

composer.addPass(bloomPass);

// ------------------------------------
// MOUSE INTERACTION
// ------------------------------------

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
  "mousemove",
  (event) => {

    mouseX =
      (event.clientX /
        window.innerWidth -
        0.5) * 2;

    mouseY =
      (event.clientY /
        window.innerHeight -
        0.5) * 2;

  }
);

// ------------------------------------
// ANIMATION
// ------------------------------------

const clock =
  new THREE.Clock();

function animate() {

  requestAnimationFrame(
    animate
  );

  const elapsed =
    clock.getElapsedTime();

  // Slowly rotate galaxy
  galaxy.rotation.y =
    elapsed * 0.035;

  // Slight vertical movement
  galaxy.rotation.x =
    mouseY * 0.04;

  galaxy.rotation.z =
    mouseX * 0.02;

  controls.update();

  composer.render();

}

animate();

// ------------------------------------
// RESIZE
// ------------------------------------

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    composer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);