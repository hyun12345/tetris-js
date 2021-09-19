export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = () => 
    Array.from(Array(BOARD_WIDTH), () =>
        new Array(BOARD_HEIGHT).fill([0, 'clear'])
    )
