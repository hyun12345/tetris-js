import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
`;

export const StyledTetrisAlertContainer = styled.div`
    width: 30%;
    height: 100%;
    position: fixed;
    top: 30%;
    left: 35%;

    // mobile size
    @media screen and (max-width: 600px) {
        left: 15%;
    }
`;

export const StyledTetrisTitle = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 3%;
    width: 100%;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
`;

export const StyledTetris = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }

    // mobile size
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;
