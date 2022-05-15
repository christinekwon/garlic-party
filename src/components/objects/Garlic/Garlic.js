import { Group, Scene } from "three";
import * as THREE from "three";
import { Clove } from 'objects';
import * as TWEEN from "@tweenjs/tween.js";



class Garlic extends Group {
    constructor(parent, metalMap, x, y, z, scale) {
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
            friend: parent.state.friend,

        };

        this.spin_speed = 10000;

        this.maxRot = Math.PI / 2;
        // this.maxRot = Math.PI;
        this.rotInterval = 300.0;
        this.maxPulse = 0.2;
        this.pulseInterval = 60.0;

        this.checkInterval = 1000;
        this.wait = 1000;

        this.initTimestamp = 0;
        this.translationFactor = 2.0 / 300;

        this.name = "GARLIC";


        // color= 0xbcb6ff;

        // eth
        this.color = 0xffb3c1;

        this.interval = 10;

        // 1.5 1.5 444444
        // 1.2 1. 000000
        // 333333 metal 1.0
        var material = new THREE.MeshStandardMaterial({
            color: this.color,
            // emissive: 0x111111,
            // emissive: 0x444444,
            emissive: 0x333333,
            metalness: 1.5, // between 0 and 1
            roughness: 0, // between 0 and 1
            envMap: metalMap,
            envMapIntensity: 1.6
        });

        let offset = 0.000;
        let bubPos = 0;
        let interBub0 = bubPos * Math.sin(Math.PI / 6);
        let interBub1 = bubPos * Math.sin(Math.PI / 3);

        this.Cloves = [
            //front right back left

            new Clove(parent, material, offset, offset, -bubPos, 0, 1),
            new Clove(parent, material, interBub0, offset, -interBub1, -Math.PI / 6),
            new Clove(parent, material, interBub1, offset, -interBub0, -Math.PI / 3),
            new Clove(parent, material, bubPos, offset, offset, -Math.PI / 2),
            new Clove(parent, material, interBub1, offset, interBub0, Math.PI / 3 * 4),
            new Clove(parent, material, interBub0, offset, interBub1, -Math.PI / 6 * 5),
            new Clove(parent, material, offset, offset, bubPos, Math.PI),
            new Clove(parent, material, -interBub0, offset, interBub1, Math.PI / 6 * 5),
            new Clove(parent, material, -interBub1, offset, interBub0, -Math.PI / 3 * 4),
            new Clove(parent, material, -bubPos, offset, offset, Math.PI / 2),
            new Clove(parent, material, -interBub1, offset, -interBub0, Math.PI / 3),
            new Clove(parent, material, -interBub0, offset, -interBub1, Math.PI / 6),
        ];

        this.clove_group = new THREE.Group();

        for (let Clove of this.Cloves) {
            this.clove_group.add(Clove);
        }
        this.clove_group.rotation.z = -Math.PI / 4;
        this.add(this.clove_group);

        this.clove_group.position.set(x, y, z);
        this.clove_group.scale.set(scale, scale, scale);

        parent.addToUpdateList(this);

        // setTimeout(() => {
        //     this.infinity();
        // }, 1000);
        // this.infinity();

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
        this.default_cloves.bind(this);
        this.turn2top.bind(this);
        this.turn2bot.bind(this);
        this.close.bind(this);
        this.infinity.bind(this);
        this.jiggle.bind(this);
    }

    infinity() {
        // this.turn2top(0);
        // this.clove_group.rotation.z = -Math.PI / 4;
        for (let clove of this.Cloves) {
            clove.infinity();
        }
    }

    jiggle() {
        for (let clove of this.Cloves) {
            clove.jiggle();
        }
    }

    check(angle) {
        this.turn2top(1000);

        for (let clove of this.Cloves) {
            clove.check(angle, this.checkInterval, this.wait);
        }
        setTimeout(() => {
            this.turn2bot(1000);
        }, this.checkInterval + this.wait);
    }

    reset() {
        this.clove_group.scale.set(1, 1, 1);
        // this.clove_group.position.set(0, 0, 0);
        this.turn2top(1000);
        for (let clove of this.Cloves) {
            setTimeout(() => {
                clove.reset();
            }, 1000);
        }
        setTimeout(() => {
            this.turn2bot(1000);
        }, 11000);
    }

    rotate(angle, time) {
        for (let clove of this.Cloves) {
            clove.rotate(angle, time);
        }
    }

    close(time) {

        for (let clove of this.Cloves) {
            clove.close(time);
        }
    }

    // decay() {
    //     console.log('decay');
    //     this.state.decay = true;
    //     this.state.decayCount = 0;
    // }

    turn2top(time) {
        var start = { x: this.clove_group.rotation.x };
        var target = { x: -Math.PI / 2 };
        new TWEEN.Tween(start)
            .to(target, time)
            .onUpdate(() => {
                this.clove_group.rotation.x = start.x;
            })
            .start();
    }

    turn2bot(time) {
        var start = { x: this.clove_group.rotation.x };
        var target = { x: 0 };
        new TWEEN.Tween(start)
            .to(target, time)
            .onUpdate(() => {
                this.clove_group.rotation.x = start.x;
            })
            .start();
    }

    // reset() {

    //     this.state.decay = false;
    //     this.state.decayCount = 0;
    //     this.state.rotate = false;
    //     this.state.rotateCount = 0;
    //     this.state.pulse = false;
    //     this.state.pulseCount = 0;

    //     console.log(this.obj.children[0]);
    //     this.obj.children[0].material.color = new THREE.Color(this.color);
    //     this.obj.children[0].material.metalness = 1.5;
    //     this.obj.children[0].material.roughness = 0;

    //     this.obj.children[0].scale.set(1, 1, 1);
    //     console.log(this.yRot);
    //     // this.obj.children[0].rotation.z = 0;
    //     this.obj.children[0].rotation.set(0, 0, 0);
    //     // this.obj.children[0].position.set(this.xPos, -0.5, this.zPos);

    // }

    // pulse() {
    //     console.log('pulse');
    //     this.state.pulse = true;
    //     this.state.pulseCount = 0;
    // }

    default () {
        this.clove_group.scale.set(1, 1, 1);
        this.clove_group.position.set(0, 0, 0);
        this.clove_group.rotation.set(0, 0, 0);
        for (let clove of this.Cloves) {
            clove.default();
        }
    }

    default_cloves() {
        for (let clove of this.Cloves) {
            clove.default();
        }
    }


    update(timeStamp) {

        // this.clove_group.rotation.y = (2 * Math.PI * timeStamp) / this.spin_speed;
        // 2000 /5 since scale is /5
        if (this.state.friend == true) {
            // 60 sec * 6
            this.clove_group.rotation.y += 2 * Math.PI / 360;
        } else {
            // this.clove_group.rotation.y = (2 * Math.PI * timeStamp) / this.spin_speed;
            // 60 frames/sec * 60 for a min
            // this.clove_group.rotation.y += 2 * Math.PI / 90;
            //orig
            this.clove_group.rotation.y += 2 * Math.PI / 1800;
        }

        if (this.state.decay) {
            this.state.decayCount++;
            const metalness = this.obj.children[0].material.metalness;
            const roughness = this.obj.children[0].material.roughness;

            if (this.state.decayCount % 5 == 0 && metalness > 0) {
                this.obj.children[0].scale.multiplyScalar(0.995);
                this.obj.children[0].material.metalness = metalness - 0.01;
                this.obj.children[0].material.roughness = roughness + 0.01;

                if (this.state.colorCount < 1.3) {

                    let color = new THREE.Color(
                        this.colors[0][0] + ((this.colors[1][0] - this.colors[0][0]) * this.state.colorCount),
                        this.colors[0][1] + ((this.colors[1][1] - this.colors[0][1]) * this.state.colorCount),
                        this.colors[0][2] + ((this.colors[1][2] - this.colors[0][2]) * this.state.colorCount)
                    );
                    this.obj.children[0].material.color = color;
                    this.state.colorCount += 0.03;
                }
            }

            if (this.state.decayCount == 500) {
                console.log("the end");
                this.state.decay = false;
            }
        }

        if (this.state.rotate) {
            // rotating 
            this.obj.children[0].rotateZ(this.maxRot / this.rotInterval);
            if (this.state.rotateCount >= this.rotInterval - 1) {
                this.state.rotate = false;
                this.state.rotateCount = 0;
            }
            this.state.rotateCount++;

        }

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

export default Garlic;