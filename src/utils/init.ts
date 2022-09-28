import * as Babylon from '@babylonjs/core'
import { voxelateCharacters } from '.';
import { FONT_SIZE } from '../config';
import { compress } from './compress';

export function createAxises() {
    const radius = FONT_SIZE;
    const x = Babylon.MeshBuilder.CreateLines("x", {
        points: [
            new Babylon.Vector3(0, 0, 0),
            new Babylon.Vector3(radius, 0, 0)
        ],
    }, scene)
    x.color = Babylon.Color3.Red()

    const y = Babylon.MeshBuilder.CreateLines("y", {
        points: [
            new Babylon.Vector3(0, 0, 0),
            new Babylon.Vector3(0, radius, 0)
        ],
    }, scene)
    y.color = Babylon.Color3.Green()

    const z = Babylon.MeshBuilder.CreateLines("z", {
        points: [
            new Babylon.Vector3(0, 0, 0),
            new Babylon.Vector3(0, 0, radius)
        ],
    }, scene)
    z.color = Babylon.Color3.Blue()
}

export function createCamera(canvas: HTMLCanvasElement) {
    const camera = new Babylon.ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new Babylon.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);
}

export function createModel(char1: string, char2: string) {
    const data = voxelateCharacters(char1, char2)
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
}

export function createLight() {
    new Babylon.HemisphericLight("light", new Babylon.Vector3(0, 1, 0), scene);
}

export function startRender(engine: Babylon.Engine) {
    const fps = document.getElementById("fps")!;

    engine.runRenderLoop(() => {
        fps.textContent = engine.getFps().toFixed(1);
        scene.render()
    })
    window.onresize = () => engine.resize()
}