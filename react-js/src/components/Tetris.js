import React, { useState } from 'react';

import { createCanvas, checkCollision } from '../settingGame';

// styled-components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// custom hooks
// useInterval hooks from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useInterval } from '../hooks/useInterval';
import { useCurrent } from '../hooks/useCurrent';
import { useCanvas } from '../hooks/useCanvas';
import { useGameStatus } from '../hooks/useGameStatus';

// components
import Canvas from './Canvas';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [current, updateCurrentPos, resetCurrent] = useCurrent();
    const [canvas, setCanvas, rowsCleared] = useCanvas(current, resetCurrent);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const moveCurrent = (dir) => {
        if (!checkCollision(current, canvas, {x:dir, y:0})) {
            updateCurrentPos({x:dir, y:0});
        }
    }
    
    // set(reset) game
    const startGame = () => {
        setCanvas(createCanvas());
        setDropTime(1000);
        resetCurrent();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // increate level when cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            // increase speed when level increased
            setDropTime(1000 / (level + 1) + 100);
        }

        if (!checkCollision(current, canvas, {x:0, y:1})) {
            updateCurrentPos({x:0, y:1, collided:false});
        } else {
            // game over
            if (current.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updateCurrentPos({x:0, y:0, collided:true});
        }
    }

    const move = (event) => {
        var bounds = event.target.getBoundingClientRect();
        var cellSize = bounds.width;

        var canvas = document.getElementById('canvas');
        var offsetLeft = canvas.offsetLeft;

        var clientX = Math.floor((event.clientX - offsetLeft) / cellSize);
        
        if (!gameOver) {
            if (clientX >= 0 && clientX <= (cellSize * 10)) {
                // to the left
                if (clientX < current.pos.x) {
                    // console.log({l_clientX:clientX, l_current:current.pos.x});
                    moveCurrent(-1);

                // to the right
                } else if (clientX > current.pos.x) {
                    // console.log({r_clientX:clientX, r_current:current.pos.x});
                    moveCurrent(1);
                }
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper tabIndex="0">
            <StyledTetris>
                <Canvas id={'canvas'} canvas={canvas} callback={e => move(e)} />
                <aside>
                    {gameOver && <Display gameOver={gameOver} text="Game Over" />}
                    <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;