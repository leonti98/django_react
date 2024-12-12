import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Main.css';
import LoadingIndicator from '../components/LoadingIndicator';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const route = 'api/user/register/';

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post(route, { username, password });
      alert('Registered successfully');
      navigate('/login');
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="form-container border p-5 shadow-sm d-flex flex-column"
      >
        <h1>Register</h1>
        {Object.keys(message).map((key) => (
          <p key={key} className="text-danger">
            {key}: {message[key]}
          </p>
        ))}

        <div className="mb-3">
          <label htmlFor="username" className="form-lable">
            Username
          </label>
          <input
            itemID="username"
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            itemID="password"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {loading && <LoadingIndicator />}
        <div className="align-content-center d-flex justify-content-around">
          <button
            className="btn btn-primary btn"
            type="submit"
            disabled={loading}
          >
            Register
          </button>
          <button
            className="btn btn-primary btn"
            onClick={() => navigate('/login')}
            type="button"
            disabled={loading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
