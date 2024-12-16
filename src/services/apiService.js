// src/services/apiService.js
const API_ENDPOINT = "http://localhost:4000"; // Backend URL

export async function fetchMissions() {
    const response = await fetch(`${API_ENDPOINT}/missions`);
    if (!response.ok) throw new Error("Failed to fetch missions");
    return response.json();
}

export async function createMission(payload) {
    const response = await fetch(`${API_ENDPOINT}/missions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return response.json();
}