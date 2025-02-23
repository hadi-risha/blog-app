import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; // ✅ Add this import

import './index.css'
import App from './App.jsx'
import { UserDataProvider } from "./context/userDataProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </BrowserRouter>
  </StrictMode>
);
