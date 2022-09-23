import { getBestOrientation } from "./intersect";
import { voxelize } from "./voxelization";

const FONT_SIZE = 256;

export function pixelateCharacter(char: string): boolean[][] {
    // Initialize Canvas
    const canvas = document.createElement('canvas');
    canvas.width = FONT_SIZE;
    canvas.height = FONT_SIZE;

    // Initialize Context
    const ctx = canvas.getContext('2d')!;
    ctx.textBaseline = 'bottom'
    ctx.font = `${FONT_SIZE}px SourceHanSerif`;

    // Calculate the pixel data
    ctx.fillText(char, 0, FONT_SIZE);
    const imageData = ctx.getImageData(0, 0, FONT_SIZE, FONT_SIZE)
    const pixelData: boolean[][] = new Array(FONT_SIZE)
    for (let i = 0; i < FONT_SIZE; i++) {
        pixelData[i] = new Array(FONT_SIZE)
        for (let j = 0; j < FONT_SIZE; j++) {
            pixelData[i][j] = imageData.data[3 + 4 * (FONT_SIZE * i + j)] > 127
        }
    }
    return pixelData
}

export function voxelateCharacters(char1: string, char2: string): boolean[][][] {
    const charData1 = pixelateCharacter(char1);
    const charData2 = pixelateCharacter(char2);
    const bestOrientation = getBestOrientation(charData1, charData2);
    return voxelize(charData1, charData2, bestOrientation);
}
