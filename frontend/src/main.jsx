import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { sdk } from '@farcaster/miniapp-sdk'; // ⬅️ main add

// React app mount
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mini App init -> splash hide
async function initMiniApp() {
  try {
    // Farcaster/Base er vitore cholche naki normal browser, eta check kore
    const isMiniApp = await sdk.isInMiniApp();  // optional but recommended 

    if (isMiniApp) {
      // App ready hole splash hide korte hobe 
      await sdk.actions.ready();
    }
  } catch (error) {
    console.error('Mini App SDK initialization failed', error);
  }
}

initMiniApp();
