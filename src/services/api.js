// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';  // Your backend URL

export const fetchDrawings = async () => {
    return await axios.get(`${API_BASE_URL}/drawings`);
};

export const fetchDrawingById = async (id) => {
    return await axios.get(`${API_BASE_URL}/drawings/${id}`);
};

export const createDrawing = async (drawingData) => {
    return await axios.post(`${API_BASE_URL}/drawings`, drawingData);
};

export const updateDrawing = async (id, drawingData) => {
    return await axios.put(`${API_BASE_URL}/drawings/${id}`, drawingData);
};

export const deleteDrawing = async (id) => {
    return await axios.delete(`${API_BASE_URL}/drawings/${id}`);
};
