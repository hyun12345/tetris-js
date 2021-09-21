export const COLORS = [
    '199, 82, 82',
    '233, 174, 43',
    '105, 155, 55',
    '53, 135, 145',
    '49, 95, 151',
    '102, 86, 167'
];

// set random block color when start game(block has same color)
export const setColor = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return color;
};

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
        color:setColor()
    }
};

export const setBlock = () => {
    return TETROMINOS['O'];
};