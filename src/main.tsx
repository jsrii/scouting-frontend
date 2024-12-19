// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { Home } from "./components/home/index";
import { Login } from "./components/login/index";
import { Toaster } from "sonner";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import RequireAuth from '@auth-kit/react-router/RequireAuth'

const store = createStore({
  debug: true,
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <RequireAuth fallbackPath={'/login'}>
                <Home />
              </RequireAuth>
            }>
            </Route>
            <Route path="/login" element={
              <Login />
            }>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors />
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>
);
