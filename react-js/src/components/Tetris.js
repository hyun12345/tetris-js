import React, { useState } from 'react';

// styled-components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// custon hooks
import { usePlayer } from '../hooks/usePlayer';
import { useCanvas } from '../hooks/useCanvas';

// components
import Canvas from './Canvas';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player] = usePlayer();
    const [canvas, setCanvas] = useCanvas(player);

    console.log('re-render');

    return (
        <StyledTetrisWrapper>
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
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;