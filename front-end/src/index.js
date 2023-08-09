import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Service from './service';

Service.interceptors({
  request: request => {
    if(localStorage.getItem("token") != null){
      const decode = JSON.parse(atob(localStorage.getItem("token").split('.')[1]));
      if (decode.exp * 1000 < new Date().getTime()) {
          localStorage.removeItem("token")
          console.log('Time Expired');
      }
    }
    return request;
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

