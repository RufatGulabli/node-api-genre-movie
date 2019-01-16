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

module.exports = {
    absolute: absolute,
    greet: greet,
    getCurrencies: getCurrencies
}