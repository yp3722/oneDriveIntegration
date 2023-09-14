import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { Provider } from 'react-redux';
import store from './store';

const msalConfig = {
  auth: {
    clientId: '328de4b2-58ef-4d0a-b7e1-3d0d98b40c27',
  }
};

const publicClientApplication = new PublicClientApplication(msalConfig);

// Use createRoot to render your app
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MsalProvider instance={publicClientApplication}>
        <App />
      </MsalProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
