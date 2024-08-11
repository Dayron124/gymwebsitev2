// src/pages/CreatePost.js
import React, { useState } from 'react';
import axios from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for CreatePost
const CreatePostContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CreatePostHeader = styled.h2`
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

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', post);
      navigate('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <CreatePostContainer>
      <CreatePostHeader>Create New Post</CreatePostHeader>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Post Title"
          required
        />
        <TextArea
          name="content"
          value={post.content}
          onChange={handleChange}
          rows="10"
          placeholder="Post Content"
          required
        />
        <Button type="submit">Create Post</Button>
      </form>
    </CreatePostContainer>
  );
};

export default CreatePost;
