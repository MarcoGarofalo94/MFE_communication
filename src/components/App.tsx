import React from "react";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
   
      <div id="app-navigation">
        left lateral menu
      </div>
      <div
        id="app-content"
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        main content
      </div>
      <div id="app-sidebar" style={{ maxWidth: "350px" }}>
        right sidebar
      </div>
    </div>
  );

};

export default App;
