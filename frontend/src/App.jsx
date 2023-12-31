import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './app/pages/Signin';
import Signup from './app/pages/Signup';
import Home from './app/pages/Home';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route
        path="/"
        element={<Home />}
        />
      </Routes>
    </Router>
  );
};

export default App;
