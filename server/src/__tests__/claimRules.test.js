const { canClaimSpot, getJobStatus } = require('../services/claimRules');

const job = { id: 1, spotsNeeded: 2 };

describe('canClaimSpot function', () => {
    test('should allow a worker to claim when no spots are taken', () => {
        const claims = [];
        expect(canClaimSpot(job, claims, 'Maria')).toBeNull();
    });

    test('should not allow a worker to claim when the job is full', () => {
        const claims = [{ workerName: 'Maria'}, { workerName: 'James'}];
        expect(canClaimSpot(job, claims, 'Maria')).toBe(' This job is full. ');
    });

    test('should allow a worker when there is one spot left', () => {
        const claims = [{ workerName: 'James'}];
        expect(canClaimSpot(job, claims, 'Maria')).toBeNull();
    });

    test('should not allow the same worker to claim twice', () => {
        const claims = [{ workerName: 'James'}];
        expect(canClaimSpot(job, claims, 'James')).toBe(' Already claimed your spot. ');
    });

    test('should not claim worker without a name', () => {
        const claims = [{ workerName: 'James'}];
        expect(canClaimSpot(job, claims, '')).toBe(' Unable to claim the spot without a Name. ');
    });

});

describe('getJobStatus function', () => {
    test('should return Open when no spots are taken', () => {
        const claims = [];
        expect(getJobStatus(job, claims)).toBe('Open');
    });

    test('should return Open when one spot is taken', () => {
        const claims = [{ workerName: 'James'}];
        expect(getJobStatus(job, claims)).toBe('Open');
    });
    test('should return Filled when all spots are taken', () => {
        const claims = [{ workerName: 'Maria'}, { workerName: 'James'}];
        expect(getJobStatus(job, claims)).toBe('Filled');
    });
})