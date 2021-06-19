import { hot } from "react-hot-ts";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from '@store-admin/store';
import "./AdminSettings.css";

const AdminSettings: React.FC = () => {
  return <div>Admin Settings</div>;
};

hot(module)(
  ReactDOM.render(
    <Provider store={store}>
      <AdminSettings />
    </Provider>,
    document.getElementById("lcntable-admin-settings")
  )
);
