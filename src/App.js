import React, { useState, useEffect } from 'react';
import './App.css';

const API_ENDPOINT = "http://localhost:4000"; // Backend server URL

function App() {
  const [missions, setMissions] = useState([]);
  const [userId, setUserId] = useState('');
  const [taskType, setTaskType] = useState('cold_calls');
  const [quantity, setQuantity] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [message, setMessage] = useState('');

  // Fetch missions from backend
  const fetchMissions = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/missions`);
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  };

  // Create a new mission
  const createMission = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/missions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          task_type: taskType,
          quantity: parseInt(quantity),
          timeframe: parseInt(timeframe),
        }),
      });
      const result = await response.json();
      setMessage(result.message || 'Mission created!');
      fetchMissions(); // Refresh missions list
    } catch (error) {
      console.error("Error creating mission:", error);
      setMessage('Failed to create mission.');
    }
  };

  // Fetch missions on component mount
  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mission Platform</h1>

        {/* Form to create a new mission */}
        <div>
          <label>User ID: </label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />

          <label>Task Type: </label>
          <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
            <option value="cold_calls">Cold Calls</option>
            <option value="client_meetings">Client Meetings</option>
            <option value="c_suite_meetings">C-Suite Meetings</option>
          </select>

          <label>Quantity: </label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <label>Timeframe (days): </label>
          <input type="number" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} />

          <button onClick={createMission}>Create Mission</button>
        </div>

        <p>{message}</p>

        {/* List of Missions */}
        <h2>Mission List</h2>
        <ul>
          {missions.map((mission) => (
            <li key={mission.mission_id}>
              Task: {mission.task_type} | Quantity: {mission.quantity} | Status: {mission.status}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;