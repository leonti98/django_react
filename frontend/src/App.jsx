import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import FollowersNotes from './pages/FollowersNotes';

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};

const ReginsterAndLogout = () => {
  localStorage.clear();
  return <Register to="/register" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ReginsterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/:user_id" element={<UserProfile />} />
        <Route path="/notes/followers" element={<FollowersNotes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
