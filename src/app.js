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


// event = keyup or keydown
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        fadeOut(document.getElementById('intro'));
        scene.begin();
        // setTimeout(() => {
        //     fadeIn(document.getElementById('outro'));
        // }, 600);
        // 960000
    }
})

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





// document.getElementById("time").addEventListener("click", function() {
//     reset_camera();
//     document.getElementById("container-friend").style.visibility = "hidden";
//     document.getElementById("container-solo").style.visibility = "hidden";
//     scene.init_solo_mode();
//     setTimeout(() => {
//         scene.check_real_time();
//     }, 2000);
//     document.getElementById("time").style.opacity = "1";
//     document.getElementById("solo").style.opacity = "0.5";
//     document.getElementById("friend").style.opacity = "0.5";
// });



// document.getElementById("solo").addEventListener("click", function() {
//     reset_camera();
//     document.getElementById("container-friend").style.visibility = "hidden";
//     document.getElementById("container-solo").style.visibility = "visible";
//     scene.init_solo_mode();
//     document.getElementById("solo").style.opacity = "1";
//     document.getElementById("time").style.opacity = "0.5";
//     document.getElementById("friend").style.opacity = "0.5";
// });

// document.getElementById("friend").addEventListener("click", function() {
//     reset_camera();
//     document.getElementById("container-friend").style.visibility = "visible";
//     document.getElementById("container-solo").style.visibility = "hidden";
//     scene.init_friend_mode();
//     document.getElementById("friend").style.opacity = "1";
//     document.getElementById("time").style.opacity = "0.5";
//     document.getElementById("solo").style.opacity = "0.5";
// });

// document.getElementById("add-friend").addEventListener("click", function() {
//     scene.add_friend();
// });

// document.getElementById("remove-friend").addEventListener("click", function() {
//     scene.remove_friend();
// });

// document.getElementById("rotateZ").addEventListener("click", function() {
//     scene.toggle_rotateZ();
// });

// document.getElementById("grow").addEventListener("click", function() {
//     scene.init_friend_mode();
//     scene.state.rotateZ = true;
//     for (let i = 0; i < 6; i++) {
//         setTimeout(() => {
//             scene.add_friend();
//         }, 6000 * (i + 1));
//     }

// });

// document.getElementById("shrink").addEventListener("click", function() {
//     for (let i = 0; i < 5; i++) {
//         setTimeout(() => {
//             scene.remove_friend();
//         }, 6000 * (i + 1));
//     }

// });


// document.getElementById("close").addEventListener("click", function() {
//     scene.close();
// });

// document.getElementById("crown").addEventListener("click", function() {
//     camera.position.set(0, 8, 0);
// });

// document.getElementById("front").addEventListener("click", function() {
//     camera.position.set(0, 0, -10);
// });



// document.getElementById("butt").addEventListener("click", function() {
//     camera.position.set(0, -10, 0);
// });

// const check_elements = document.getElementsByClassName("check");
// for (let i = 0; i < check_elements.length; i++) {
//     document.getElementsByClassName("check")[i].addEventListener("click", function() {
//         reset_camera();
//         scene.check(parseInt(check_elements[i].id));
//     })
// }

// const show_friend_elements = document.getElementsByClassName("show-friend");
// for (let i = 0; i < show_friend_elements.length; i++) {
//     document.getElementsByClassName("show-friend")[i].addEventListener("click", function() {
//         scene.show_friends(parseInt(show_friend_elements[i].id[0]));

//         // 3000 for rotateZ to start
//         // 5000 for close to complete
//         setTimeout(() => {
//             scene.close();
//             // 13000
//         }, 13000);
//     })
// }


// document.getElementById("rot360").addEventListener("click", function() {
//     scene.rot360();
// });

// document.getElementById("infinity").addEventListener("click", function() {
//     scene.infinity();
// });

// document.getElementById("jiggle").addEventListener("click", function() {
//     scene.jiggle();
// });


// document.getElementById("turn2top").addEventListener("click", function() {
//     reset_camera();
//     scene.garlic.turn2top(1000);
// });


// document.getElementById("reset").addEventListener("click", function() {
//     reset_camera();
//     scene.reset();
// });

// document.getElementById("default").addEventListener("click", function() {
//     scene.default();
//     reset_camera();
// });


function onMouseMove(event) {
    // update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}