import React, { useState } from 'react';

import { createCanvas, checkCollision } from '../settingGame';

// styled-components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// custom hooks
// useInterval hooks from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useInterval } from '../hooks/useInterval';
import { useCurrent } from '../hooks/useCurrent';
import { useCanvas } from '../hooks/useCanvas';

// components
import Canvas from './Canvas';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [current, updateCurrentPos, resetCurrent] = useCurrent();
    const [canvas, setCanvas] = useCanvas(current, resetCurrent);

    // console.log('re-render');

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
    }

    const drop = () => {
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

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                console.log('interval on')
                setDropTime(1000);
            }
        }
    }

    const dropCurrent = () => {
        console.log('interval off');
        setDropTime(null);
        drop();
    }

    // update keyCode to mouseOver later
    const move = ({keyCode}) => {
        if (!gameOver) {
            if (keyCode === 37) {
                moveCurrent(-1);
            } else if (keyCode === 39) {
                moveCurrent(1);
            } else if (keyCode === 40) {
                dropCurrent();
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
                <Canvas canvas={canvas} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ): (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;