import { hot } from "react-hot-ts";
import { store } from "./store/store";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import './index.css';
import App from "./App";
import { EngineClass, MicroFrontend } from "Engine";
const Engine = window['Engine'];
const MF2 = new MicroFrontend(
  "mf2",
  () =>
    hot(module)(
      ReactDOM.render(
        //<Provider store={store}>
        <App />,
        //</Provider>,
        (document as any).getElementById("mf2", "mf2")
      )
    ),
  () => ReactDOM.unmountComponentAtNode((document as any).getElementById("mf2", "mf2"))
);

Engine.register(MF2);