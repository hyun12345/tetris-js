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
    for (r = 0; r < this.block.length; r++) {
        for (c = 0; c < this.block.length; c++) {
            // skip the empty cell
            if (!this.block[r][c]) {
                continue;
            }
            // gameover : if block touch the top
            if (this.y + r < 0) {
                gameOver = true;
                break;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // remove full rows
    for(r = 0; r < row; r++) {
        let isRowFull = true;
        for(c = 0; c < col; c++) {
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }  
        if (isRowFull) {
            for(y = r; y > 1; y--) {
                for(c = 0; c < col; c++) {
                    board[y][c] = board[y-1][c];
                }
            }
            for(c = 0; c < col; c++) {
                board[0][c] = VACANT;
            }
        }
    }
    // update the board
    drawBoard();
}



// colision function
Block.prototype.collision = function(x, y, block) {
    for (r = 0; r < block.length; r++) {
        for (c = 0; c < block.length; c++) {
            // skip when cell is empty
            if(!block[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if (newX < 0 || newX >= col || newY >= row) {
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
    if (event.clientX <= (item.x * 20) + 20) {          
        if (item.x >= 0) {
            console.log({clientX:event.clientX})
            console.log({itemX:item.x * 20 + 20})
            item.moveLeft();
        }
    } else if (event.clientX >= (item.x * 20) - 20) {
        if (item.x <= 200) {
            console.log({clientX:event.clientX})
            console.log({itemX:item.x * 20 - 20})
            item.moveRight();
        }
    }
}

// drop the block every 1sec
let dropStart = Date.now();
let gameOver = false;
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
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



