import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Overview, Login, History, Profile, Error, Transaction, MultipleFactors, SignTransaction } from "./pages";
import { ProtectProp } from "./types/protectProp.type";
import { LayoutApp } from "./components";
import { useLocalStorage } from "usehooks-ts";
import { KeyPair } from "./wallet/types";
// import { login, logout } from './store/features/login/reducer'
// import type { RootState } from './store/store'
const RouterApp = () => {
  const [masterKey] = useLocalStorage<KeyPair | null>("master-key", null);

  const ProtectedRoute = ({ children }: ProtectProp): JSX.Element => {
    if (!masterKey) {
      return <Navigate to='/' replace />;
    }
    return children;
  };

  const user = masterKey ? true : false;
  return (
    <Router>
      <LayoutApp>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/multiple-factors' element={<MultipleFactors />} />
          <Route
            path='/sign-transaction/:transactionId'
            element={
              <ProtectedRoute user={user}>
                <SignTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path='/overview'
            element={
              <ProtectedRoute user={user}>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path='/transaction'
            element={
              <ProtectedRoute user={user}>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            path='/history'
            element={
              <ProtectedRoute user={user}>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='*'
            element={
              <ProtectedRoute user={user}>
                <Error />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutApp>
    </Router>
  );
};
export default RouterApp;
