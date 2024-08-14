import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Appp from './components/Appp';
import UserProvider from './components/Context/UserProvider';
import Toast from './Toast';
import { TokenProvider } from './components/Context/TokenProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenProvider>
  <UserProvider>
    <App />
  {/* <Toast /> */}
    
  </UserProvider>
  </TokenProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
