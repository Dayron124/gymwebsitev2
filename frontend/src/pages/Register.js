import React, { useState } from 'react';
import axios from '../api/apiClient';
import styled from 'styled-components';

// Styled component for Register page
const RegisterContainer = styled.div`
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input {
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 0.75rem;
      background-color: #ff416c;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: #ff4b2b;
      }
    }
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', { name, email, password });
      console.log(response.data);
      // Handle successful registration (e.g., store token, redirect)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Register</button>
      </form>
    </RegisterContainer>
  );
};

export default Register;
