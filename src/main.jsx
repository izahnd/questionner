import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { App } from './App.jsx';
import { FlashcardsProvider } from './state/FlashcardsContext.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <FlashcardsProvider>
      <App />
    </FlashcardsProvider>
  </React.StrictMode>,
);
