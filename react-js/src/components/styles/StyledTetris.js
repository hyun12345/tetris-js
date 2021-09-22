import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const StyledTetrisAlertContainer = styled.div`
    width: 30%;
    height: 100%;
    position: fixed;
    top: 30%;
    left: 35%;

    // mobile size
    @media screen and (max-width: 600px) {
        left: 18%;
    }
`;

export const StyledTetris = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    margin: 0 auto;
    // max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;

        // mobile size
        @media screen and (max-width: 600px) {
            margin-top: 20px;
        }
    }

    // mobile size
    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
`;
