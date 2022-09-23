// 经过推导，相邻的两个字符通过排列组合（以90度为步长旋转有四种情况，镜像对称有两
// 种情况），可以有 （4 * 2） ** 2 共 64 种组合。由于镜像对称不影响结果可剔除，
// 此后还剩 16 种情况，其中八对两两等价，任意筛除掉其中八个重复的之后，可得到以下
// 组合：
// - ↾|↾ (AA)
// - ↾|⇁ (AB)
// - ↾|⇃ (AC)
// - ↾|↼ (AD)
// - ⇁|↾ (BA)
// - ⇁|⇁ (BB)
// - ⇁|⇃ (BC)
// - ⇁|↼ (BD)

import { FONT_SIZE } from "../config";

function getAAIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        const t1 = char1[i].some(t => t);
        const t2 = char2[i].some(t => t);
        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

function getABIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        const t1 = char1[i].some(t => t);
        let t2 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char2[j][FONT_SIZE - i - 1]) {
                t2 = true;
                break;
            }
        }

        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

function getACIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        const t1 = char1[i].some(t => t);
        const t2 = char2[FONT_SIZE - i - 1].some(t => t);

        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

function getADIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        const t1 = char1[i].some(t => t);
        let t2 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char2[j][i]) {
                t2 = true;
                break;
            }
        }

        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

function getBAIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        let t1 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char1[j][FONT_SIZE - i - 1]) {
                t1 = true;
                break;
            }
        }
        const t2 = char2[i].some(t => t);
        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

function getBBIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        let t1 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char1[j][FONT_SIZE - i - 1]) {
                t1 = true;
                break;
            }
        }
        let t2 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char2[j][FONT_SIZE - i - 1]) {
                t2 = true;
                break;
            }
        }

        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

function getBCIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        let t1 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char1[j][FONT_SIZE - i - 1]) {
                t1 = true;
                break;
            }
        }
        const t2 = char2[FONT_SIZE - i - 1].some(t => t);

        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

function getBDIntersectLength(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    let intersectLines = 0;

    for (let i = 0; i < FONT_SIZE; i++) {
        let t1 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char1[j][FONT_SIZE - i - 1]) {
                t1 = true;
                break;
            }
        }
        let t2 = false;
        for (let j = 0; j < FONT_SIZE; j++) {
            if (char2[j][i]) {
                t2 = true;
                break;
            }
        }

        if (t1 === t2) intersectLines++;
    }

    return intersectLines
}

/** 返回使得两个字符的邻边可交叉范围最大的朝向ID */
export function getBestOrientation(
    char1: readonly boolean[][],
    char2: readonly boolean[][]
): number {
    const arr = [
        getAAIntersectLength(char1, char2),
        getABIntersectLength(char1, char2),
        getACIntersectLength(char1, char2),
        getADIntersectLength(char1, char2),
        getBAIntersectLength(char1, char2),
        getBBIntersectLength(char1, char2),
        getBCIntersectLength(char1, char2),
        getBDIntersectLength(char1, char2),
    ]
    const maxIndex = arr.reduce(
        (maxIndex, v, i) => v > arr[maxIndex] ? i : maxIndex,
        0
    );
    return maxIndex
}