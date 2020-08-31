import React from 'react';
import logo from './logo.svg';
import './App.css';

// Survey.js
import Survey from './components/Survey'
// Result.js
import Result from './components/Result'

function App() {
  return (
    <div className="main">
      {/* <Survey></Survey> */}
      <Result></Result>
    </div>
  );
}

export default App;
