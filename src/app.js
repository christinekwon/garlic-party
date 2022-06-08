/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MainScene } from 'scenes';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as TWEEN from "@tweenjs/tween.js";

import * as Dat from 'dat.gui';
import { doc } from 'prettier';

// Initialize core ThreeJS components

const camera = new PerspectiveCamera();
const scene = new MainScene();
const renderer = new WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });

var projector, mouse = {
        x: 0,
        y: 0
    },
    INTERSECTED;

// Set up camera
// camera.position.set(0, 2, -10);
camera.position.set(0, 0, -10);
// camera.position.set(0, 5, 0);
// camera.position.set(0, 30, 0);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);

const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 30;
controls.update();

// Render loop
// 60 frames per second
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
    TWEEN.update(timeStamp);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);



// setTimeout(() => {
//     fadeIn(document.getElementById('outro'));
// }, 6000);

function fadeOut(element) {
    element.style.opacity = 1;
    // element.style.visibility = 'visible';
    var op = 1.0; // initial opacity
    // element.style.display = 'block';
    var timer = setInterval(function() {
        if (op <= 0.0) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 70);
    setTimeout(() => {
        element.style.visibility = 'hidden';

    }, 7000);
}

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.visibility = 'visible';
    var op = 0.1; // initial opacity
    // element.style.display = 'block';
    var timer = setInterval(function() {
        if (op >= 1.0) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 70);
}

function reset_camera() {
    camera.position.set(0, 0, -15);
}




function onMouseMove(event) {
    // update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}