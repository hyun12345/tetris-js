import styled from 'styled-components';

export const StyledButton = styled.button`
    box-sizing: border-box;
    margin: ${props => (props.isIE ? '20px' : '0 0 20px 0')};
    padding: 20px;
    min-height: ${props => (props.isIE ? '8px' : '30px')};
    width: ${props => (props.isIE ? '25%' : '100%')};
    min-width: ${props => (props.isIE && '70px')};
    max-width: ${props => (props.isIE && '100px')};
    border-radius: 20px;
    border: none;
    color: white;
    background: ${props => (props.isIE ? '#000' : '#333')};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;

    // mobile size
    @media screen and (max-width: 600px) {
        padding: ${props => (props.isIE && '15px')};
        border-radius: ${props => (props.isIE && '15px')};
        font-size: ${props => (props.isIE && '0.8rem')};
    }
`;