import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
const rootElement = document.getElementById("root");
ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    rootElement
);
