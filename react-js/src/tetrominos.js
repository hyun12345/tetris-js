export const TETROMINOS = {
    0:{shape:[[0]], color:'0, 0, 0'},
    O:{
        shape:[
            ['O', 'O'],
            ['O', 'O'],
        ],
        color:'223, 217, 36'
    }
}

export const Tetromino = () => {
    return TETROMINOS['O'];
}