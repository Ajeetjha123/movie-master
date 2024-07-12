import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ContextProvider>
          <Router>
            <App />
          </Router>
        </ContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
