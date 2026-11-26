import { useEffect, useState } from 'react';
import PostJobForm from './components/PostJobForm';
import JobList from './components/Joblist';
import { fetchJobs } from './services/api';
import './App.css'

function App() {
  const [jobs, setJobs] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  async function loadJobs() {
    try {
      setLoadError('');
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      setLoadError('Could not load jobs. Is the server runnning?');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();

  }, []);
  return (
    <main className="app">
      <h1>QuickCrew</h1>
      <PostJobForm onJobPosted={loadJobs} />
      <section>
        <h2>Posted Jobs</h2>
        {isLoading && <p>Loading jobs...</p>}
        {loadError && <p className="error-message">{loadError}</p>}
        {!isLoading && !loadError && <JobList jobs={jobs} />}
      </section>
    </main>
  )
}

export default App;
