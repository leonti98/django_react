import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Main.css';
import LoadingIndicator from './LoadingIndicator';

const Form = ({ route, method }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        localStorage.setItem('username', username);
        navigate('/');
      } else {
        alert('Registered successfully');
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response.data);
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
        <h1>{name}</h1>
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
        <div className="align-content-center">
          <button
            className="btn btn-primary btn"
            type="submit"
            disabled={loading}
          >
            {name}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
