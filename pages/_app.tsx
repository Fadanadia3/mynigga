import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Assurez-vous d'avoir le fichier App.tsx dans le même dossier
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pour mesurer la performance de l'application
reportWebVitals();
