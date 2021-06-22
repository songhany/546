function checkIsProperNumber(val, variableName) {
    if (typeof val !== 'number') throw `${variableName || 'provided variable'} is not a number`;
    if (isNaN(val)) throw `${variableName || 'provided variable'} is NaN'`;
}

let x = 100;
module.exports = {
    description: "This is a calculator for CS-546",

    divideTwoNumbers: (num, den) => {
        checkIsProperNumber(num, "numerator")
        checkIsProperNumber(den, "numerator")

        if (den === 0) throw "Error: Division by zero"
        return num / den
    },

    addTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, "Number1")
        checkIsProperNumber(num2, "Number2")

        return num1 + num2
    },

    subtractTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, "Number1")
        checkIsProperNumber(num2, "Number2")

        return num1 - num2
    },

    multiplyTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, "Number1")
        checkIsProperNumber(num2, "Number2")

        return num1 * num2
    },
    x,
}