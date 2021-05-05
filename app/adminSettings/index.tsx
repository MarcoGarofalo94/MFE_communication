import { hot } from "react-hot-ts";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AdminSettings from "./AdminSettings";
import { store } from "app/adminSettings/store/store";
import "./index.css";

hot(module)(
  ReactDOM.render(
    <Provider store={store}>
      <AdminSettings />
    </Provider>,
    document.getElementById("customappname1-admin-settings")
  )
);
