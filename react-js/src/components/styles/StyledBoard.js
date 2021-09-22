import styled from 'styled-components';

// curret : props.width = 10 / props.height: 20
export const StyledBoard = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(25vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 25vw;
    // min-width: 300px;
    background: #111;
`;
