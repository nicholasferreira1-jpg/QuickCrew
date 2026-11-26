// Business logic: checks job data before it is saved.
// Returns a list of error messages. An empty list means the job is valid.

// Required fields and the label used in each error message
const REQUIRED_FIELDS = {
    businessName: 'Business Name',
    title: 'Title',
    date: 'Date',
    startTime: 'Start Time',
    hours: 'Hours',
    location: 'Location',
    payPerHour: 'Pay Per Hour',
    spotsNeeded: 'Spots Needed',
};

// Turns a Date into 'YYYY-MM-DD' text so it can be compared with the job's date
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

function validateJobData(data, today = new Date()) {
    const errors = [];

    // Check that every required field has a value
    for (const [field, label] of Object.entries(REQUIRED_FIELDS)) {
        if (isEmpty(data[field])) {
            errors.push(` Missing required field (${label}). `);
        }
    }

    // The job can't be in the past
    if (!isEmpty(data.date) && data.date < formatDate(today)) {
        errors.push('Invalid Date.');
    }

    // Spots must be a whole number above 0
    if (!isEmpty(data.spotsNeeded)) {
        const spots = Number(data.spotsNeeded);
        if (spots <= 0) {
            errors.push(' Spots Needed has to be above 0 .');
        } else if (!Number.isInteger(spots)) {
            errors.push(" Spots Needed can't be decimal.");
        }
    }

    // Pay must be above 0
    if (!isEmpty(data.payPerHour) && Number(data.payPerHour) <= 0) {
        errors.push('Pay per hour has to be above 0.');
    }

    // Hours must be above 0
    if (!isEmpty(data.hours) && Number(data.hours) <= 0) {
        errors.push(' Hours has to be above 0');
    }

    return errors;
}

module.exports = { validateJobData };