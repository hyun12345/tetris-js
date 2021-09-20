export const CANVAS_WIDTH = 10;
export const CANVAS_HEIGHT = 20;

export const createCanvas = () => 
    Array.from(Array(CANVAS_HEIGHT), () => new Array(CANVAS_WIDTH).fill([0, 'clear']));

export const checkCollision = (current, canvas, {x:moveX, y:moveY}) => {
    for (let y = 0; y < current.tetromino.length; y++) {
        for (let x = 0; x < current.tetromino[y].length; x++) {
            // 1. check if it's tetromino cell or empty cell
            if (current.tetromino[y][x] !== 0) {
                if (
                    // 2. check if it's inside of the canvas(height = y)
                    !canvas[y + current.pos.y + moveY] || 
                    // 3. check if it's inside of the canvas(width = x)
                    !canvas[y + current.pos.y + moveY][x + current.pos.x + moveX] ||
                    // 4. check if it's not empty where tetromino move to
                    canvas[y + current.pos.y + moveY][x + current.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
    return false;
}
