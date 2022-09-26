import { FONT_SIZE } from "../config"

type Line = {
    /** 线段的 y 坐标 */
    y: number,
    /** 线段的 z 坐标 */
    z: number,
    /** 线段的起点 x 坐标（小） */
    x1: number,
    /** 线段的终点 x 坐标（大） */
    x2: number
}

type Area = {
    /** 平面的 z 坐标 */
    z: number,
    /** 平面中距原点最近的顶点的 x 坐标 */
    x1: number,
    /** 平面中距原点最近的顶点的 y 坐标 */
    y1: number,
    /** 平面中距原点最远的顶点的 x 坐标 */
    x2: number,
    /** 平面中距原点最远的顶点的 y 坐标 */
    y2: number
}

type Volumn = {
    /** 平面中距原点最近的顶点的 x 坐标 */
    x1: number,
    /** 平面中距原点最近的顶点的 y 坐标 */
    y1: number,
    /** 平面中距原点最近的顶点的 z 坐标 */
    z1: number
    /** 平面中距原点最远的顶点的 x 坐标 */
    x2: number,
    /** 平面中距原点最远的顶点的 y 坐标 */
    y2: number
    /** 平面中距原点最远的顶点的 z 坐标 */
    z2: number
}

export function compress(data: boolean[][][]): Volumn[] {
    let sum = 0;
    for (let i = 0; i < FONT_SIZE; i++) {
        for (let j = 0; j < FONT_SIZE; j++) {
            for (let k = 0; k < FONT_SIZE; k++) {
                if (data[i][j][k]) {
                    sum++;
                }
            }
        }
    }
    console.log(`Compress LV${0}, Cubes:`, sum)

    const lines = voxels2LinesFromX(data);
    console.log(`Compress LV${1}, Cubes:`, lines.length)

    const areas = lines2AreasFromY(lines);
    console.log(`Compress LV${2}, Cubes:`, areas.length)

    const volumns = areas2VolumesFromZ(areas)
    console.log(`Compress LV${3}, Cubes:`, volumns.length)

    return volumns;
}

function voxels2LinesFromX(voxels: boolean[][][]): Line[] {
    const res: Line[] = []
    for (let y = 0; y < FONT_SIZE; y++) {
        for (let z = 0; z < FONT_SIZE; z++) {
            let start = -1;
            for (let x = 0; x < FONT_SIZE; x++) {
                if (voxels[x][y][z]) {
                    if (start === -1) {
                        start = x;
                    }
                } else {
                    if (start !== -1) {
                        res.push({
                            y,
                            z,
                            x1: start,
                            x2: x - 1
                        })
                        start = -1
                    }
                }
            }
            if (start !== -1) {
                res.push({
                    y,
                    z,
                    x1: start,
                    x2: FONT_SIZE - 1
                })
            }
        }
    }
    return res
}

function lines2AreasFromY(lines: Line[]): Area[] {
    const res: Area[] = []
    for (let z = 0; z < FONT_SIZE; z++) {
        // 筛选出在该 z 平面中的所有条形立方体
        const thisLines: (Line | null)[] = lines.filter(line => line.z === z)
        for (let i = 0; i < thisLines.length; i++) {
            if (thisLines[i] === null) continue;
            const mergeable: Line[] = [thisLines[i]!];

            // 筛选出在该 z 平面沿 x 方向起始点相同的所有条形立方体
            for (let j = i + 1; j < thisLines.length; j++) {
                if (!thisLines[j]) continue;
                if (
                    thisLines[i]!.x1 === thisLines[j]!.x1 &&
                    thisLines[i]!.x2 === thisLines[j]!.x2
                ) {
                    mergeable.push(thisLines[j]!)
                    thisLines[j] = null;
                }
            }
            mergeable.sort((a, b) => a.y - b.y)

            // 筛选出在该 z 平面中沿 x 方向起始点相同，
            // 且在 y 方向上相邻（y 坐标连续）的所有条形立方体，
            // 然后合并为面形立方体并添加到 res 中 
            let start = 0;
            for (let i = 1; i < mergeable.length; i++) {
                if (mergeable[i].y - mergeable[i - 1].y !== 1) {
                    res.push({
                        z,
                        x1: mergeable[start].x1,
                        y1: mergeable[start].y,
                        x2: mergeable[start].x2,
                        y2: mergeable[i - 1].y
                    })
                    start = i;
                }
            }
            res.push({
                z,
                x1: mergeable[start].x1,
                y1: mergeable[start].y,
                x2: mergeable[start].x2,
                y2: mergeable[mergeable.length - 1].y
            })
        }
    }
    return res
}

function areas2VolumesFromZ(areas: (Area | null)[]): Volumn[] {
    const res: Volumn[] = []

    for (let i = 0; i < areas.length; i++) {
        if (!areas[i]) continue;
        const mergeable: Area[] = [areas[i]!]
        for (let j = i + 1; j < areas.length; j++) {
            if (!areas[j]) continue;
            if (
                areas[i]!.x1 === areas[j]!.x1 &&
                areas[i]!.x2 === areas[j]!.x2 &&
                areas[i]!.y1 === areas[j]!.y1 &&
                areas[i]!.y2 === areas[j]!.y2
            ) {
                mergeable.push(areas[j]!)
                areas[j] = null
            }
        }

        let start = 0;
        for (let i = 1; i < mergeable.length; i++) {
            if (mergeable[i].z - mergeable[i - 1].z !== 1) {
                res.push({
                    x1: mergeable[start].x1,
                    y1: mergeable[start].y1,
                    z1: mergeable[start].z,
                    x2: mergeable[start].x2,
                    y2: mergeable[start].y2,
                    z2: mergeable[i - 1].z
                })
                start = i;
            }
        }
        res.push({
            x1: mergeable[start].x1,
            y1: mergeable[start].y1,
            z1: mergeable[start].z,
            x2: mergeable[start].x2,
            y2: mergeable[start].y2,
            z2: mergeable[mergeable.length - 1].z
        })
    }

    return res
}
