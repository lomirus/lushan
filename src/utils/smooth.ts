import { FONT_SIZE } from "../config";
import * as Babylon from '@babylonjs/core'
import { VertexData } from "@babylonjs/core";

type Plane = {
    rx: number,
    ry: number,
    rz: number,
    px: number,
    py: number,
    pz: number,
}

const faceCubes = [
    [0, 0, -1],
    [0, 0, 1],

    [0, -1, 0],
    [0, 1, 0],

    [-1, 0, 0],
    [1, 0, 0]
] as const;

function adjacentEdgeCubesToFaceCube(faceCube: readonly [number, number, number]): [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
] {
    if (faceCube[0] === -1 || faceCube[0] === 1) {
        return [
            [0, -1, -1],
            [0, -1, 1],
            [0, 1, -1],
            [0, 1, 1],
        ]
    } else if (faceCube[1] === -1 || faceCube[1] === 1) {
        return [
            [-1, 0, -1],
            [-1, 0, 1],
            [1, 0, -1],
            [1, 0, 1],
        ]
    } else {
        return [
            [-1, -1, 0],
            [-1, 1, 0],
            [1, -1, 0],
            [1, 1, 0],
        ]
    }
}

function getCDFromEdgeAndFaceCube(
    edgeCube: readonly [number, number, number],
    faceCube: readonly [number, number, number]
): [number[], number[]] {
    if (edgeCube[0] === 0) {
        let same = edgeCube[1] === edgeCube[2];
        const c = [1, same ? 1 : 0, same ? 0 : 0];
        const d = [1, same ? 0 : 1, same ? 1 : 1];
        return faceCube[0] === 1 ?
            [c, d] :
            [
                c.map(v => v === 0 ? 1 : 0),
                d.map(v => v === 0 ? 1 : 0)
            ]
    } else if (edgeCube[1] === 0) {
        let same = edgeCube[0] === edgeCube[2];
        const c = [same ? 1 : 0, 1, same ? 0 : 0];
        const d = [same ? 0 : 1, 1, same ? 1 : 1];
        return faceCube[1] === 1 ?
            [c, d] :
            [
                c.map(v => v === 0 ? 1 : 0),
                d.map(v => v === 0 ? 1 : 0)
            ]
    } else {
        let same = edgeCube[0] === edgeCube[1];
        const c = [same ? 1 : 0, same ? 0 : 0, 1];
        const d = [same ? 0 : 1, same ? 1 : 1, 1];
        return faceCube[2] === 1 ?
            [c, d] :
            [
                c.map(v => v === 0 ? 1 : 0),
                d.map(v => v === 0 ? 1 : 0)
            ]
    }
}

function getPlaneRotation(data: boolean[][][], x: number, y: number, z: number) {
    const up = data[x][y + 1][z]
    const down = data[x][y - 1][z]
    const left = data[x - 1][y][z]
    const right = data[x + 1][y][z]
    const front = data[x][y][z - 1]
    const back = data[x][y][z + 1]

    if (up && left) {
        return [-1, -2, 0]
    } else if (left && down) {
        return [1, -2, 0]
    } else if (down && right) {
        return [1, 2, 0]
    } else if (right && up) {
        return [-1, 2, 0]
    } else if (up && front) {
        return [-3, 0, 0]
    } else if (front && down) {
        return [3, 0, 0]
    } else if (down && back) {
        return [1, 0, 0]
    } else if (back && up) {
        return [-1, 0, 0]
    } else if (front && left) {
        return [0, -3, 2]
    } else if (front && right) {
        return [0, 3, 2]
    } else if (back && left) {
        return [0, -1, 2]
    } else if (back && right) {
        return [0, 1, 2]
    } else {
        return []
    }
}

export function smooth(data: boolean[][][]): [Plane[], VertexData] {
    const planes: Plane[] = [];
    const vertexData = new Babylon.VertexData();
    const positions: Babylon.Nullable<Babylon.FloatArray> = [];
    // const uvs = [0]
    // let sum = 0;
    for (let x = 1; x < FONT_SIZE - 1; x++) {
        for (let y = 1; y < FONT_SIZE - 1; y++) {
            voxel:
            for (let z = 1; z < FONT_SIZE - 1; z++) {
                if (data[x][y][z]) continue;

                const rotation = getPlaneRotation(data, x, y, z);
                if (rotation.length !== 0) {
                    planes.push({
                        rx: rotation[0] * Math.PI / 4,
                        ry: rotation[1] * Math.PI / 4,
                        rz: rotation[2] * Math.PI / 4,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    continue voxel;
                }

                for (let i = 0; i < faceCubes.length; i++) {
                    const faceCube = faceCubes[i];
                    const [fx, fy, fz] = faceCube;
                    if (!data[x + fx][y + fy][z + fz]) continue;

                    const adjacentEdgeCubes = adjacentEdgeCubesToFaceCube(faceCube);
                    for (let j = 0; j < adjacentEdgeCubes.length; j++) {
                        const adjacentEdgeCube = adjacentEdgeCubes[j];
                        const [ex, ey, ez] = adjacentEdgeCube;
                        if (!data[x + ex][y + ey][z + ez]) continue;

                        const [c, d] = getCDFromEdgeAndFaceCube(adjacentEdgeCube, faceCube)
                        positions.push(
                            (fx - ex === -1) ? x : x + 1,
                            (fy - ey === -1) ? y : y + 1,
                            (fz - ez === -1) ? z : z + 1,
                        )
                        positions.push(
                            (ex - fx === -1) ? x : x + 1,
                            (ey - fy === -1) ? y : y + 1,
                            (ez - fz === -1) ? z : z + 1,
                        )
                        positions.push(
                            x + c[0],
                            y + c[1],
                            z + c[2],
                        )

                        positions.push(
                            (ex - fx === -1) ? x : x + 1,
                            (ey - fy === -1) ? y : y + 1,
                            (ez - fz === -1) ? z : z + 1,
                        )
                        positions.push(
                            (fx - ex === -1) ? x : x + 1,
                            (fy - ey === -1) ? y : y + 1,
                            (fz - ez === -1) ? z : z + 1,
                        )
                        positions.push(
                            x + d[0],
                            y + d[1],
                            z + d[2],
                        )
                    }
                }
            }
        }
    }
    // console.log(sum)
    vertexData.positions = positions;
    vertexData.indices = Array.from(
        { length: positions.length / 3 },
        (_, i) => i
    )
    vertexData.normals = []
    VertexData.ComputeNormals(positions, vertexData.indices, vertexData.normals);
    // vertexData.uvs = uvs

    return [planes, vertexData];
}