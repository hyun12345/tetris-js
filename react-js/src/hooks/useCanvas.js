import { useState, useEffect } from 'react';
import { createCanvas } from '../settingGame';

export const useCanvas = (current, resetCurrent) => {
    const[canvas, setCanvas] = useState(createCanvas());

    useEffect(() => {
        // compare with prevCanvas
        const updateCanvas = prevCanvas => {
            // 1 : flush the canvas
            const newCanvas = prevCanvas.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // 2 : draw tetromino
            current.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newCanvas[y + current.pos.y][x + current.pos.x] = [
                            value,
                            `${current.collided ? 'merged' : 'clear'}`,
                        ]
                    }
                });
            });
            // check if collided or not
            if (current.collided) {
                resetCurrent();
            }

            return newCanvas;
        };

        setCanvas(prev => updateCanvas(prev));
    }, [current, resetCurrent]);

    return [canvas, setCanvas];
}