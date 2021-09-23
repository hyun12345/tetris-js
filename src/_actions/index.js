import { 
    SET_DROPTIME, 
    SET_GAMEOVER, 
    SET_BTNTITLE,
    SET_ISIE,
    SET_CLOSEIEALERT,
    SET_CURRENT,
    SET_BOARD,
    SET_ROWSCLEARED,
    SET_SCORE, 
    SET_ROWS, 
    SET_LEVEL,
} from '../_actions/types';

export function setDropTime(dropTime){
    return {
        type: SET_DROPTIME,
        payload: dropTime,
    }
}

export function setGameOver(gameOver){
    return {
        type: SET_GAMEOVER,
        payload: gameOver,
    }
}

export function setBtnTitle(btnTitle){
    return {
        type: SET_BTNTITLE,
        payload: btnTitle,
    }
}

export function setIsIE(isIE){
    return {
        type: SET_ISIE,
        payload: isIE,
    }
}

export function setCloseIEAlert(closeIEAlert){
    return {
        type: SET_CLOSEIEALERT,
        payload: closeIEAlert,
    }
}

export function setCurrent(current){
    return {
        type: SET_CURRENT,
        payload: current,
    }
}

export function setBoard(board){
    return {
        type: SET_BOARD,
        payload: board,
    }
}

export function setRowsCleared(rowsCleared){
    return {
        type: SET_ROWSCLEARED,
        payload: rowsCleared,
    }
}

export function setScore(score){
    return {
        type: SET_SCORE,
        payload: score,
    }
}

export function setRows(rows){
    return {
        type: SET_ROWS,
        payload: rows,
    }
}

export function setLevel(level){
    return {
        type: SET_LEVEL,
        payload: level,
    }
}