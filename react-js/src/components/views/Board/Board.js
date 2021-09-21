import React from 'react';
import { StyledBoard } from '../../styles/StyledBoard';
import Cell from '../Cell/Cell';

const Board = ({id, board, callback}) => (
    <StyledBoard id={id} width={board[0].length} height={board.length} onMouseMove={callback}>
        {board.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledBoard>
);

export default Board;