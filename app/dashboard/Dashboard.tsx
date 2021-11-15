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
    <div>CorecomDashboard content</div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  hot(module)(
    OCA.Dashboard.register("corecomdashboard", (el) => {
      ReactDOM.render(<Dashboard />, el);
    })
  );
});
