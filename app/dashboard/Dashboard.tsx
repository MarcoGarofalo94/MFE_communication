import { hot } from "react-hot-ts";
import React from "react";
import ReactDOM from "react-dom";
import "./Dashboard.css";


interface DataResponse {
  name: string;
  path: string;
}

const Dashboard: React.FC = () => {

  return (
    <div>Customappname2 content</div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  hot(module)(
    OCA.Dashboard.register("customappname2", (el) => {
      ReactDOM.render(<Dashboard />, el);
    })
  );
});
