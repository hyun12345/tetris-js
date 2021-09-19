import { useState, useEffect } from 'react';
import { createCanvas } from '../settingGame';

export const useCanvas = (current, resetCurrent) => {
    const[canvas, setCanvas] = useState(createCanvas());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newCanvas => 
            // // array.reduce() testing
            // let arr = [
            //     [[0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear']],
            //     [[0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear']],
            //     [[0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear']],
            //     [[0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear']],
            //     [[0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear'], [0, 'clear']]
            // ];
            // arr.reduce((acc, row) => {
            //     console.log({acc:acc});
            //     console.log({row:row});
            //     acc.unshift(new Array(arr[0].length).fill(['O', 'merged']));
            //     console.log({accc:acc});
            // });

            // console.log({newCanvas:newCanvas});
            // acc : accumulator
            newCanvas.reduce((acc, row) => {
                if (acc == undefined) {
                    acc = [];
                }
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    acc.unshift(new Array(newCanvas[0].length).fill([0, 'clear']));
                    
                    return acc;
                }
                acc.push(row);
                return acc;
            }, []);
        

        

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
                return sweepRows(newCanvas);
            }

            return newCanvas;
        };

        setCanvas(prev => updateCanvas(prev));
    }, [current, resetCurrent]);

    return [canvas, setCanvas, rowsCleared];
}