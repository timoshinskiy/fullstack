import React from "react";
import {combineReducers, createStore} from "redux";
import {userReducer} from "./reducers/userReducer.js";
import {productsReducer} from "./reducers/productsReducer.js";
import {basketReducer} from "./reducers/basketReducer.js";

const reducer = combineReducers({
    user: userReducer,
    catalog: productsReducer,
    basket: basketReducer
})

export const store = createStore(reducer);