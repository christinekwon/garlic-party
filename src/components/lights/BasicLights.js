import { Group, SpotLight, AmbientLight, HemisphereLight, DirectionalLight } from 'three';
import * as Dat from 'dat.gui';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        //   const dir = new SpotLight(0xffffff, 0.1, 7, 0.8, 1, 1);
        //   const ambi = new AmbientLight(0x000000, 1.32);
        //   // sky ground
        //   const hemi = new HemisphereLight(0x000000, 0x1eff00, 1.0);

        // 1.0 -> 0.1
        // color intensity distance angle penumbra decay
        // const dir = new SpotLight(0xfa9494, 0.1, 7, 0.8, 1, 1);

        // here
        const dir = new SpotLight(0xfa9494, 0.1, 7, 0.8, 1, 1);

        // color intensity
        const ambi = new AmbientLight(0x000000, 1.32);

        // sky ground
        const hemi = new HemisphereLight(0x000000, 0x000000, 1.0);

        dir.position.set(10, 10, 0);
        dir.target.position.set(0, 0, 0);

        this.add(ambi, dir);
        this.add(hemi);

        // here

        // earth lights
        // const ambi = new AmbientLight(0x000000, 1.0);
        // var light = new DirectionalLight(0xffffff, 1);
        // light.position.set(5, 0, -5);
        // this.add(light)
        // this.add(ambi);


        //   var params = {
        //       // cube
        //       dir: 0xfa9494,
        //       ambi: 0x000000,
        //       hemi0: 0x000000,
        //       hemi1: 0x000000,

        //       // // cube
        //       // dir: 0xffffff,
        //       // ambi: 0x000000,
        //       // hemi0: 0x000000,
        //       // hemi1: 0x1eff00,

        //       // galaxy
        //       // dir: 0xffffff,
        //       // ambi: 0x000000,
        //       // hemi0: 0xffffff,
        //       // hemi1: 0xfff000
        //   };

        //   var gui = new Dat.GUI();

        //   var folder = gui.addFolder( 'MATERIAL' );

        //   folder.addColor( params, 'dir' )
        //         .onChange( function() { dir.color.set( params.dir ); } );
        //   folder.addColor( params, 'ambi' )
        //         .onChange( function() { ambi.color.set( params.ambi ); } );
        //   folder.addColor( params, 'hemi0' )
        //         .onChange( function() { hemi.color.set( params.hemi0 ); } );
        //   folder.addColor( params, 'hemi1' )
        //         .onChange( function() { hemi.groundColor.set( params.hemi1 ); } );

        //   folder.open();
    }
}

export default BasicLights;