import { useState, useEffect } from 'react';
import { createBoard } from '../settingGame';

export const useBoard = (current, resetCurrent) => {
    const [board, setBoard] = useState(createBoard());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = newBoard =>
            // acc : accumulator
            newBoard.reduce((acc, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    acc.unshift(new Array(newBoard[0].length).fill([0, 'clear']));
                    return acc;
                }
                acc.push(row);
                return acc;
            }, []);

        // compare with prevBoard
        const updateBoard = prevBoard => {
            // 1 : flush the board
            const newBoard = prevBoard.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            );

            // 2 : draw tetromino
            current.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newBoard[y + current.pos.y][x + current.pos.x] = [value, `${current.collided ? 'merged' : 'clear'}`,];
                    }
                });
            });
            
            // check if collided or not
            if (current.collided) {
                // if last block not touched the top
                if (current.pos.y > 0) {
                    resetCurrent();
                    return sweepRows(newBoard);
                }
            }
            return newBoard;
          };

          setBoard(prev => updateBoard(prev));
      }, [current, resetCurrent, ]);

      return [board, setBoard, rowsCleared];
};
