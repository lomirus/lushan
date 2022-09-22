import './style.css'
import { pixelateCharacter } from './utils';
import { getBestOrientation } from './utils/intersect';

const char1 = pixelateCharacter('卜');
const char2 = pixelateCharacter('賣');

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d');
if (!ctx) throw "Context is null";

/** Just for debug */
function createCharCanvas(data: boolean[][]): void {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    canvas.style.border = '1px solid #666'
    const ctx = canvas.getContext('2d');
    if (!ctx) throw "Context is null";

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i][j]) {
                ctx.fillRect(j, i, 1, 1)
            }
        }
    }

    document.body.append(canvas)
}

createCharCanvas(char1)
createCharCanvas(char2)

console.log(getBestOrientation(char1, char2))
