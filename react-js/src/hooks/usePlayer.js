import { useState } from 'react';
import { BLOCK } from '../tetrominos';

export const usePlayer = () => {
    const[player, setPlayer] = useState({
        pos: {x:0, y:0},
        tetromino: BLOCK,
        collided: false
    });

    return [player];
}