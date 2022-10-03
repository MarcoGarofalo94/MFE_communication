import { hot } from "react-hot-ts";
import { store } from "./store/store";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { EngineClass, MicroFrontend } from "Engine";
const Engine = window['Engine'];
const MF1 = new MicroFrontend(
  "mf1",
  () =>
    hot(module)(
      ReactDOM.render(
        //<Provider store={store}>
        <App />,
        //</Provider>,
        (document as any).getElementById("mf1", "mf1")
      )
    ),
  () =>  ReactDOM.unmountComponentAtNode((document as any).getElementById("mf1", "mf1"))
);

Engine.register(MF1);
