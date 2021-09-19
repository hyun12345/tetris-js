const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');

const row = 10;
const col = 20;
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
for (c = 0; c < col; c++) {
    board[c] = [];
    for (r = 0; r < row; r++) {
        board[c][r] = VACANT;
    }
}

// draw the board
function drawBoard() {
    for (c = 0; c < col; c++) {
        for (r = 0; r < row; r++) {
            drawCell(r, c, board[c][r]);
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
    ['pink'],
    ['purple']
]

// generate blocks
function setBlock() {
    let random = Math.floor(Math.random() * colors.length)
    return new Block(colors[random][0])
}

let item = setBlock();

// Object : Block
function Block(color) {
    this.block = block;
    this.color = color;

    this.x = 3;
    this.y = -3;
}

// fill function
Block.prototype.fill = function(color) {
    for (c = 0; c < this.block.length; c++) {
        for (r = 0; r < this.block.length; r++) {
            if (this.block[c][r]) {
                drawCell(this.x + r, this.y + c, color);
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
    if (!this.collision(0, 1, this.block)) {
        this.undraw();
        this.y++;
        this.draw();
    } else {
        this.lock();
        item = setBlock();
    }
}

// move left the block
Block.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.block)) {
        this.undraw();
        this.x--;
        this.draw();
    }
}

// move right the block
Block.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.block)) {
        this.undraw();
        this.x++;
        this.draw();
    }
}

Block.prototype.lock = function() {
    console.log(gameOver);
    for (c = 0; c < this.block.length; c++) {
        for (r = 0; r < this.block.length; r++) {
            // skip the empty cell
            if (!this.block[c][r]) {
                continue;
            }
            // gameover : if block touch the top
            if (this.y + c < 0) {
                gameOver = true;
                break;
            }
            board[this.y + c][this.x + r] = this.color;
        }
    }
}

// colision function
Block.prototype.collision = function(x, y, block) {
    for (c = 0; c < block.length; c++) {
        for (r = 0; r < block.length; r++) {
            // skip when cell is empty
            if(!block[c][r]) {
                continue;
            }
            let newX = this.x + r + x;
            let newY = this.y + c + y;

            if (newX < 0 || newX >= row || newY >= col) {
                return true;
            }

            if (newY < 0) {
                continue;
            }
            if (board[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}

// control the block
document.addEventListener('mouseover', CONTROL);
function CONTROL(event) {
    if (event.clientX < (item.x * 20) + 40) {
        console.log(event.clientX);
        item.moveLeft();
    } else if (event.clientX > (item.x * 20) - 20) {
        item.moveRight();
    }
}

// drop the block every 1sec
let dropStart = Date.now();
let gameOver = false;
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 100) {
        item.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    } else {
        alert('Game Over');
    }
}

drop();



