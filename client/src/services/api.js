// Handles all requests to the QuickCrew backend API.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchJobs() {
    const response = await fetch(`${API_BASE_URL}/jobs`);

    if (!response.ok) {
        throw new Error('Failed to load jobs');
    }

    return response.json();
}

export async function createJob(jobData) {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });

    const data = await response.json();

    if (!response.ok) {
        // Pass the validation messages from the backend to the form
        const error = new Error('Failed to create job');
        error.details = data.errors || [data.error || 'Something went wrong.'];
        throw error;
    }

    return data;
}