// View component: shows posted jobs and their status.
function JobList({ jobs }) {
    if (jobs.length === 0) {
        return <p>No jobs posted yet.</p>;
    }

    return (
        <ul className="job-list">
            {jobs.map(job => (
                <li keey={job.id} className="job-item">
                    <h3>{job.title}</h3>
                    <p>{job.businessName} {job.date} at {job.startTime}</p>
                    <p>${job.payPerHour}/hour  {job.hours} hours  {job.spotsNeeded} spots</p>
                    <span className="job-status">{job.status}</span>
                </li>
            ))}
        </ul>
    );

}

export default JobList;