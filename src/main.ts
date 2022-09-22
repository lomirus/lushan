import './style.css'
import { pixelateCharacter } from './utils';

const data = pixelateCharacter('翰');

const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d');
if (!ctx) throw "Context is null";

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
        if (data[i][j]) {
            ctx.fillRect(j, i, 1, 1)
        }
    }
}

