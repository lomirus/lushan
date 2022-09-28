import * as Babylon from '@babylonjs/core'

import './style.css'
import {
    createAxises,
    createCamera,
    createGround,
    createLight,
    createModel,
    startRender
} from './utils/init';

const canvas = document.querySelector('canvas')!;

const engine = new Babylon.Engine(canvas, true);
globalThis.scene = new Babylon.Scene(engine);

createModel('⛩️', '⛩️')
createAxises();
createGround();
createLight();
createCamera(canvas);

startRender(engine)
