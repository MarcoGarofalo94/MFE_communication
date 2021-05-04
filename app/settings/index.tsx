import { hot } from "react-hot-ts";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Settings from "./Settings";
import { store } from "@store-settings/store";
import "./index.css";

hot(module)(
  ReactDOM.render(
    <Provider store={store}>
      <Settings />
    </Provider>,
    document.getElementById("customappname1-admin-settings")
  )
);
