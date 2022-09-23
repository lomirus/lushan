const FONT_SIZE = 64;

function voxelizeByAA(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[FONT_SIZE - y - 1][z];
                let t2 = char2[FONT_SIZE - y - 1][FONT_SIZE - x - 1];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

function voxelizeByAB(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[FONT_SIZE - y - 1][z];
                let t2 = char2[x][FONT_SIZE - y - 1];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

function voxelizeByAC(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[FONT_SIZE - y - 1][z];;
                let t2 = char2[FONT_SIZE - x - 1][y];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

function voxelizeByAD(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[x][z];
                let t2 = char2[FONT_SIZE - y - 1][FONT_SIZE - x - 1];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

function voxelizeByBA(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[FONT_SIZE - y - 1][z];
                let t2 = char2[z][FONT_SIZE - x - 1];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

function voxelizeByBB(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[FONT_SIZE - y - 1][z];
                let t2 = char2[x][z];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

function voxelizeByBC(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[FONT_SIZE - y - 1][FONT_SIZE - x - 1];
                let t2 = char2[x][z];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

function voxelizeByBD(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): boolean[][][] {
    let res: boolean[][][] = new Array(FONT_SIZE);
    for (let x = 0; x < FONT_SIZE; x++) {
        res[x] = new Array(FONT_SIZE);
        for (let y = 0; y < FONT_SIZE; y++) {
            res[x][y] = new Array(FONT_SIZE);
            for (let z = 0; z < FONT_SIZE; z++) {
                let t1 = char1[FONT_SIZE - z - 1][FONT_SIZE - y - 1];
                let t2 = char2[FONT_SIZE - x - 1][y];
                res[x][y][z] = t1 && t2
            }
        }
    }

    return res;
}

export function voxelize(
    char1: readonly boolean[][],
    char2: readonly boolean[][],
    orientation: number
): boolean[][][] {
    if (orientation === 0) {
        return voxelizeByAA(char1, char2);
    } else if (orientation === 1) {
        return voxelizeByAB(char1, char2);
    } else if (orientation === 2) {
        return voxelizeByAC(char1, char2);
    } else if (orientation === 3) {
        return voxelizeByAD(char1, char2);
    } else if (orientation === 4) {
        return voxelizeByBA(char1, char2);
    } else if (orientation === 5) {
        return voxelizeByBB(char1, char2);
    } else if (orientation === 6) {
        return voxelizeByBC(char1, char2);
    } else {
        return voxelizeByBD(char1, char2);
    }
}
