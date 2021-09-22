import styled from 'styled-components';

// curret : props.width = 10 / props.height: 20
export const StyledBoard = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        // to set auto height for responsive web
        minmax(25px, calc(25vw / ${props => props.width}))
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 25vw;
    min-width: calc(${props => props.width} * 25px);
    min-height: calc(${props => props.height} * 25px);
    background: #111;
`;
