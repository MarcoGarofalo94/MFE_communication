import { hot } from "react-hot-ts";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import PersonalSettings from "./PersonalSettings";
import { store } from "app/adminSettings/store/store";
import "./index.css";

hot(module)(
  ReactDOM.render(
    <Provider store={store}>
      <PersonalSettings />
    </Provider>,
    document.getElementById("customappname1-personal-settings")
  )
);
