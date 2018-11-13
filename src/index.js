import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./store/reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const composeEnhancers=composeWithDevTools({

})
const store = createStore(rootReducer,
   composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
