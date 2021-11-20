import {createStore, applyMiddleware} from 'redux'
import {moviesReducer} from "./reducer";
import thunk from "redux-thunk";

export const store = createStore(moviesReducer, applyMiddleware(thunk));