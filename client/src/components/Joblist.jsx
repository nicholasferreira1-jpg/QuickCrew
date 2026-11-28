// View component: shows posted jobs and their status.
import JobCard from "./JobCard";

function JobList({ jobs, workerName, onClaimed }) {
    if (jobs.length === 0) {
        return <p>No jobs posted yet.</p>;
    }

    return (
        <ul className="job-list">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} workerName={workerName} onClaimed={onClaimed} />
            ))}
        </ul>
    );

}

export default JobList;