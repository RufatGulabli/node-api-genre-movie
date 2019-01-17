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

/* Checking Array */
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
});

/* Checking Object */
describe('getProduct', () => {
    it('object', () => {
        const result = lib.getProduct(1);

        // Incorrect, because it will check by reference, whereas these are 2 different objects
        // expect(result).toBe({ id: 1, price: 10 });

        // Matched objects must have exactly given properties
        expect(result).toEqual({ id: 1, price: 10, category: 'Tech' });

        // Matched objects should have at least given properties
        expect(result).toMatchObject({ id: 1, price: 10 });

        // Type of the id will be checked as well
        expect(result).toHaveProperty('id', 1);
    })
});

/*Chekcing Exceptions */
describe('Exceptions', () => {
    it('in case of Error throwing', () => {
        const arr = [null, undefined, 0, false, '', NaN];
        arr.forEach(a => { expect(() => { lib.registerUser(a) }).toThrow() });
    });

    it('in case of correct arguments', () => {
        const result = lib.registerUser('Rufat');
        expect(result).toMatchObject({ username: 'Rufat' });
        expect(result.id).toBeGreaterThan(0);
    });
});

// Exercise
describe('FizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => { lib.fizzBuzz('a') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
        expect(() => { lib.fizzBuzz({}) }).toThrow();
    });

    it(`should return 'FizzBuzz' if input is divizible by 5 & 3`, () => {
        expect(lib.fizzBuzz(30)).toBe('FizzBuzz');
    });

    it(`should return 'Fizz' if input is divisible only by 3`, () => {
        expect(lib.fizzBuzz(12)).toBe('Fizz');
    });

    it(`should return 'Buzz' if input is divisible only by 5`, () => {
        expect(lib.fizzBuzz(20)).toBe('Buzz');
    });

    it(`should return input if input is not divisible by 3 or 5`, () => {
        expect(lib.fizzBuzz(1)).toBe(1);
    });

});


