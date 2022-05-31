<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_DOMAIN;
const clientId = process.env.REACT_APP_CLIENT_ID;
=======
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
>>>>>>> 10b6326172a9c23fedd772e40b2ea09895ccc947

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
<<<<<<< HEAD
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.href}
  >
    <Provider store={store} >
=======
    domain={DOMAIN}
    clientId={CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
>>>>>>> 10b6326172a9c23fedd772e40b2ea09895ccc947
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </Auth0Provider>
<<<<<<< HEAD


=======
>>>>>>> 10b6326172a9c23fedd772e40b2ea09895ccc947
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
