import React from "react";
import ReactDOM from "react-dom";
import XTermPanel from "./pages/xterm";
import "./utils/util";

const App = () => {
  return (
    <div>
      <XTermPanel />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
