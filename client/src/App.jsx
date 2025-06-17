import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './mainpages/Home';
import AboutUs from './mainpages/AboutUs';
import ContactUs from './mainpages/ContactUs';

function App() {
  const [backendMessage, setBackendMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/')  // Backend URL
      .then(res => res.text())       // Assuming plain text response
      .then(data => setBackendMessage(data))
      .catch(err => setBackendMessage("❌ Error fetching backend"));
  }, []);

  return (
    <Router>
      <div className="text-center p-2 text-sm text-gray-500">
        🔌 Backend says: {backendMessage}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
