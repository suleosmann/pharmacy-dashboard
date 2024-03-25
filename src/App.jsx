import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./Routes/Routes"; // Import your routing setup

function App() {
  return (
    <Router>
      <AllRoutes />
    </Router>
  );
}

export default App;
