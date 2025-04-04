import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
const App = () => {
  return (
    <div className="font-primary bg-gradient-to-br from-blue-900 to-blue-950 tracking-widest">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
