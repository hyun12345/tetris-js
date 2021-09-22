import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: ${props => (props.isIE ? 'column' : 'row')};
    justify-content: ${props => (props.isIE ? 'space-between' : 'center')};
    align-items: center;
    margin: 0 0 20px 0;
    padding: 20px;
    border: ${props => (props.isIE ? '' : '4px solid #333')};
    min-height: ${props => (props.isIE ? '80px' : '30px')};
    width: 100%;
    color: ${props => (props.gameOver ? 'red' : '#999')};
    border-radius: 20px;
    background: ${props => (props.isIE ? '#333' : '#000')};
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${props => (props.isIE ? '1.5rem' : '0.8rem')};
    word-wrap: ${props => (props.isIE && 'break-word')};
`;
