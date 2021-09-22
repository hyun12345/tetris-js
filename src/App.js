import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import tetrisReducer from './_reducers/index';

import Tetris from './components/views/Tetris/Tetris';

const App = () => (
    <Provider store={createStore(tetrisReducer)}>
        <Tetris />
    </Provider>
);

export default App;
