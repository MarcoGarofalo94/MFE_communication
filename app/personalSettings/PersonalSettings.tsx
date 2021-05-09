import { hot } from "react-hot-ts";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "@store-personal/store";
import "./PersonalSettings.css";


const PersonalSettings:React.FC = ( ) => {
  return <div>Personal Settings</div>
}


hot(module)(
  ReactDOM.render(
    <Provider store={store}>
      <PersonalSettings />
    </Provider>,
    document.getElementById("opbridge-personal-settings")
  )
);
