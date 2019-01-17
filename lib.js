/* This file do not associated with the projet
 * it's created only for test (TDD - JEST) purposes */


function absolute(number) {
    return (number >= 0) ? number : -number;
}

function greet(name) {
    return "Hello" + name;
}

function getCurrencies() {
    return ['USD', 'AZN', 'EUR'];
}

function getProduct(id) {
    return { id: 1, price: 10, category: 'Tech' };
}

function registerUser(username) {
    if (!username) throw new Error('Username is required.');
    return { id: new Date().getTime(), username: username };
}

function fizzBuzz(input) {
    if (typeof input !== 'number') throw new Error('Input should be a number');
    if ((input % 3 === 0) && (input % 5) === 0) return 'FizzBuzz';
    if(input % 3 === 0) return 'Fizz';
    if(input % 5 === 0) return 'Buzz';
    return input;
}

module.exports = {
    absolute: absolute,
    greet: greet,
    getCurrencies: getCurrencies,
    getProduct: getProduct,
    registerUser: registerUser,
    fizzBuzz: fizzBuzz
}