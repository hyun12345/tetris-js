import { useEffect, useCallback, useMemo } from 'react';

// using react-redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../_actions/index';

export const useGameValues = () => {
    const dispatch = useDispatch();
    const { rowsCleared } = useSelector((store) => ({rowsCleared:store.tetris.rowsCleared}), shallowEqual);
    const { score } = useSelector((store) => ({score:store.tetris.score}), shallowEqual);
    const { rows } = useSelector((store) => ({rows:store.tetris.rows}), shallowEqual);
    const { level } = useSelector((store) => ({level:store.tetris.level}), shallowEqual);

    // original tetris game score
    const linePoints = useMemo(() => {
        return [40, 100, 300, 1200];
    }, []);

    const calcScore = useCallback(() => {
        // if have score
        if (rowsCleared > 0) {
            // original tetrigs game score calculated
            dispatch(actions.setScore(score + linePoints[rowsCleared - 1] * (level + 1)));
            dispatch(actions.setRows(rows, rowsCleared));
        }
    }, [linePoints, rowsCleared, level, dispatch]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);
};
