import { FONT_SIZE } from "../config";

type Plane = {
    rx: number,
    ry: number,
    rz: number,
    px: number,
    py: number,
    pz: number,
}

export function smooth(data: boolean[][][]): Plane[] {
    const planes: Plane[] = [];

    for (let x = 1; x < FONT_SIZE - 1; x++) {
        for (let y = 1; y < FONT_SIZE - 1; y++) {
            for (let z = 1; z < FONT_SIZE - 1; z++) {
                if (data[x][y][z]) continue;

                const up = data[x][y + 1][z]
                const down = data[x][y - 1][z]
                const left = data[x - 1][y][z]
                const right = data[x + 1][y][z]
                const front = data[x][y][z - 1]
                const back = data[x][y][z + 1]

                if (up && left) {
                    planes.push({
                        rx: -Math.PI / 4,
                        ry: -Math.PI / 2,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x][y + 1][z + 1] && data[x - 1][y][z + 1]) {

                    }
                    if (data[x][y + 1][z - 1] && data[x - 1][y][z - 1]) {

                    }

                } else if (left && down) {
                    planes.push({
                        rx: Math.PI / 4,
                        ry: -Math.PI / 2,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x - 1][y][z + 1] && data[x][y - 1][z + 1]) {

                    }
                    if (data[x - 1][y][z - 1] && data[x][y - 1][z - 1]) {

                    }

                } else if (down && right) {
                    planes.push({
                        rx: Math.PI / 4,
                        ry: Math.PI / 2,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x][y - 1][z + 1] && data[x + 1][y][z + 1]) {

                    }
                    if (data[x][y - 1][z - 1] && data[x + 1][y][z - 1]) {

                    }
                } else if (right && up) {
                    planes.push({
                        rx: -Math.PI / 4,
                        ry: Math.PI / 2,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x + 1][y][z + 1] && data[x][y + 1][z + 1]) {

                    }
                    if (data[x + 1][y][z - 1] && data[x][y + 1][z - 1]) {

                    }
                } else if (up && front) {
                    planes.push({
                        rx: -Math.PI / 4 * 3,
                        ry: 0   ,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x + 1][y + 1][z] && data[x + 1][y][z - 1]) {

                    }
                    if (data[x - 1][y + 1][z] && data[x - 1][y][z - 1]) {

                    }
                } else if (front && down) {
                    planes.push({
                        rx: Math.PI / 4 * 3,
                        ry: 0   ,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x + 1][y][z - 1] && data[x + 1][y - 1][z]) {

                    }
                    if (data[x - 1][y][z - 1] && data[x - 1][y - 1][z]) {

                    }
                } else if (down && back) {
                    planes.push({
                        rx: Math.PI / 4,
                        ry: 0   ,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x + 1][y - 1][z] && data[x + 1][y][z + 1]) {

                    }
                    if (data[x - 1][y - 1][z] && data[x - 1][y][z + 1]) {

                    }
                } else if (back && up) {
                    planes.push({
                        rx: -Math.PI / 4,
                        ry: 0   ,
                        rz: 0,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x + 1][y][z + 1] && data[x + 1][y + 1][z]) {

                    }
                    if (data[x - 1][y][z + 1] && data[x - 1][y + 1][z]) {

                    }
                } else if (front && left) {
                    planes.push({
                        rx: 0,
                        ry: -Math.PI / 4 * 3,
                        rz: Math.PI / 2,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x][y + 1][z - 1] && data[x - 1][y + 1][z]) {

                    }
                    if (data[x][y - 1][z - 1] && data[x - 1][y - 1][z]) {

                    }
                } else if (front && right) {
                    planes.push({
                        rx: 0,
                        ry: Math.PI / 4 * 3,
                        rz: Math.PI / 2,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x][y + 1][z - 1] && data[x + 1][y + 1][z]) {

                    }
                    if (data[x][y - 1][z - 1] && data[x + 1][y - 1][z]) {

                    }
                } else if (back && left) {
                    planes.push({
                        rx: 0,
                        ry: -Math.PI / 4 ,
                        rz: Math.PI / 2,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x][y + 1][z + 1] && data[x - 1][y + 1][z]) {

                    }
                    if (data[x][y - 1][z + 1] && data[x - 1][y - 1][z]) {

                    }
                } else if (back && right) {
                    planes.push({
                        rx: 0,
                        ry: Math.PI / 4 ,
                        rz: Math.PI / 2,
                        px: x,
                        py: y,
                        pz: z,
                    })
                    if (data[x][y + 1][z + 1] && data[x + 1][y + 1][z]) {

                    }
                    if (data[x][y - 1][z + 1] && data[x + 1][y - 1][z]) {

                    }
                } else if (up) {
                    if (
                        data[x - 1][y + 1][z] &&
                        data[x][y + 1][z - 1] &&
                        data[x - 1][y][z - 1]
                    ) {

                    } else if (
                        data[x - 1][y + 1][z] &&
                        data[x][y + 1][z + 1] &&
                        data[x - 1][y][z + 1]
                    ) {

                    } else if (
                        data[x + 1][y + 1][z] &&
                        data[x][y + 1][z + 1] &&
                        data[x + 1][y][z + 1]
                    ) {

                    } else if (
                        data[x + 1][y + 1][z] &&
                        data[x][y + 1][z + 1] &&
                        data[x + 1][y][z + 1]
                    ) {

                    }
                } else if (down) {
                    if (
                        data[x - 1][y - 1][z] &&
                        data[x][y - 1][z - 1] &&
                        data[x - 1][y][z - 1]
                    ) {

                    } else if (
                        data[x - 1][y - 1][z] &&
                        data[x][y - 1][z + 1] &&
                        data[x - 1][y][z + 1]
                    ) {

                    } else if (
                        data[x + 1][y - 1][z] &&
                        data[x][y - 1][z + 1] &&
                        data[x + 1][y][z + 1]
                    ) {

                    } else if (
                        data[x + 1][y - 1][z] &&
                        data[x][y - 1][z + 1] &&
                        data[x + 1][y][z + 1]
                    ) {

                    }
                } else if (left) {
                    if (
                        data[x - 1][y + 1][z] &&
                        data[x - 1][y][z - 1] &&
                        data[x][y + 1][z - 1]
                    ) {

                    } else if (
                        data[x - 1][y - 1][z] &&
                        data[x - 1][y][z - 1] &&
                        data[x][y - 1][z - 1]
                    ) {

                    } else if (
                        data[x - 1][y - 1][z] &&
                        data[x - 1][y][z + 1] &&
                        data[x][y - 1][z + 1]
                    ) {

                    } else if (
                        data[x - 1][y + 1][z] &&
                        data[x - 1][y][z + 1] &&
                        data[x][y + 1][z + 1]
                    ) {

                    }
                } else if (right) {
                    if (
                        data[x + 1][y + 1][z] &&
                        data[x + 1][y][z - 1] &&
                        data[x][y + 1][z - 1]
                    ) {

                    } else if (
                        data[x + 1][y - 1][z] &&
                        data[x + 1][y][z - 1] &&
                        data[x][y - 1][z - 1]
                    ) {

                    } else if (
                        data[x + 1][y - 1][z] &&
                        data[x + 1][y][z + 1] &&
                        data[x][y - 1][z + 1]
                    ) {

                    } else if (
                        data[x + 1][y + 1][z] &&
                        data[x + 1][y][z + 1] &&
                        data[x][y + 1][z + 1]
                    ) {

                    }
                } else if (front) {
                    if (
                        data[x][y + 1][z - 1] &&
                        data[x - 1][y][z - 1] &&
                        data[x - 1][y + 1][z]
                    ) {

                    } else if (
                        data[x][y - 1][z - 1] &&
                        data[x - 1][y][z - 1] &&
                        data[x - 1][y - 1][z]
                    ) {

                    } else if (
                        data[x][y - 1][z - 1] &&
                        data[x + 1][y][z - 1] &&
                        data[x + 1][y - 1][z]
                    ) {

                    } else if (
                        data[x][y + 1][z - 1] &&
                        data[x + 1][y][z - 1] &&
                        data[x + 1][y + 1][z]
                    ) {

                    }
                } else if (back) {
                    if (
                        data[x][y + 1][z + 1] &&
                        data[x - 1][y][z + 1] &&
                        data[x - 1][y + 1][z]
                    ) {

                    } else if (
                        data[x][y - 1][z + 1] &&
                        data[x - 1][y][z + 1] &&
                        data[x - 1][y - 1][z]
                    ) {

                    } else if (
                        data[x][y - 1][z + 1] &&
                        data[x + 1][y][z + 1] &&
                        data[x + 1][y - 1][z]
                    ) {

                    } else if (
                        data[x][y + 1][z + 1] &&
                        data[x + 1][y][z + 1] &&
                        data[x + 1][y + 1][z]
                    ) {

                    }
                }
            }
        }
    }

    return planes;
}