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
import CLOUDS from "./textures/Clouds/clouds.jpg";
import GALAXY from "./textures/Galaxy/galaxy.png";
import GALAXY1 from "./textures/Galaxy/galaxy1.png";
import CLOUD from "./textures/Cloud/cloud.png";
import RAINBOW from "./textures/Rainbow/rainbow.png";
import RAINBOW_SQ from "./textures/Rainbow/rainbow_sq.png";
import EARTH from "./textures/Earth/earthmap.jpg";
import BUMP from "./textures/Earth/earthbump.jpg";

class MainScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            color: 0,
            count: 1,
            garlic_count: 1,
            friend: false,
            rotateZ: false,
        };

        // lite pink 0xffd9f0
        // darker pink 0xffa6db
        // lav e3c4ff
        // purp c280ff
        // mint bffff9
        // dark mint 70fff2

        this.interval = 200;

        const colors = [
            // [255, 255, 255],
            // [0, 0, 0],
            // [0, 0, 0]
            [255, 217, 240],
            [255, 194, 231],
            [234, 212, 255],
            [220, 181, 255],
            [255, 222, 222],
            [255, 204, 204],
            [217, 255, 251],
            [289, 255, 249],

            // 0xffd9f0,
            // 0xffa6db,
            // 0xead4ff,
            // 0xc280ff,
            // 0xbffff9,
            // 0x70fff2,
            // ffdede ffcccc
        ]


        colors.forEach(color => {
            color[0] = color[0] / 255.0;
            color[1] = color[1] / 255.0;
            color[2] = color[2] / 255.0;
        })

        this.colors = colors;

        // array of xyz
        // array of arrays

        this.solo_scale = 1;
        this.friend_scale = 0.25;


        // light blue
        this.background = new Color(0xe3f4ff);

        // // midnight
        // this.background = new Color(0x040017);

        // make earth
        // let geometry = new THREE.SphereGeometry(1, 32, 32);

        // let material = new THREE.MeshPhongMaterial({
        //     map: THREE.ImageUtils.loadTexture(EARTH),
        //     bumpMap: THREE.ImageUtils.loadTexture(BUMP),
        //     bumpScale: 0.05
        // });
        // let sphere = new THREE.Mesh(geometry, material);

        // sphere.position.set(0, 0, 0);
        // console.log(sphere);
        // this.add(sphere);

        // this.earth = sphere;

        // black
        // this.background = new Color(0x89ADFF);
        this.background = new Color(0x000000);

        var metalMap = new CubeTextureLoader()
            .load([
                POSX, NEGX,
                POSY, NEGY,
                POSZ, NEGZ
            ]);
        // console.log(GALAXY);
        // var metalMap = new TextureLoader().load(RAINBOW);
        // metalMap.mapping = THREE.EquirectangularReflectionMapping;
        // var metalMap = new CubeTextureLoader()
        // .load( [
        //     RAINBOW_SQ, RAINBOW_SQ,
        //     RAINBOW_SQ, RAINBOW_SQ,
        //     RAINBOW_SQ, RAINBOW_SQ
        // ] );


        this.garlic = new Garlic(this, metalMap, 0, 0, 0, 1);
        this.garlic.spin_speed = 60000;
        this.add(this.garlic);
        this.garlic.visible = true;

        // this.garlic.infinity();

        this.max_count = 6;
        this.friend_group = new THREE.Group();

        let garlic;

        // for (let i = 0; i < this.max_count; i++) {
        //     garlic = new Garlic(this, metalMap, 0, bubPos, 0, this.friend_scale);
        //     garlic.spin_speed = 6000;
        //     garlic.turn2top(0);
        //     if (i == 0) {
        //         garlic.visible = true;
        //         // garlic.rotate(Math.random() * (2 * Math.PI));
        //         // setTimeout(() => {
        //         //     garlic.rotate(Math.random() * (2 * Math.PI));
        //         // }, 1000);
        //     } else {
        //         garlic.visible = false;
        //     }
        //     this.friend_group.add(garlic);
        // }

        // let start;
        // let target;
        // for (let i = 0; i < this.max_count; i++) {
        //     start = this.friend_group.children[i].rotation.z;
        //     target = 2 * Math.PI / this.max_count * i;
        //     this.turn_friend(i, 0, target);

        // }

        // this.add(this.friend_group);
        // this.friend_group.visible = false;

        const lights = new BasicLights();
        this.add(lights);

        this.check.bind(this);

        // this.pulse.bind(this);
        this.default.bind(this);
        this.init_solo_mode.bind(this);
        this.init_friend_mode.bind(this);
        this.rot360.bind(this);
        this.turn_friend.bind(this);
        this.reset_friends.bind(this);
        this.add_friend.bind(this);
        this.remove_friend.bind(this);
        this.show_friends.bind(this);
        this.toggle_rotateZ.bind(this);
        this.close.bind(this);
        this.change_scale.bind(this);
        this.check_real_time.bind(this);
        this.infinity.bind(this);
        this.jiggle.bind(this);

        this.jiggle();
    }

    // turn2top, 
    x_top_slow() {

    }

    xz_top_fast() {

    }

    xz_slant_fast() {

    }

    xz_rotate_fast() {

    }

    xz_side_fast() {

    }

    z_jiggle() {

    }

    jiggle() {
        this.garlic.jiggle();
    }

    bounce() {

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
    turn_friend(i, z0, z1) {
        var start = { z: z0 };
        var target = { z: z1 };
        new TWEEN.Tween(start)
            .to(target, 3000)
            .onUpdate(() => {
                this.friend_group.children[i].rotation.z = start.z;
            })
            .start();
    }

    reset_friends() {
        this.state.friend = true;
        this.state.garlic_count = 1;
        for (let i = 0; i < this.max_count; i++) {
            this.friend_group.children[i].default_cloves();
            // this.friend_group.children[i].position.set(0, this.bubPos, 0);
            if (i == 0) {
                this.friend_group.children[i].visible = true;
            } else {
                this.friend_group.children[i].visible = false;
            }
        }
    }

    add_friend() {
        this.state.rotateZ = true;

        const current = this.state.garlic_count;
        if (current >= this.max_count) {
            return;
        }
        const next = current + 1;
        var starts = [];
        var targets = [];
        for (let i = 0; i < current; i++) {
            // starts.push(this.friend_group.children[i].position.z);
            // targets.push(2 * Math.PI / next * i);
            // this.friend_group.children[i].rotation.z = 2 * Math.PI / next * i;

            this.turn_friend(i, this.friend_group.children[i].rotation.z, 2 * Math.PI / next * i);
        }
        // 360 / total times total - 1


        this.friend_group.children[current].rotation.z = 2 * Math.PI / (next) * (current);
        this.friend_group.children[current].scale.set(0, 0, 0);
        this.friend_group.children[current].visible = true;


        var start = { x: 0, y: 0, z: 0 };
        var target = { x: 1, y: 1, z: 1 };
        new TWEEN.Tween(start)
            .to(target, 3000)
            .onUpdate(() => {
                this.friend_group.children[current].scale.x = start.x;
                this.friend_group.children[current].scale.y = start.y;
                this.friend_group.children[current].scale.z = start.z;
            })
            .start();
        setTimeout(() => {
            this.friend_group.children[current].rotate(Math.random() * (2 * Math.PI), 2000);
        }, 3000);
        this.state.garlic_count = next;
    }

    remove_friend() {
        const current = this.state.garlic_count;
        if (current <= 1) {
            return;
        }

        const next = current - 1;
        this.friend_group.children[next].close(2000);

        for (let i = 0; i < current; i++) {
            // starts.push(this.friend_group.children[i].position.z);
            // targets.push(2 * Math.PI / next * i);
            // this.friend_group.children[i].rotation.z = 2 * Math.PI / next * i;
            setTimeout(() => {
                this.turn_friend(i, this.friend_group.children[i].rotation.z, 2 * Math.PI / next * i);
            }, 2000);
        }


        var start = { x: 1, y: 1, z: 1 };
        var target = { x: 0, y: 0, z: 0 };

        setTimeout(() => {
            this.change_scale(next, start, target);

        }, 2000);
        setTimeout(() => {
            this.friend_group.children[next].visible = false;
        }, 5000);

        this.state.garlic_count = next;
    }

    change_scale(index, start, target) {
        new TWEEN.Tween(start)
            .to(target, 3000)
            .onUpdate(() => {
                // console.log(this.friend_group.children[next].rotation);
                this.friend_group.children[index].scale.x = start.x;
                this.friend_group.children[index].scale.y = start.y;
                this.friend_group.children[index].scale.z = start.z;
            })
            .start();
    }

    show_friends(count) {
        // this.state.rotateZ = true;
        this.state.garlic_count = count;
        let start;
        let target;

        for (let i = 0; i < count; i++) {
            this.friend_group.children[i].default_cloves();
            this.friend_group.children[i].visible = true;
            start = this.friend_group.children[i].rotation.z;
            target = 2 * Math.PI / count * i;
            this.turn_friend(i, 0, target);
            setTimeout(() => {
                this.state.rotateZ = true;
                this.friend_group.children[i].rotate(Math.random() * (2 * Math.PI), 2000);
            }, 3000);
        }
        for (let i = count; i < this.max_count; i++) {
            this.friend_group.children[i].visible = false;
        }
    }

    close() {
        let count = this.state.garlic_count;
        let start;
        let target;

        for (let i = count - 1; i >= 0; i--) {
            this.friend_group.children[i].close(2000);

            setTimeout(() => {
                start = this.friend_group.children[i].rotation.z;
                target = 0;
                this.turn_friend(i, start, target);
            }, 2000);
            setTimeout(() => {
                this.state.rotateZ = false;

            }, 5000);
        }
    }

    init_solo_mode() {
        this.default();
        this.state.friend = false;
        this.garlic.state.friend = false;
        this.state.rotateZ = false;
        this.friend_group.visible = false;
        this.garlic.visible = true;
        this.rotation.z = 0;
    }

    init_friend_mode() {
        this.state.friend = true;
        this.reset_friends();
        this.friend_group.visible = true;
        this.garlic.visible = false;
        for (let i = 0; i < this.max_count; i++) {
            this.friend_group.children[i].state.friend = true;
        }
    }



    decay() {
        this.garlic.decay();
    }

    check(hours) {
        // pretty flower
        // 9 * Math.PI / 12;
        const angle = hours * Math.PI / 12;

        // const rotInterval = 50;
        // const maxRot = Math.PI / 6;
        //  * 20

        // const rotInterval = 150;
        // const maxRot = 5 * Math.PI / 6;
        //  * 16.75

        // const rotInterval = 200;
        // const maxRot = 10 * Math.PI / 6;
        // for (let i = 1; i < this.max_count; i++) {
        //     this.friend_group.children[i].visible = false;
        // }
        // this.friend_group.children[0].check(angle);
        this.garlic.check(angle);
    }
    infinity() {
        this.garlic.infinity();
    }

    rot90() {
        this.garlic.rotate(Math.PI);

        for (let clove of this.Cloves) {
            clove.maxRot = Math.PI / 2;
            clove.rotInterval = 50.0;
            clove.rotate();
        }
    }


    rot180() {

        for (let clove of this.Cloves) {
            clove.maxRot = Math.PI;
            clove.rotInterval = 100.0;
            clove.rotate();
        }
    }

    rot360() {
        // for (let i = 1; i < this.max_count; i++) {
        //     this.friend_group.children[i].visible = false;
        // }
        // this.friend_group.children[0].rotate(2 * Math.PI);
        this.garlic.rotate(2 * Math.PI, 10000);

        // for (let clove of this.Cloves) {
        //     clove.maxRot = Math.PI * 2;
        //     // clove.rotInterval = 6000.0
        //     clove.rotInterval = 200.0;
        //     clove.rotate();
        // }
    }

    rotrandom() {
        let count = Math.floor(Math.random() * this.Cloves.length) + 1;
        console.log(count);
        for (let i = 0; i < count; i++) {
            this.Cloves[i].maxRot = Math.PI / 2;
            setTimeout(() => {
                this.Cloves[i].rotate();
            }, i * 1000);
        }
    }

    pulse() {
        for (let i = 0; i < this.Cloves.length; i++) {
            setTimeout(() => {
                this.Cloves[i].pulse();
            }, i * 500);
        }
    }

    reset() {
        // for (let i = 1; i < this.max_count; i++) {
        //     this.friend_group.children[i].visible = false;
        // }
        // this.friend_group.children[0].position.set(0, 0, 0);
        // this.friend_group.children[0].reset();
        this.garlic.reset();
    }

    default () {
        this.garlic.default();
    }


    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;


        // orig
        if (this.state.rotateZ == true) {
            // this.rotation.z = (rotationSpeed * timeStamp) / 6000;
            // this.rotation.z += 0.005;
            // 1000: 1 rot ~15 seconds
            // 30 sec
            // 60 frames per sec
            this.rotation.z += 2 * Math.PI / 1800;
        }

        // this.earth.rotation.y = (2 * Math.PI * timeStamp) / 5000;
        // this.rotation.y = (2 * Math.PI * timeStamp) / 2000;
        // // every minute
        // this.rotation.y = (2 * Math.PI * timeStamp) / 60000;
        // this.rotation.z = (2 * Math.PI * timeStamp) / 60000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        // if (this.state.count == this.colors.length * this.interval) {
        //     this.state.count = 0;
        //     this.state.color = 0;
        // }
        // else if (this.state.count % this.interval == 0) {
        //     this.state.color += 1;
        //     this.state.count += 1;
        // }
        // let distance = (this.state.count % this.interval)
        // // change bg
        // if (this.state.color < this.colors.length - 1) {
        //     let color = new Color(
        //         this.colors[this.state.color][0] + (this.state.count % this.interval) * ((this.colors[this.state.color + 1][0] - this.colors[this.state.color][0]) / this.interval),
        //         this.colors[this.state.color][1] + (this.state.count % this.interval) * ((this.colors[this.state.color + 1][1] - this.colors[this.state.color][1]) / this.interval),
        //         this.colors[this.state.color][2] + (this.state.count % this.interval) * ((this.colors[this.state.color + 1][2] - this.colors[this.state.color][2]) / this.interval)
        //     );
        //     this.background = color;
        // }
        // else {
        //     let color = new Color(
        //         this.colors[this.state.color][0] + (this.state.count % this.interval) * ((this.colors[0][0] - this.colors[this.state.color][0]) / this.interval),
        //         this.colors[this.state.color][1] + (this.state.count % this.interval) * ((this.colors[0][1] - this.colors[this.state.color][1]) / this.interval),
        //         this.colors[this.state.color][2] + (this.state.count % this.interval) * ((this.colors[0][2] - this.colors[this.state.color][2]) / this.interval)
        //     );
        //     this.background = color;
        // }

        // this.state.count++;
    }


}

export default MainScene;