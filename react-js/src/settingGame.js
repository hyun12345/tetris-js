export const CANVAS_WIDTH = 10;
export const CANVAS_HEIGHT = 20;

export const createCanvas = () => 
    Array.from(Array(CANVAS_HEIGHT), () =>
        new Array(CANVAS_WIDTH).fill([0, 'clear'])
    )
