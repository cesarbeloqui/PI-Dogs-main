import React from "react";
import { createRoot } from "react-dom/client"; // Importa createRoot en lugar de render
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import "./index.css";

const root = createRoot(document.getElementById("root")); // Crea el root
// Renderiza tu componente App dentro del root
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
