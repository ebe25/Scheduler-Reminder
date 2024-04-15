
import Home from "./components/Home";
import Header from "./components/ui/header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {socket} from "./socket";
import React from "react";

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
