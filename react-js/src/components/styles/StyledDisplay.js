import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: ${props => (props.isIE ? 'center' : 'center')};
    align-items: center;
    margin: 0 0 20px 0;
    padding: ${props => (props.isIE ? '20px 20px 20px 40px' : '20px')};
    border: 4px solid #333;
    min-height: ${props => (props.isIE ? '80px' : '30px')};
    width: 100%;
    min-width: ${props => (props.isIE ? '200px' : '100%')};
    color: ${props => (props.gameOver ? 'red' : '#999')};
    border-radius: 20px;
    background: ${props => (props.isIE ? '#333' : '#000')};
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${props => (props.isIE ? '1.5rem' : '0.8rem')};
    word-break: keep-all;
    word-wrap: keep-all;
`;
