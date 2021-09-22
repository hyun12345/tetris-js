import React from 'react';
import { StyledDisplay } from '../../styles/StyledDisplay';
import Button from '../Button/Button';

const Alert = ({isIE, text, callback, buttonTitle, position}) => (
    <StyledDisplay isIE={isIE}>
        {text}
        <Button isIE={isIE} callback={callback} title={buttonTitle} position={position} />
    </StyledDisplay>
);

export default Alert;