import { combineReducers } from 'redux';

import { 
    SET_ISIE,
    SET_BTNTITLE,
    SET_DROPTIME, 
    SET_GAMEOVER, 
    SET_CLOSEIEALERT,
    SET_CURRENT,
    SET_BOARD,
    SET_ROWSCLEARED,
    SET_SCORE, 
    SET_ROWS, 
    SET_LEVEL, 
 } from '../_actions/types';

import { checkIsIE, closeIEAlert, createBoard } from '../settingGame';
import { TETROMINOS } from '../tetrominos';

//  setting default state value
const initialState = {
    isIE: checkIsIE(),
    closeIEAlert: closeIEAlert(),
    dropTime: null,
    gameOver: false,
    btnTitle: 'Start Game',
    current: {
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    },
    board: createBoard(),
    rowsCleared: 0,
    score: 0,
    rows: 0,
    level: 0,
}

const tetris = (state = initialState, action) => {
    switch(action.type){
        case SET_ISIE:
            return {...state, isIE: action.payload}
        case SET_CLOSEIEALERT:
            return {...state, closeIEAlert: action.payload}
        case SET_DROPTIME:
            return {...state, dropTime: action.payload}
        case SET_GAMEOVER:
            return {...state, gameOver: action.payload}
        case SET_BTNTITLE:
            return {...state, btnTitle: action.payload}
        case SET_CURRENT:
            return {...state, current: action.payload}
        case SET_BOARD:
            return {...state, board: action.payload}
        case SET_ROWSCLEARED:
            return {...state, rowsCleared: action.payload}
        case SET_SCORE:
            return {...state, score: action.payload}
        case SET_ROWS:
            return { ...state, rows: action.payload}
        case SET_LEVEL:
            return {...state, level: action.payload}
        default:
            return state;
    }
}

const tetrisReducer = combineReducers({
    tetris,
});

export default tetrisReducer;