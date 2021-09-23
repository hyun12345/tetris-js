import { useEffect } from 'react';

// using react-redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../_actions/index';

export const useBoard = (current, resetCurrent) => {
    const dispatch = useDispatch();
    const { board } = useSelector((store) => ({board:store.tetris.board}), shallowEqual);
    const { rowsCleared } = useSelector((store) => ({rowsCleared:store.tetris.rowsCleared}), shallowEqual);
    const { btnTitle } = useSelector((store) => ({btnTitle:store.tetris.btnTitle}), shallowEqual);
    const { gameOver } = useSelector((store) => ({gameOver:store.tetris.gameOver}), shallowEqual);

    useEffect(() => {
        dispatch(actions.setRowsCleared(0));
        const sweepRows = newBoard =>
            // acc : accumulator
            newBoard.reduce((acc, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    // block has two rows so have to add 2
                    dispatch(actions.setRowsCleared(rowsCleared + 2));
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

        // update board only when game playing(block droping)
        if (!gameOver && btnTitle !== 'Start Game') {
            dispatch(actions.setBoard(updateBoard(board)));
        }

    }, [current, resetCurrent, dispatch, board, rowsCleared, gameOver, btnTitle, ]);
};
