import React from 'react';

// using react-redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../_actions/index';

import { BOARD_WIDTH, createBoard, checkCollision } from '../../../settingGame';

// styled-components
import { StyledTetrisWrapper, StyledTetrisAlertContainer, StyledTetris } from '../../styles/StyledTetris';

// custom hooks
// useInterval hooks from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useInterval } from '../../../_hooks/useInterval';
import { useCurrent } from '../../../_hooks/useCurrent';
import { useBoard } from '../../../_hooks/useBoard';
import { useGameValues } from '../../../_hooks/useGameValues';

// components
import Alert from '../Alert/Alert';
import Board from '../Board/Board';
import Display from '../Display/Display';
import Button from '../Button/Button';

const Tetris = () => {
    const dispatch = useDispatch();
    const tetris = useSelector((store) => store.tetris);

    const [current, updateCurrentPos, resetCurrent] = useCurrent();
    const [board, setBoard, rowsCleared] = useBoard(current, resetCurrent);
    const [score, setScore, rows, setRows, level, setLevel] = useGameValues(rowsCleared);

    const setBrowserAlert = () => {
        console.log('setAlert clicked');
        console.log({closeIEAlert:tetris.closeIEAlert});
        dispatch(actions.setCloseIEAlert(!tetris.closeIEAlert));
    }

    const moveCurrent = dir => {
        if (!checkCollision(current, board, {x:dir, y:0})) {
            updateCurrentPos({x:dir, y:0});
        }
    };

    // set(reset) game
    const startGame = () => {
        setBoard(createBoard());
        resetCurrent();
        setScore(0);
        setRows(0);
        setLevel(0);
        dispatch(actions.setDropTime(1000));
        dispatch(actions.setGameOver(false));
        dispatch(actions.setBtnTitle('Re-Start Game'));
    };

    const drop = () => {
        // increate level when cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            /// increase speed when level increased
            dispatch(actions.setDropTime(tetris.dropTime / (level + 1) + 100));
        }
        
        // not collided : to drop the block
        if (!checkCollision(current, board, {x:0, y:1})) {
            updateCurrentPos({x:0, y:1, collided: false});
        
        // collided : game over
        } else {
            // game over
            if (current.pos.y < 1) {
                console.log('gameOver');
                dispatch(actions.setGameOver(true));
                dispatch(actions.setDropTime(null));

            }
            updateCurrentPos({x:0, y:0, collided:true});
        }
    };

    const move = (event) => {
        // to get each cell size
        var bounds = event.target.getBoundingClientRect();
        var cellSize = bounds.width;

        var board = document.getElementById('board');
        // value of margin-left + padding-left from board
        var offsetLeft = board.offsetLeft;
        // to get board area
        var offsetWidth = board.offsetWidth;

        var clientX = event.clientX - offsetLeft;

        if (!tetris.gameOver) {
            if (clientX >= 0 && clientX < (offsetWidth - cellSize)) {
                if (cellSize < (offsetWidth / BOARD_WIDTH)) {
                    var mouseX = Math.round(clientX / cellSize);
                    if (mouseX !== current.pos.x) {
                        // to the left
                        if (mouseX < current.pos.x) {
                            moveCurrent(-1);
                            
                        // to the right
                        } else if (mouseX > current.pos.x) {
                            moveCurrent(1);
                        }
                    }
                }
            }
        }
    }

    useInterval(() => {
        drop();
    }, tetris.dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0">
            {/* alert for IE browser user */}
            {tetris.isIE && <StyledTetrisAlertContainer>
                {!tetris.closeIEAlert && 
                    <Alert  isIE={tetris.isIE}
                            text={'Not working in IE. Try another browser.'} 
                            callback={setBrowserAlert} 
                            buttonTitle={'OK'} 
                    />
                }
            </StyledTetrisAlertContainer>}
            <StyledTetris>
                <Board id={'board'} board={board} callback={e => move(e)}/>
                <aside>
                    {tetris.gameOver && <Display gameOver={tetris.gameOver} text="Game Over" />}
                    {/* not showing in IE browser*/}
                    {!tetris.isIE &&
                        <React.Fragment>
                            <Button callback={startGame} title={tetris.btnTitle} />
                            <Display text={tetris.gameOver ? (`Final-Score: ${score}`):(`Score: ${score}`)} />
                            <Display text={tetris.gameOver ? (`Final-Rows: ${rows}`):(`Rows: ${rows}`)} />
                            <Display text={tetris.gameOver ? (`Final-Level: ${level}`):(`Level: ${level}`)} />
                        </React.Fragment>
                    }
                    {/* only showing in IE browser */}
                    {(tetris.isIE && tetris.closeIEAlert) &&<Button callback={setBrowserAlert} title={tetris.btnTitle} />}
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;