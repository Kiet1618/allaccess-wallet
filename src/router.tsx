import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Wallet, Profile, Error } from './pages'
import { ProtectProp } from './types/protectProp.type'
import { GlobalStyles } from './styles/global.css'
import { LayoutApp } from './components';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './store/features/login/checkLoginReducer'
import type { RootState } from './store/store'

const RouterApp = () => {
    const ProtectedRoute = ({ user, children }: ProtectProp): JSX.Element => {
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };
    // const user = useSelector((state: RootState) => state.login.value)
    const user = true;
    return (
        <Router>
            <LayoutApp >
                <Routes>
                    <Route path='/login' element={
                        <Login />
                    } />
                    <Route path='/' element={
                        <ProtectedRoute user={user}>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path='/wallet' element={
                        <ProtectedRoute user={user}>
                            <Wallet />
                        </ProtectedRoute>
                    } />
                    <Route path='/profile' element={
                        <ProtectedRoute user={user}>
                            <Profile />
                        </ProtectedRoute>} />
                    <Route path='*' element={
                        <ProtectedRoute user={user}>
                            <Error />
                        </ProtectedRoute>} />
                </Routes>
            </LayoutApp>
        </Router>
    )
}
export default RouterApp;