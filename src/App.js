import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase/config";
import ChatRoom from "./pages/chat_room";
import Login from "./pages/login";
import { handleAuthStateChanged } from "./redux/actions/authAction";

function App() {
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
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
