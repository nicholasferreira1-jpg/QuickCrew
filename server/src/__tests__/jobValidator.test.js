const { validateJobData } = require('../services/jobValidator');

const today = new Date(2026, 11, 1); // December 1, 2026

const validJob = {
        businessName: 'Fast Movers',
        title: 'Apartment move',
        date: '2026-12-05',
        startTime: '9:00 AM',
        hours: 4,
        location: 'Portland, OR',
        payPerHour: 20,
        spotsNeeded: 2,
        description: 'Help load and unload a truck'
};


describe('validateJobData function', () => {
    test('should return an empty array when it is a valid job', () => {
        expect(validateJobData(validJob, today)).toEqual([]);
    });

    test('should return a missing title error', () => {
        const job = { ...validJob, title: '' };
        expect(validateJobData(job, today)).toEqual([ " Missing required field (Title). "]);
    });

    test('should return an invalid date error', () => {
        const job = { ...validJob, date: '2026-02-05' };
        expect(validateJobData(job, today)).toEqual([ "Invalid Date."]);
    });

    test('should return an invalid spotsNeeded error', () => {
        const job = { ...validJob, spotsNeeded: 0 };
        const job2 = { ...validJob, spotsNeeded: 1.5 };
        expect(validateJobData(job, today)).toEqual([ " Spots Needed has to be above 0 ."]);
        expect(validateJobData(job2, today)).toEqual([ " Spots Needed can't be decimal."]);

    });

    test('should return an error when pay is negative or 0', () => {
        const job = { ...validJob, payPerHour: -15 };
        const job2 = { ...validJob, payPerHour: 0 };
        expect(validateJobData(job, today)).toEqual([ "Pay per hour has to be above 0."]);
        expect(validateJobData(job2, today)).toEqual([ "Pay per hour has to be above 0."]);

    });

    test('should return an error when hour is negative or 0', () => {
        const job = { ...validJob, hours: 0 };
        const job2 = { ...validJob, hours: -5 };
        expect(validateJobData(job, today)).toEqual([ " Hours has to be above 0"]);
        expect(validateJobData(job2, today)).toEqual([ " Hours has to be above 0"]);

    });
});