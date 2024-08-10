import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/apiClient';
import styled from 'styled-components';

// Styled component for Login page
const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #555;
    }

    input {
      padding: 0.75rem;
      margin-bottom: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      color: #333;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #ff416c;
        outline: none;
      }
    }

    button {
      padding: 0.75rem;
      background-color: #ff416c;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #ff4b2b;
      }
    }
  }

  p.error {
    color: red;
    font-weight: bold;
    text-align: center;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      navigate('/'); // Redirect after successful login
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </LoginContainer>
  );
};

export default Login;
