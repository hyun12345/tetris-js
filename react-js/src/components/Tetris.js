import React from 'react';

import {createCanvas} from '../settingGame';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import Canvas from './Canvas';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Canvas canvas={createCanvas()} />
                <aside>
                    <div>
                        <Display text="Rows" />
                    </div>
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;