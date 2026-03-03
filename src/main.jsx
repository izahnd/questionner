import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App.jsx';
import { AppProviders } from './app/providers.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
