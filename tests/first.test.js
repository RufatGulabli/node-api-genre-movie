const lib = require('../lib');

describe('absolute', () => {
    it('positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('greet', () => {
        const result = lib.greet('Rufat');
        expect(result).toMatch(/Rufat/);
        expect(result).toContain('Rufat');
    });
});

describe('getCurrencies', () => {
    it('arrayTesting', () => {
        const result = lib.getCurrencies();

        //Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AZN');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper Way
        expect(result).toContain('USD');
        expect(result).toContain('AZN');
        expect(result).toContain('EUR');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'AZN', 'USD']));
    });
})


