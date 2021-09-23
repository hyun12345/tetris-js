import { useCallback } from 'react';
import { BOARD_WIDTH } from '../settingGame';
import { setBlock } from '../tetrominos';

// using react-redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../_actions/index';

export const useCurrent = () => {
    const dispatch = useDispatch();
    const { tetrisCurrent } = useSelector((store) => ({tetrisCurrent:store.tetris.current}), shallowEqual);

    const updateCurrentPos = ({ x, y, collided }) => {
        dispatch(actions.setCurrent({
            pos: { x:(tetrisCurrent.pos.x += x), y:(tetrisCurrent.pos.y += y) },
            tetromino: tetrisCurrent.tetromino,
            collided,
        }));
    };

    // reset
    const resetCurrent = useCallback(() => {
        dispatch(actions.setCurrent({
            // x result : set block position center of the board
            pos: { x: ((BOARD_WIDTH / 2) - 1), y: 0 },
            tetromino: setBlock().shape,
            collided: false,
        }));
    }, [dispatch]);

    return [updateCurrentPos, resetCurrent];
};