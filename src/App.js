import React from 'react';
import Login from './components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Login />
      </div>
    </Router>
  );
}

export default App;
