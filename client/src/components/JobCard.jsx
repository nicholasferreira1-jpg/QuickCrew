import { useState } from "react";
import { claimSpot } from "../services/api";

function jobCard({ job, workerName, onClaimed}) {
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);

    const claims = job.claims || [];
    const spotsLeft = job.spotsNeeded - claims.length;
    const isFull = spotsLeft <= 0;

    async function handleClaim() {
        setMessage('');
        setIsClaiming(true);

        try{ 
            await claimSpot(job.id, workerName);
            setIsError(false);
            setMessage('Spot claimed! The owner will contact you.');
        }  catch (error) {
            setIsError(true);
            setMessage(error.message);
        } finally {
            setIsClaiming(false);
            onClaimed();
        }
    }

    return (
        <li className="job-item">
            <h3>{job.title}</h3>
            <p>{job.businessName}</p>
            <p>{job.date} at {job.startTime}</p>
            <p>${job.payPerHour}/hour - {job.hours} hours - {job.location}</p>
            <p>{claims.length} of {job.spotsNeeded} spots filled</p>

            {claims.length > 0 && (
                <p className="claimed-by">
                    Claimed by: {claims.map(claim => claim.workerName).join(', ')}
                </p>
            )}

            <div className="job-actions">
                <span className={isFull ? 'job-status filled' : 'job-status'}>{job.status}</span>

                {isFull ? (
                    <span className="job-full">Job Full</span>
                ) : (
                    <button onClick={handleClaim} disabled={isClaiming}>
                        {isClaiming ? 'Claiming...' : 'Claim Spot'}
                    </button>
                )}
            </div>

            {message && (
                <p className={isError ? 'error-message' : 'success-message'}>{message}</p>
            )}
        </li>
    )
 }

 export default jobCard;