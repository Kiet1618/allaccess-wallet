import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Wallet, Profile, Error } from './pages'


const Roter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    )
}
export default Roter;