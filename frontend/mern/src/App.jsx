import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/Create.jsx";
import Read from "./components/Read.jsx";
import Update from "./components/Update.jsx";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />}></Route>
          <Route exact path="/all" element={<Read />}></Route>
          <Route exact path="/:id" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
