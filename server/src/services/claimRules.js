// Business logic: rules for claiming a spot on a job.
// These functions only use plain data (no database), so they are easy to unit test.


function canClaimSpot(job, claims, workerName) {
    const name = (workerName || '').trim();
    
    if(name === '') {
        return ' Unable to claim the spot without a Name. ' ;
    }

    const alreadyClaimed = claims.some(
        claim => claim.workerName.trim().toLowerCase() === name.toLowerCase()
    );
    if (alreadyClaimed) {
        return ' Already claimed your spot. ';
    }

    // No spots left
    if (claims.length >= job.spotsNeeded) {
        return ' This job is full. ';
    }

    return null;

}

function getJobStatus(job, claims) {
    return claims.length >= job.spotsNeeded ? 'Filled' : 'Open';
}

module.exports = { canClaimSpot, getJobStatus };