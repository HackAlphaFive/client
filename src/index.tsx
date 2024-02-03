import React from 'react';
import reportWebVitals from "./reportWebVitals";
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';

const BASENAME = process.env.NODE_ENV === 'development' ? "" : "/client";

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={BASENAME}>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
