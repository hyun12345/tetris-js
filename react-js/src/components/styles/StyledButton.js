import styled from 'styled-components';

export const StyledButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: ${props => (props.isIE ? '10px' : '30px')};
    width: ${props => (props.isIE ? '50%' : '100%')};
    border-radius: 20px;
    border: none;
    color: white;
    background: ${props => (props.isIE ? '#000' : '#333')};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    // position: ${props => (props.isIE && 'fixed')};
    // right:  ${props => (props.isIE && '10px')};
    // bottom:  ${props => (props.isIE && '10px')};
`;