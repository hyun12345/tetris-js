import React from 'react';
import { StyledCanvas } from './styles/StyledCanvas';
import Cell from './Cell';

const Canvas = ({id, canvas, callback}) => (
    <StyledCanvas id={id} width={canvas[0].length} height={canvas.length} onMouseMove={callback}>
        {canvas.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledCanvas>
)

export default Canvas;