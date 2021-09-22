import React from 'react';
import { StyledDisplay } from '../../styles/StyledDisplay';
import Button from '../Button/Button';

const Alert = ({id, isIE, text, callback, buttonTitle, position}) => (
    <StyledDisplay id={id} isIE={isIE}>
        {text}
        <Button isIE={isIE} callback={callback} title={buttonTitle} position={position} />
    </StyledDisplay>
);

export default Alert;