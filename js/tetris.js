const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');

const row = 20;
const col = 10;
const cell = 20;
const VACANT = 'white';

const block = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
]

// draw a cell
function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cell, y * cell, cell, cell);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x * cell, y * cell, cell, cell);
}

// create the board
let board = [];
for (r = 0; r < row; r++) {
    board[r] = [];
    for (c = 0; c < col; c++) {
        board[r][c] = VACANT;
    }
}

// draw the board
function drawBoard() {
    for (r = 0; r < row; r++) {
        for (c = 0; c < col; c++) {
            drawCell(c, r, board[r][c]);
        }
    }
}

drawBoard();

const colors = [
    ['red'],
    ['orange'],
    ['yellow'],
    ['green'],
    ['skyblue'],
    ['deepblue'],
    ['purple']
]

let item = new Block(colors[0])

// Object : Piece
function Block(color) {
    this.block = block;
    this.color = color;

    this.x = 3;
    this.y = -2;
}

// fill function
Block.prototype.fill = function(color) {
    for (r = 0; r < this.block.length; r++) {
        for (c = 0; c < this.block.length; c++) {
            if (this.block[r][c]) {
                drawCell(this.x + c, this.y + r, color);
            }
        }
    }
}

// draw a piece to the board
Block.prototype.draw = function() {
    this.fill(this.color);
    // for (r = 0; r < this.block.length; r++) {
    //     for (c = 0; c < this.block.length; c++) {
    //         if (this.block[r][c]) {
    //             drawCell(this.x + c, this.y + r, this.color);
    //         }
    //     }
    // }
}

// undraw a piece
Block.prototype.undraw = function() {
    this.fill(VACANT)
    // for (r = 0; r < this.block.length; r++) {
    //     for (c = 0; c < this.block.length; c++) {
    //         if (this.block[r][c]) {
    //             drawCell(this.x + c, this.y + r, VACANT);
    //         }
    //     }
    // }
}

// move down the piece
Block.prototype.moveDown = function() {
    this.undraw();
    this.y++;
    this.draw();
}

// drop the piece every 1sec
let dropStart = Date.now();
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        item.moveDown();
        dropStart = Date.now();
    }
    requestAnimationFrame(drop);
}

drop();



