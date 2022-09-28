import * as Babylon from '@babylonjs/core'

import './style.css'
import {
    createAxises,
    createCamera,
    createGround,
    createLight,
    createMaterial,
    createModel,
    startRender
} from './utils/init';

const canvas = document.querySelector('canvas')!;

const engine = new Babylon.Engine(canvas, true);
globalThis.scene = new Babylon.Scene(engine);

const pbr = createMaterial()

createLight();

createModel('口', '口', pbr);
createGround(pbr);
createAxises();
createCamera(canvas);

startRender(engine)
