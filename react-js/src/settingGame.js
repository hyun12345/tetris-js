export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = () =>
    Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill([0, 'clear']));

export const checkCollision = (current, board, {x:moveX, y:moveY}) => {
    for (let y = 0; y < current.tetromino.length; y++) {
        for (let x = 0; x < current.tetromino[y].length; x++) {
            // 1. check if it's tetromino cell or empty cell
            if (current.tetromino[y][x] !== 0) {
                if (
                    // 2. check if it's inside of the board(height = y)
                    !board[y + current.pos.y + moveY] ||
                    // 3. check if it's inside of the board(width = x)
                    !board[y + current.pos.y + moveY][x + current.pos.x + moveX] ||
                    // 4. check if it's not empty where tetromino move to
                    board[y + current.pos.y + moveY][x + current.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
    // if collided return false
    return false;
};

// check if current browser is IE
export const checkIsIE = () => {
    return !!(document).documentMode;
};

export const closeIEAlert = () => {
    if (checkIsIE()) {
        return false;
    } else {
        return true;
    }
}