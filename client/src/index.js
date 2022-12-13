import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './apps/store';
import { EthProvider } from "./contexts/EthContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EthProvider>
    <Provider store={store} >
      
        {/* <React.StrictMode> */}
          <App />
        {/* </React.StrictMode> */}
      
    </Provider>
  </EthProvider>
  
  
);
