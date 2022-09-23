import * as Babylon from '@babylonjs/core'

export function createAxises() {
    const radius = 100;
    const x = Babylon.MeshBuilder.CreateLines("x", {
        points: [
            new Babylon.Vector3(0, 0, 0),
            new Babylon.Vector3(radius, 0, 0)
        ],
    })
    x.color = Babylon.Color3.Red()

    const y = Babylon.MeshBuilder.CreateLines("y", {
        points: [
            new Babylon.Vector3(0, 0, 0),
            new Babylon.Vector3(0, radius, 0)
        ],
    })
    y.color = Babylon.Color3.Green()

    const z = Babylon.MeshBuilder.CreateLines("z", {
        points: [
            new Babylon.Vector3(0, 0, 0),
            new Babylon.Vector3(0, 0, radius)
        ],
    })
    z.color = Babylon.Color3.Blue()
}
