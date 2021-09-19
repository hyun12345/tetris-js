import React from 'react';
import Cell from './Cell';

const Board = ({board}) => (
    <div>
        {board.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </div>
)

export default Board;