// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { fetchMissions } from '../services/apiService';
import Button from '../components/Button';

export default function HomePage() {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        fetchMissions().then(data => setMissions(data));
    }, []);

    return (
        <div>
            <h1>Mission List</h1>
            <ul>
                {missions.map(mission => (
                    <li key={mission.id}>{mission.task_type}</li>
                ))}
            </ul>
            <Button text="Refresh" onClick={() => fetchMissions()} />
        </div>
    );
}