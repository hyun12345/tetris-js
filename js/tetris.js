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

// Object : Block
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

// draw a block to the board
Block.prototype.draw = function() {
    this.fill(this.color);
}

// undraw a block
Block.prototype.undraw = function() {
    this.fill(VACANT)
}

// move down the block
Block.prototype.moveDown = function() {
    this.undraw();
    this.y++;
    this.draw();
}

// move left the block
Block.prototype.moveLeft = function() {
    this.undraw();
    this.x--;
    this.draw();
}

// move right the block
Block.prototype.moveRight = function() {
    this.undraw();
    this.x++;
    this.draw();
}

// control the block
document.addEventListener('mouseover', CONTROL);
function CONTROL(event) {
    if (event.clientX < item.x * 20) {
        console.log(event.clientX);
        item.moveLeft();
    } else if (event.clientX > item.x * 20) {
        item.moveRight();
    }
}

// drop the block every 1sec
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



