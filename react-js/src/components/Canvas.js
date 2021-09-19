import React from 'react';
import { StyledCanvas } from './styles/StyledCanvas';
import Cell from './Cell';

const Canvas = ({canvas}) => (
    <StyledCanvas width={canvas[0].length} height={canvas.length}>
        {canvas.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledCanvas>
)

export default Canvas;