import './style.css'
import { pixelateCharacter, voxelateCharacters } from './utils';

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d');
if (!ctx) throw "Context is null";

/** Just for debug */
function createCharCanvas(char: string): void {
    const data = pixelateCharacter(char);
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

createCharCanvas('卜')
createCharCanvas('賣')

const data = voxelateCharacters('卜', '賣')
console.log(data)
