// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchDrawings } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        const loadDrawings = async () => {
            const response = await fetchDrawings();
            setDrawings(response.data);
        };
        loadDrawings();
    }, []);

    return (
        <div>
            <h1>All Drawings</h1>
            <ul>
                {drawings.map(drawing => (
                    <li key={drawing._id}>
                        <Link to={`/drawing/${drawing._id}`}>{drawing.boardName}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/new-drawing">Create New Drawing</Link>
        </div>
    );
};

export default Home;
