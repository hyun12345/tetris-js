export const COLORS = [
    '199, 82, 82',
    '233, 174, 43',
    '105, 155, 55',
    '53, 135, 145',
    '49, 95, 151',
    '102, 86, 167'
]

export const randomColor = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return color;
}

export const TETROMINOS = {
    0:{shape:[[0]], color:'0, 0, 0'},
    O:{
        shape:[
            ['O', 'O'],
            ['O', 'O'],
        ],
        color:randomColor()
    }
}

export const setBlock = () => {
    TETROMINOS['O'].color = randomColor();
    return TETROMINOS['O']
}