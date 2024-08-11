// src/pages/EditPage.js
import React, { useState, useEffect } from 'react';
import axios from '../api/apiClient';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for EditPage
const EditPageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EditPageHeader = styled.h2`
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #ff416c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ff4b2b;
  }
`;

const EditPage = () => {
  const { id } = useParams(); // Assuming pages are identified by `id`
  const [page, setPage] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await axios.get(`/api/pages/${id}`);
        setPage(data);
      } catch (error) {
        console.error('Error fetching page:', error);
      }
    };

    fetchPage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/pages/${id}`, page);
      navigate('/admin');
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  return (
    <EditPageContainer>
      <EditPageHeader>Edit Page</EditPageHeader>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="title"
          value={page.title}
          onChange={handleChange}
          placeholder="Page Title"
          required
        />
        <TextArea
          name="content"
          value={page.content}
          onChange={handleChange}
          rows="10"
          placeholder="Page Content"
          required
        />
        <Button type="submit">Update Page</Button>
      </form>
    </EditPageContainer>
  );
};

export default EditPage;
