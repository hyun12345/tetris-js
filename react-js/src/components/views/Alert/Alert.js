import React from 'react';
import { StyledDisplay } from '../../styles/StyledDisplay';
import Button from '../Button/Button';

const Alert = ({isIE, text, closeBtn, buttonTitle}) => (
    <StyledDisplay isIE={isIE}>
        {text}
        <Button callBack={closeBtn} title={buttonTitle} />
    </StyledDisplay>
);

export default Alert;