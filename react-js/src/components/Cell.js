import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { randomColor } from '../tetrominos';;

const Cell = () => (
    <StyledCell color={randomColor()} />
)

export default Cell;