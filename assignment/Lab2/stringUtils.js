const camelCase = function camelCase(string) {
    //check whether string parameter meets required conditions
    if (string === undefined) throw "The string parameter does not exit";
    if (string.length === 0) throw "The string is empty";
    if (typeof string != 'string') throw "The string parameter is not a string";
    if (string == ' ') throw "The string parameter cannot be empty spaces";

    let words = string.toLowerCase().split(' ');
    let returnValue = words[0];

    for(let i=1; i<words.length; i++) {
        let capiChar = words[i][0].toUpperCase();
        let lowChar = words[i].slice(1);
        let newChar = capiChar + lowChar;

        returnValue += newChar;
    }

    return returnValue;
}


const replaceChar = function replaceChar(string) {
    //check whether string parameter meets required conditions
    if (string === undefined) throw "The string parameter does not exit";
    if (string.length === 0) throw "The string is empty";
    if (typeof string != 'string') throw "The string parameter is not a string";
    if (string == ' ') throw "The string parameter cannot be empty spaces";

    let chars = string.split('');  //split character of string into single character array
    let sChar = chars[0];  //starting character of string

    let cnt = 0;  //monitor alternating * and $ characters.  

    for (let i=1; i<chars.length; i++) {
        if (chars[i] === sChar.toLowerCase() || chars[i] === sChar.toUpperCase()) {
            if (cnt % 2 === 0)
                chars[i] = '*';
            else
                chars[i] = '$';
            
            cnt += 1;
        }
    }

    chars = chars.join('');  //concatenating all of the elements in char array

    return chars;
}


const mashUp = function mashUp(string1, string2) {
    //check whether string parameter meets required conditions
    if (string1 === undefined || string1 === undefined) throw "The string1 or string2 parameter does not exit";
    if (typeof string1 != 'string' || typeof string2 != 'string') throw "The string1 or string2 parameter is not a string";
    if (string1.length < 2 || string2.length < 2 ) throw "The string1 and string2 parameters contain at least 2 characters each";

    let new_Char = "";

    let fTwoChar1 = string1.slice(0,2);
    let fTwoChar2 = string2.slice(0,2);

    if (string1.length === 2 && string2.length === 2) {
        new_Char = fTwoChar2 + " " + fTwoChar1;
    }
    else {
        let restChar1 = string1.slice(2);
        let restChar2 = string2.slice(2);

        new_Char = fTwoChar2 + restChar1 + " " + fTwoChar1 + restChar2;
    }

    return new_Char;
}


module.exports = {
    camelCase,
    replaceChar,
    mashUp,
}