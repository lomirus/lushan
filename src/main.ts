import * as Babylon from '@babylonjs/core'

import { FONT_SIZE } from './config';
import './style.css'
import { voxelateCharacters } from './utils';

const canvas = document.querySelector('canvas')!;
const fps = document.getElementById("fps")!;

const data = voxelateCharacters('卜', '賣')

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

for (let i = 0; i < FONT_SIZE; i++) {
    for (let j = 0; j < FONT_SIZE; j++) {
        for (let k = 0; k < FONT_SIZE; k++) {
            if (data[i][j][k]) {
                const box = Babylon.MeshBuilder.CreateBox("box", {}, scene);
                box.position.x = i
                box.position.y = j
                box.position.z = k
            }
        }
    }
}
