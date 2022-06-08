import { Group, Scene } from "three";
import * as THREE from "three";
import { Clove } from 'objects';
import * as TWEEN from "@tweenjs/tween.js";



class Garlic extends Group {
    constructor(parent, metalMap, x, y, z, scale, xRotation, zRotation, rotY, rotYSpeed, infinity, infX, infY, infZ, jiggle) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            rotY: rotY,
            rotYSpeed: rotYSpeed,
            rotate: false,
            rotateCount: 0,
            pulse: false,
            pulseCount: 0,
            friend: parent.state.friend,

        };



        this.name = "GARLIC";


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

            new Clove(parent, material, offset, offset, -bubPos, 0, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, interBub0, offset, -interBub1, -Math.PI / 6, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, interBub1, offset, -interBub0, -Math.PI / 3, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, bubPos, offset, offset, -Math.PI / 2, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, interBub1, offset, interBub0, Math.PI / 3 * 4, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, interBub0, offset, interBub1, -Math.PI / 6 * 5, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, offset, offset, bubPos, Math.PI, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, -interBub0, offset, interBub1, Math.PI / 6 * 5, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, -interBub1, offset, interBub0, -Math.PI / 3 * 4, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, -bubPos, offset, offset, Math.PI / 2, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, -interBub1, offset, -interBub0, Math.PI / 3, infinity, infX, infY, infZ, jiggle),
            new Clove(parent, material, -interBub0, offset, -interBub1, Math.PI / 6, infinity, infX, infY, infZ, jiggle),
        ];

        this.clove_group = new THREE.Group();

        for (let Clove of this.Cloves) {
            this.clove_group.add(Clove);
        }
        this.clove_group.rotation.x = xRotation;
        this.clove_group.rotation.z = zRotation;
        this.add(this.clove_group);

        this.clove_group.position.set(x, y, z);
        this.clove_group.scale.set(scale, scale, scale);

        parent.addToUpdateList(this);

        // setTimeout(() => {
        //     this.infinity();
        // }, 1000);
        // this.infinity();


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

        const { rotY, rotYSpeed, updateList } = this.state;

        // this.clove_group.rotation.y = (2 * Math.PI * timeStamp) / this.spin_speed;
        // 60 frames/sec * 60 for a min
        // this.clove_group.rotation.y += 2 * Math.PI / 90;
        //orig
        if (rotY) {
            this.clove_group.rotation.y += 2 * Math.PI / rotYSpeed;
        }




    }
}

export default Garlic;