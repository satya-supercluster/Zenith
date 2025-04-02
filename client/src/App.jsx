import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
const App = () => {
  return (
    <div className="font-primary bg-gray-900 tracking-widest">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
