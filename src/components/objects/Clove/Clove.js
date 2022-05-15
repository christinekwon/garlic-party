import { Group, Scene } from "three";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import CLOVE from './clove.obj';
import { Moon } from 'objects';


class Clove extends Group {
    constructor(parent, material, x, y, z, yRot, ) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            // gui: parent.state.gui,
            bob: false,
            // twirl: 0,
            count: 0,
            // count: radius * 100,
            startGrowing: 0,
            count: 0,
            stopColor: false,
            colorCount: 0.01,
            decay: false,
            decayCount: 0,
            rotate: false,
            rotateCount: 0,
            pulse: false,
            pulseCount: 0,
            reset: false,
            infinity: false,
            jiggle: false,
            jiggleCount: 0,
            jiggleTo: 1,
            jiggleFactor: 5

        };

        this.maxRot = Math.PI / 2;
        // this.maxRot = Math.PI;
        this.checkInterval = 1000;
        this.resetInterval = 10000;
        this.maxPulse = 0.2;
        this.pulseInterval = 60.0;

        this.initTimestamp = 0;
        this.translationFactor = 2.0 / 300;

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
            // this.state.infinity = true;

        });

        parent.addToUpdateList(this);



        // setTimeout(() => {
        // 	this.state.startGrowing = 1;
        // }, 3000);
        // this.decay.bind(this);
        // this.rotate.bind(this);
        // this.reset.bind(this);
        this.check.bind(this);
        this.reset.bind(this);
        this.rotate.bind(this);
        this.default.bind(this);
        this.close.bind(this);
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

    check(maxRot, checkInterval, wait) {

        var start0 = { z: 0 };
        var target0 = { z: maxRot };
        new TWEEN.Tween(start0)
            .to(target0, checkInterval)
            .onUpdate(() => {
                this.obj.children[0].rotation.z = start0.z;
            })
            .start();

        var start1 = { z: maxRot };
        var target1 = { z: 0 }
        new TWEEN.Tween(start1)
            .to(target1, checkInterval)
            .onUpdate(() => {
                this.obj.children[0].rotation.z = start1.z;
            })
            .delay(checkInterval + wait)
            .start();

        // this.interval = 50.0;
        // this.maxRot = maxRot;
        // this.state.rotate = true;
        // this.state.rotateCount = 0;
        // setTimeout(() => {
        //     this.maxRot = -maxRot;
        //     this.state.rotate = true;
        //     this.state.rotateCount = 0;
        //     // at least 17
        // }, this.interval * 20);
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

    close(time) {

        var start0 = { z: this.obj.children[0].rotation.z };
        var target0 = { z: 0 };
        new TWEEN.Tween(start0)
            .to(target0, time)
            .onUpdate(() => {
                this.obj.children[0].rotation.z = start0.z;
            })
            .start();
    }

    // decay() {
    //     console.log('decay');
    //     this.state.decay = true;
    //     this.state.decayCount = 0;
    // }

    reset() {
        var start = { z: 0 };
        var target = { z: Math.PI * 2 };
        new TWEEN.Tween(start)
            .to(target, this.resetInterval)
            .onUpdate(() => {
                this.obj.children[0].rotation.z = start.z;
            })
            .start();
    }

    default () {
        this.state.decay = false;
        this.state.decayCount = 0;
        this.state.rotate = false;
        this.state.rotateCount = 0;
        this.state.pulse = false;
        this.state.pulseCount = 0;
        this.obj.children[0].scale.set(1, 1, 1);
        this.obj.children[0].rotation.set(0, 0, 0);
    }

    // pulse() {
    //     console.log('pulse');
    //     this.state.pulse = true;
    //     this.state.pulseCount = 0;
    // }


    update(timeStamp) {

        if (this.state.infinity) {
            this.obj.children[0].rotation.x += Math.PI / 256;
            this.obj.children[0].rotation.y -= Math.PI / 64;
            this.obj.children[0].rotation.z += Math.PI / 256;
        }

        if (this.state.jiggle) {
            // 256
            // this.obj.children[0].scale.addScalar(0.1 * this.state.jiggleTo);
            this.obj.children[0].rotation.x += Math.PI / 64 * this.state.jiggleTo;
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