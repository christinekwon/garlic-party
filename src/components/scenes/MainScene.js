import * as Dat from 'dat.gui';
import { Scene, Color, CubeTextureLoader, TextureLoader } from 'three';
import { Moon, Garlic, Clove, Mesh } from 'objects';
import { BasicLights } from 'lights';
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

import POSX from "./textures/Skybox/posx.jpg";
import NEGX from "./textures/Skybox/negx.jpg";
import POSY from "./textures/Skybox/posy.jpg";
import NEGY from "./textures/Skybox/negy.jpg";
import POSZ from "./textures/Skybox/posz.jpg";
import NEGZ from "./textures/Skybox/negz.jpg";

class MainScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotY: false,
            rotYSpeed: 1800,
            updateList: [],
            rotateZ: false,
        };


        this.background = new Color(0x000000);

        var metalMap = new CubeTextureLoader()
            .load([
                POSX, NEGX,
                POSY, NEGY,
                POSZ, NEGZ
            ]);
        const xRotation = 0;
        const zRotation = 0;

        // sceneRotSpeed, xRotation, zRotation, rotY, rotYSpeed, infinity, infX, infY, infZ, jiggle

        const modes = [
            "xInfTopSlow",
            "xzInfTopFast",
            "xzInfSlantFast",
            "xzInfRotFast",
            "xzInfSideFast",
            "zInfJiggle",
            "jiggle",
            "bounce"
        ];

        const params = {
            "xInfTopSlow": {
                "sceneRotY": 0,
                "sceneRotYSpeed": 0,
                "XRotation": -Math.PI / 2,
                "ZRotation": 0,
                "rotY": 0,
                "rotYSpeed": 0,
                "infinity": 1,
                "infX": 256,
                "infY": 0,
                "infZ": 0,
                "jiggle": 0
            },
            "xzInfTopFast": {
                "sceneRotY": 0,
                "sceneRotYSpeed": 0,
                "XRotation": -Math.PI / 2,
                "ZRotation": 0,
                "rotY": 0,
                "rotYSpeed": 0,
                "infinity": 1,
                "infX": 128,
                "infY": -256,
                "infZ": 256,
                "jiggle": 0
            },
            "xzInfSlantFast": {
                "sceneRotY": 0,
                "sceneRotYSpeed": 0,
                "XRotation": 0,
                "ZRotation": -Math.PI / 4,
                "rotY": 0,
                "rotYSpeed": 0,
                "infinity": 1,
                "infX": 256,
                "infY": -64,
                "infZ": 256,
                "jiggle": 0
            },
            "xzInfRotFast": {
                "sceneRotY": 0,
                "sceneRotYSpeed": 0,
                "XRotation": 0,
                "ZRotation": -Math.PI / 4,
                "rotY": 1,
                "rotYSpeed": 100,
                "infinity": 1,
                "infX": 256,
                "infY": -64,
                "infZ": 256,
                "jiggle": 0
            },
            "xzInfSideFast": {
                "sceneRotY": 0,
                "sceneRotYSpeed": 0,
                "XRotation": 0,
                "ZRotation": 0,
                "rotY": 0,
                "rotYSpeed": 0,
                "infinity": 1,
                "infX": 256,
                "infY": -64,
                "infZ": 256,
                "jiggle": 0
            },
            "zInfJiggle": {
                "sceneRotY": 1,
                "sceneRotYSpeed": 1800,
                "XRotation": 0,
                "ZRotation": 0,
                "rotY": 0,
                "rotYSpeed": 0,
                "infinity": 1,
                "infX": 0,
                "infY": 0,
                "infZ": 256,
                "jiggle": 1
            },
            "jiggle": {
                "sceneRotY": 1,
                "sceneRotYSpeed": 1800,
                "XRotation": 0,
                "ZRotation": 0,
                "rotY": 0,
                "rotYSpeed": 0,
                "infinity": 0,
                "infX": 0,
                "infY": 0,
                "infZ": 0,
                "jiggle": 1
            },
            "bounce": {
                "sceneRotY": 0,
                "sceneRotYSpeed": 0,
                "XRotation": -Math.PI / 2,
                "ZRotation": 0,
                "rotY": 1,
                "rotYSpeed": 3000,
                "infinity": 0,
                "infX": 0,
                "infY": 0,
                "infZ": 0,
                "jiggle": 1
            }
        };
        // [1800, -Math.PI / 2, 0, 0, 0, 1, 256, -64, 256, 0]

        const num_modes = modes.length;
        const index = Math.floor(Math.random() * num_modes);

        // "xInfTopSlow",
        //     "xzInfTopFast",
        //     "xzInfSlantFast",
        //     "xzInfRotFast",
        //     "xzInfFastSide",
        //     "zInfJiggle",
        //     "wiggle",
        let mode = modes[index];
        // mode = "bounce";
        // console.log(index, mode);
        const mode_params = params[mode];

        this.garlic = new Garlic(
            this, metalMap, 0, 0, 0, 1,
            mode_params['XRotation'],
            mode_params['ZRotation'],
            mode_params['rotY'],
            mode_params['rotYSpeed'],
            mode_params['infinity'],
            mode_params['infX'],
            mode_params['infY'],
            mode_params['infZ'],
            mode_params['jiggle']);
        // this.garlic.spin_speed = 60000;
        this.add(this.garlic);
        this.garlic.visible = true;


        const lights = new BasicLights();
        this.add(lights);


        this.state.rotY = mode_params['sceneRotY'];
        if (this.state.rotY) {
            this.state.rotYSpeed = mode_params['sceneRotYSpeed'];
        }

        this.toggle_rotateZ.bind(this);

        this.check_real_time.bind(this);
        this.infinity.bind(this);

    }


    check_real_time() {
        // 1440 minutes in a day
        const total = 1440;
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const angle = hours * 60 + minutes;
        this.garlic.check(2 * Math.PI * (angle / total));
    }


    toggle_rotateZ() {
        this.state.rotateZ = !this.state.rotateZ;
        console.log(this.state.rotateZ);
    }


    infinity() {
        this.garlic.infinity();
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotY, rotYSpeed, updateList } = this.state;


        // orig
        // if (this.state.rotateZ == true) {
        //     // this.rotation.z = (rotationSpeed * timeStamp) / 6000;
        //     // this.rotation.z += 0.005;
        //     // 1000: 1 rot ~15 seconds
        //     // 30 sec
        //     // 60 frames per sec
        //     this.rotation.z += 2 * Math.PI / 1800;
        // }


        if (rotY) {
            this.rotation.y += 2 * Math.PI / rotYSpeed;
        }

        // this.rotation.y = (2 * Math.PI * timeStamp) / 2000;
        // // every minute
        // this.rotation.y = (2 * Math.PI * timeStamp) / 60000;
        // this.rotation.z = (2 * Math.PI * timeStamp) / 60000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }

    }


}

export default MainScene;