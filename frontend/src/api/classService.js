// src/services/classService.js
import axios from 'axios';

const API_URL = '/api/classes'; // Adjust the base URL according to your setup

export const getAllClasses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error.message);
    throw error;
  }
};

export const getClassById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class by ID:', error.message);
    throw error;
  }
};

// Only for admin use
export const createClass = async (classData) => {
  try {
    const response = await axios.post(API_URL, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error.message);
    throw error;
  }
};

export const updateClass = async (id, classData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, classData);
    return response.data;
  } catch (error) {
    console.error('Error updating class:', error.message);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting class:', error.message);
    throw error;
  }
};
