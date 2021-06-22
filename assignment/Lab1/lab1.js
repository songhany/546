const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let qOneObj = {};
    let isPrime = true;
    
    if (arr === undefined || arr.length == 0)
        // array empty or does not exist
        qOneObj = {};
    else 
    {
        //extract every element from array for processing
        for (let e of arr) 
        {
            isPrime = true;
            if (e == '1')
                isPrime = false;
            for(let i=2; i < e; i++)
            {
                if (e % i == 0) 
                {
                    isPrime = false;
                    break;
                }
            }
            qOneObj[e] = isPrime;   //use a number as key, console.log the return value will have quotes around the keys
        }
    }
    return qOneObj;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    let result = 0;

    if (arr === undefined || arr.length == 0)
        // array empty or does not exist
        result = 0; 
    else 
    {
        for (let e of arr) 
            result += e * e;

        result = Math.pow(result, 5);  //raise to 5th power
        result = Math.round((Math.sqrt(result) + Number.EPSILON) * 100 ) / 100 ;  //sqrt number and round the 2nd decimal place. https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    }

    return result;
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    const consonants = "BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz";
    const vowels = "AEIOUaeiou";
    const punctuation = ".,?!'\":;'—...-()";
    const specialCharacters = "~`!@#$%^&*-_|";
    const numbers = "0123456789";

    let qThreeObj = {
        consonants: 0,
        vowels: 0,
        numbers: 0,
        spaces: 0,
        punctuation: 0,
        specialCharacters: 0
    };

    for (let c of text) 
    {
        if (consonants.includes(c))
            qThreeObj.consonants += 1;
        else if (vowels.includes(c))
            qThreeObj.vowels += 1;
        else if (c === " ")
            qThreeObj.spaces += 1;
        else if (punctuation.includes(c))
            qThreeObj.punctuation += 1;
        else if (specialCharacters.includes(c))
            qThreeObj.specialCharacters += 1;
        else if (numbers.includes(c))
            qThreeObj.numbers += 1;
    }
    return qThreeObj
}

const questionFour = function questionFour(num1, num2,num3) {
    // Implement question 4 here
    let loan_amount = num1;
    let interest_rate_month = num2 / 100 / 12;
    let month = num3 * 12;

    let month_pay_loan = loan_amount * (interest_rate_month * Math.pow(1+interest_rate_month, month) / (Math.pow(1+interest_rate_month, month) - 1));
    
    return (Math.round(month_pay_loan * 100) / 100).toFixed(2);
}

module.exports = {
    firstName: "Songhan", 
    lastName: "Yu", 
    studentId: "10470449",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};