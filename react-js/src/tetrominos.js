export const TETROMINOS = {
    0: {
        shape:[
            [0]
        ], 
        color:'0, 0, 0'
    },
    O: {
        shape:[
            ['O', 'O'],
            ['O', 'O'],
        ],
        color:'233, 174, 43',
    }
};

export const setBlock = () => {
    return TETROMINOS['O'];
};