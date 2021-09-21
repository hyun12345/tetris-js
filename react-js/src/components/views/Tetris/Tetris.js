import React, { useState } from 'react';

import { BOARD_WIDTH, createBoard, checkCollision } from '../../../settingGame';

// styled-components
import { StyledTetrisWrapper, StyledTetrisTitle, StyledTetris } from '../../styles/StyledTetris';

// custom hooks
// useInterval hooks from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useInterval } from '../../../_hooks/useInterval';
import { useCurrent } from '../../../_hooks/useCurrent';
import { useBoard } from '../../../_hooks/useBoard';
import { useGameValues } from '../../../_hooks/useGameValues';

// components
import Board from '../Board/Board';
import Display from '../Display/Display';
import StartButton from '../StartButton/StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('Start Game');
    const [guide, setGuide] = useState(buttonTitle);

    const [current, updateCurrentPos, resetCurrent] = useCurrent();
    const [board, setBoard, rowsCleared] = useBoard(current, resetCurrent);
    const [score, setScore, rows, setRows, level, setLevel] = useGameValues(rowsCleared);

    const moveCurrent = dir => {
        if (!checkCollision(current, board, {x:dir, y:0})) {
            updateCurrentPos({x:dir, y:0});
        }
    };

    // set(reset) game
    const startGame = () => {
        setBoard(createBoard());
        setDropTime(100);
        resetCurrent();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
        setButtonTitle('Re-Start Game');
        setGuide('Move Mouse on the board to the LEFT or RIGHT for moving block!');
    };

    const drop = () => {
        // increate level when cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            /// increase speed when level increased
            setDropTime(dropTime / (level + 1) + 100);
        }
        
        // not collided : to drop the block
        if (!checkCollision(current, board, {x:0, y:1})) {
            updateCurrentPos({x:0, y:1, collided: false});
        
        // collided : game over
        } else {
            // game over
            if (current.pos.y < 1) {
                console.log('gameOver');
                setGameOver(true);
                setDropTime(null);
                setGuide(buttonTitle);
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

        if (!gameOver) {
            if (clientX >= 0 && clientX < (offsetWidth - cellSize)) {
                if (cellSize < (offsetWidth / BOARD_WIDTH)) {
                    var currentMouse = Math.round(clientX / cellSize);
                    if (currentMouse !== current.pos.x) {
                        // to the left
                        if (currentMouse < current.pos.x) {
                            moveCurrent(-1);
                            
                        // to the right
                        } else if (currentMouse > current.pos.x) {
                            moveCurrent(1);
                        }
                    }
                }
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0">
            <StyledTetrisTitle>BLOCK-TETRIS</StyledTetrisTitle>
            <StyledTetris>
                <Board id={'board'} board={board} callback={e => move(e)}/>
                <aside>
                    {gameOver && <Display gameOver={gameOver} text="Game Over" />}
                    <div>
                        <Display text={gameOver ? (`Final-Score: ${score}`):(`Score: ${score}`)} />
                        <Display text={gameOver ? (`Final-Rows: ${rows}`):(`Rows: ${rows}`)} />
                        <Display text={gameOver ? (`Final-Level: ${level}`):(`Level: ${level}`)} />
                    </div>
                    <StartButton callback={startGame} text={buttonTitle} />
                    <Display text={guide} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;