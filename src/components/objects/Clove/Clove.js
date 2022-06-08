import { Group, Scene } from "three";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import CLOVE from './clove.obj';
import { Moon } from 'objects';


class Clove extends Group {
    constructor(parent, material, x, y, z, yRot, infinity, infX, infY, infZ, jiggle) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {

            infinity: false,
            infX: 0,
            infY: 0,
            infZ: 0,
            jiggle: false,
            jiggleCount: 0,
            jiggleTo: 1,
            jiggleFactor: 5

        };
        this.infX = infX;
        this.infY = infY;
        this.infZ = infZ;

        // if (infinity) {
        //     this.state.infinity = true;

        // }

        // if (jiggle) {
        //     this.state.jiggle = true;
        // }


        this.name = "CLOVE";
        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
        this.yRot = yRot;

        const loader = new OBJLoader();

        let mesh;

        loader.load(CLOVE, obj => {
            mesh = obj.children[0];
            obj.position.set(x, -0.5, z);
            // cool spiral
            obj.rotation.set(0, yRot, 0);
            // obj.rotation.set(0, yRot, 0);
            // obj.rotation.setFromRotationMatrix(obj.matrix);
            // obj.rotateZ(Math.PI/6);
            // obj.scale.multiplyScalar();
            obj.children[0].material = material;
            obj.matrixAutoUpdate = false;
            obj.updateMatrix();
            this.add(obj);
            this.obj = obj;
            this.sphere = mesh;
            this.state.infinity = infinity;
            this.state.jiggle = jiggle;

        });

        parent.addToUpdateList(this);

        this.rotate.bind(this);
        this.infinity.bind(this);
        this.jiggle.bind(this);
    }

    infinity() {
        this.state.infinity = true;
    }

    jiggle() {
        this.state.jiggle = true;
        this.state.jiggleCount = 0;
    }



    rotate(maxRot, time) {

        var start0 = { z: 0 };
        var target0 = { z: maxRot };
        new TWEEN.Tween(start0)
            .to(target0, time)
            .onUpdate(() => {
                this.obj.children[0].rotation.z = start0.z;
            })
            .start();
    }


    update(timeStamp) {

        if (this.state.infinity) {
            if (this.infX) {
                this.obj.children[0].rotation.x += Math.PI / this.infX;
            }
            if (this.infY) {
                this.obj.children[0].rotation.y += Math.PI / this.infY;
            }
            if (this.infZ) {
                this.obj.children[0].rotation.z += Math.PI / this.infZ;
            }

        }

        if (this.state.jiggle) {
            // 256
            // this.obj.children[0].scale.addScalar(0.1 * this.state.jiggleTo);
            this.obj.children[0].rotation.x += Math.PI / 128 * this.state.jiggleTo;
            // if (this.state.jiggleCount % 100 == 0) {
            //     this.state.jiggleFactor += 1;
            //     // console.log(this.state.jiggleFactor);
            // }
            if (this.state.jiggleCount % this.state.jiggleFactor == 0) {
                this.state.jiggleTo *= -1;
            }
            this.state.jiggleCount++;

        }


        // if (this.state.rotate) {
        //     // rotating 
        //     this.obj.children[0].rotateZ(this.maxRot / this.interval);
        //     if (this.state.rotateCount >= this.interval - 1) {
        //         this.state.rotate = false;
        //         this.state.rotateCount = 0;
        //         if (this.state.reset) {
        //             this.state.reset = false;
        //         }
        //     }
        //     this.state.rotateCount++;

        // }


        if (this.state.pulse) {
            // rotating 
            if (this.state.pulseCount < this.pulseInterval / 2) {
                this.obj.children[0].scale.addScalar(this.maxPulse / this.pulseInterval);
            } else if (this.state.pulseCount >= this.pulseInterval / 2) {
                this.obj.children[0].scale.addScalar(-1 * this.maxPulse / this.pulseInterval);
            }
            if (this.state.pulseCount >= this.pulseInterval) {
                this.state.pulse = false;
                this.state.pulseCount = 0;
            }
            this.state.pulseCount++;

        }


    }
}

export default Clove;