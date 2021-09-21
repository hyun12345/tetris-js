import React from 'react';
import { StyledButton } from '../../styles/StyledButton';

const Button = ({callback, title}) => (
    <StyledButton onClick={callback}>{title}</StyledButton>
);

export default Button;