import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Overview, Login, History, Profile, Error, Transaction, MultipleFactors } from "./pages";
import { ProtectProp } from "./types/protectProp.type";
import { LayoutApp } from "./components";
import React, { useEffect } from "react";
import { setHistoriesAddress } from "./store/redux/history/actions";
import { PreProcessHistoryResponse } from "./utils/history";
import { useAppDispatch, useAppSelector } from "./store";
import { preProcessHistoryResponse } from "./utils";
import { listNetWorks } from "./configs/data";
import { getTorusKey } from "./storage/storage-service";
// import { login, logout } from './store/features/login/reducer'
// import type { RootState } from './store/store'
const RouterApp = () => {
  const ProtectedRoute = ({ user, children }: ProtectProp): JSX.Element => {
    if (!getTorusKey().ethAddress) {
      return <Navigate to='/' replace />;
    }
    return children;
  };

  const user = getTorusKey().ethAddress ? true : false;
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
                <Transaction />
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
