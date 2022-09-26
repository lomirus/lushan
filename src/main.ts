import * as Babylon from '@babylonjs/core'

import './style.css'
import { voxelateCharacters } from './utils';
import { createAxises } from './utils/axis';
import { compress } from './utils/compress';

const canvas = document.querySelector('canvas')!;
const fps = document.getElementById("fps")!;

const engine = new Babylon.Engine(canvas, true);
const scene = new Babylon.Scene(engine);
const camera = new Babylon.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Babylon.Vector3(0, 0, 0),
    scene
);
camera.attachControl(canvas, true);

new Babylon.HemisphericLight("light", new Babylon.Vector3(0, 1, 0), scene);

engine.runRenderLoop(() => {
    fps.textContent = engine.getFps().toFixed(1);
    scene.render()
})
window.onresize = () => engine.resize()

const data = voxelateCharacters('⛩️', '⛩️')
const volumns = compress(data)

for (let i = 0; i < volumns.length; i++) {
    const volumn = volumns[i];
    const width = volumn.x2 - volumn.x1 + 1;
    const height = volumn.y2 - volumn.y1 + 1;
    const depth = volumn.z2 - volumn.z1 + 1;

    const box = Babylon.MeshBuilder.CreateBox("box", {
        width,
        height,
        depth
    }, scene);

    box.position.x = volumn.x1 + width / 2
    box.position.y = volumn.y1 + height / 2
    box.position.z = volumn.z1 + depth / 2
}

createAxises()