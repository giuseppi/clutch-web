import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('index.jsx is loading!');

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('About to render App');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);