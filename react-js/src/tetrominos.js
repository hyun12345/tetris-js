export const BLOCK = [
    ['O', 'O'],
    ['O', 'O'],
]

export const COLORS = [
    'rgb(199, 82, 82)',
    'rgb(233, 174, 43)',
    'rgb(105, 155, 55)',
    'rgb(53, 135, 145)',
    'rgb(49, 95, 151)',
    'rgb(102, 86, 167)'
]

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


export const randomColor = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return color;
}