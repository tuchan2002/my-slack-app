import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/config';
import Home from './pages/home';
import Login from './pages/login';
import { handleAuthStateChanged } from './redux/actions/authAction';

function App() {
    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubcribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                dispatch(handleAuthStateChanged({ displayName, email, uid, photoURL }));
            }
        });

        return () => {
            unsubcribed();
        };
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path='/' element={authReducer.user ? <Home /> : <Login />} />
            </Routes>
        </Router>
    );
}

export default App;
