// Điểm khởi nhập (Entry Point) của ứng dụng React Portfolio
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Khởi tạo root DOM element và render ứng dụng
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
