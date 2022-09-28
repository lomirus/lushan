import * as Babylon from '@babylonjs/core'
import { voxelateCharacters } from '.';
import { FONT_SIZE } from '../config';
import { compress } from './compress';

import albedo from "../assets/pbr/albedo.png"
import metallic from "../assets/pbr/metallic.png"
import normalOgl from "../assets/pbr/normal-ogl.png"

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
        FONT_SIZE * 2,
        new Babylon.Vector3(FONT_SIZE / 2, FONT_SIZE / 2, FONT_SIZE / 2),
        scene
    );
    camera.attachControl(canvas, true);
}

export function createModel(char1: string, char2: string, pbr: Babylon.PBRMaterial) {
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

        box.material = pbr;

        shadowGenerator.getShadowMap()?.renderList?.push(box)
        box.receiveShadows = true;
    }
}

export function createLight() {
    const light = new Babylon.PointLight(
        "light",
        new Babylon.Vector3(FONT_SIZE / 2, FONT_SIZE * 2, FONT_SIZE / 2),
        scene
    );
    light.intensity = 100000;
    globalThis.shadowGenerator = new Babylon.ShadowGenerator(1024, light);

    const env = Babylon.CubeTexture.CreateFromPrefilteredData('/environment.env', scene)

    scene.environmentTexture = env;
    scene.createDefaultSkybox(env, true);
}

export function createGround(pbr: Babylon.PBRMaterial) {
    const ground = Babylon.MeshBuilder.CreateGround('ground', {
        width: FONT_SIZE * 2,
        height: FONT_SIZE * 2,
    })
    ground.position.x = FONT_SIZE / 2;
    ground.position.z = FONT_SIZE / 2;

    ground.material = pbr;

    shadowGenerator.getShadowMap()?.renderList?.push(ground)
    ground.receiveShadows = true;
}

export function startRender(engine: Babylon.Engine) {
    const fps = document.getElementById("fps")!;

    engine.runRenderLoop(() => {
        fps.textContent = engine.getFps().toFixed(1);
        scene.render()
    })
    window.onresize = () => engine.resize()
}

export function createMaterial(): Babylon.PBRMaterial {
    const pbr = new Babylon.PBRMaterial("pbr", scene);

    pbr.roughness = 1
    pbr.albedoTexture = new Babylon.Texture(albedo, scene);
    pbr.bumpTexture = new Babylon.Texture(normalOgl, scene);
    pbr.metallicTexture = new Babylon.Texture(metallic, scene);

    return pbr;
}