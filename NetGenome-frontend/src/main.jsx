// main.jsx
import React from "react"; // 👈 REQUIRED for JSX to work
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "@solana/wallet-adapter-react-ui/styles.css";
import SolanaProvider from "./context/SolanaProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <SolanaProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SolanaProvider>
    </StrictMode>
  </BrowserRouter>
);
