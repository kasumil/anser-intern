/* eslint-disable import/first */

import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducers/";

const store = createStore(rootReducer, composeWithDevTools());

import "./Styles/reset.css";
import "./Styles/common.css";

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
