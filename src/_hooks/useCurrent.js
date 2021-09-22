import { useState, useCallback } from 'react';
import { BOARD_WIDTH } from '../settingGame';
import { TETROMINOS, setBlock } from '../tetrominos';

export const useCurrent = () => {
    // set default(board)
    const [current, setCurrent] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updateCurrentPos = ({ x, y, collided }) => {
        setCurrent(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }));
    };

    // reset
    const resetCurrent = useCallback(() => {
        setCurrent({
            // x result : set block position center of the board
            pos: { x: ((BOARD_WIDTH / 2) - 1), y: 0 },
            tetromino: setBlock().shape,
            collided: false,
        });
    }, []);

    return [current, updateCurrentPos, resetCurrent];
};
