import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import common from '../Reducers/common.js';


const reducer = combineReducers({
    common,
});


const store = createStore(reducer, applyMiddleware(thunk)
);

export default store;