import React from 'react';

import {createBoard} from '../settingGame';

import Board from './Board';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    return (
        <div>
            <Board board={createBoard()} />
            <aside>
                <div>
                    <Display text="Rows" />
                </div>
                <StartButton />
            </aside>
        </div>
    )
}

export default Tetris;