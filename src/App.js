import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Vote from "./pages/Vote";
// ...existing imports...

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ...existing routes... */}
        <Route path="/vote" element={<Vote />} />
        {/* ...existing routes... */}
      </Routes>
    </Router>
  );
}

export default App;
