import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { saveTreeItems, loadTreeItems } from "./localStorage";

import "./index.css";
import App from "./App";

import { rootReducer } from "./redux";

const store = createStore(rootReducer, {
  treeItems: loadTreeItems(),
  treeItemIdOnEditMode: null,
});

store.subscribe(async () => {
  saveTreeItems(store.getState().treeItems);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
