import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import App from "./App";
import Person from "./components/Person";

export default function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} exact></Route>
        <Route path="/Person/:id" element={<Person />}></Route>
      </Routes>
    </Router>
  );
}
