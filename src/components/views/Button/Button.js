import React from 'react';
import { StyledButton } from '../../styles/StyledButton';

const Button = ({callback, title, isIE}) => (
    <StyledButton onClick={callback} isIE={isIE}>{title}</StyledButton>
);

export default Button;