function arrayCheck(array) {
    //check whether array parameter meets required conditions
    if (array === undefined) throw "The array parameter does not exit";
    if (!Array.isArray(array)) throw "The array parameter is not of the proper type, it should be array";
    if (array.length === 0) throw "The array is empty";

    for (let e of array)
        if (typeof e != 'number') throw "The every element of array must be a number";
}


const mean = function mean(array) {
    arrayCheck(array);

    let sum = 0;
    for (let e of array)
        sum += e;

    return sum / array.length;
}


const medianSquared = function medianSquared(array) {  
    arrayCheck(array);

    let median = 0;

    //sort array in ascending order accroding to return value that is subtraction of adjacent array element.
    let sorted_array = array.sort((a,b) => {return a-b;});

    if (sorted_array.length % 2 === 0) {  
        //number of array elements is even
        let midpoint = sorted_array.length / 2;
        median = (sorted_array[midpoint-1] + sorted_array[midpoint])/2;
    }
    else {  
        //number of array elements is odd
        median = sorted_array[(sorted_array.length - 1)/2];
    }

    //return squared median
    return median*median;
}


const maxElement = function maxElement(array) {
    arrayCheck(array);

    //set the first element in array as the max number
    let max = array[0];
    let index_max = 0;

    for (let i=1; i < array.length; i++ ) {
        //Scan the array to find max value and its index
        if(array[i] > max) {
            max = array[i];
            index_max = i;
        }
    }

    //Return both the maximum element of the array and the index (position) of this element as a new object with the value as the key and the index as the value
    let maxObject = {};
    maxObject[max] = index_max;

    return maxObject;
}


const fill = function fill(end, value) {
    //check whether end parameter meets required conditions
    if (end === undefined) throw "The end parameter does not exit";
    if (typeof end != 'number') throw "The end parameter must be a number";
    if (end <= 0) throw "The end parameter must be a positive integer greater than 0";

    let myArray = [];

    if (value === undefined) {
        for (let i = 0; i < end; i++) {
            myArray.push(i);
        }
    }
    else {
        for (let i = 0; i < end; i++) {
            myArray.push(value);
        }
    }

    return myArray;
}


const countRepeating = function countRepeating(array) {
    if (array === undefined) throw "The array parameter does not exit";
    if (!Array.isArray(array)) throw "The array parameter is not of the proper type, it should be array";

    let cRepeatObj = {};
    let tmpObj = {};
    let flag = false;  //set a flag to monitor whether there is repeating element that is counted more than or equal to twice in object

    if (array.length != 0) {
        //array is not empty
        for (let e of array) {
            if (typeof e == 'string' || typeof e == 'number')
                    continue;
            else
                throw "The element of array should be either string or number";
        }
        
        //all element are already either string or number
        //count elements with tmpObj
        for (let i=0; i<array.length; i++) {
            let x = array[i];  //temporary variable
            if (!tmpObj[x])
                tmpObj[x] = 1;
            else {
                tmpObj[x] += 1;
                flag = true;  //there is repeating element that counted at least twice
            }
        }
        //after counting all element with tmpObj,
        if (flag === true)
            for (const [key, value] of Object.entries(tmpObj)) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                //find repeating element in temObj object and store them in cRepeatObj object
                if (value >= 2)
                    cRepeatObj[key] = value;
            }
        else {  //every element just be counted once, there is no repeating element, return an empty object 
            cRepeatObj = {};
        }
    }
    else {  
        //empty array return an empty object 
        cRepeatObj = {};
    }

    return cRepeatObj;
}


const isEqual = function isEqual(arrayOne, arrayTwo) {
    if (arrayOne === undefined || arrayTwo === undefined) throw "The array parameter does not exit";
    if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) throw "The parameter is not of the proper type, both of them should be array";
    if (arrayOne.length !== arrayTwo.length) return false;  //check if they are equal in terms of size.

    let equal = true;

    //sort array
    arrayOne.sort();
    arrayTwo.sort();

    //check the array elements to see if they are equal.
    //an array of arrays
    for (let i=0; i < arrayOne.length; i++) {
        if (Array.isArray(arrayOne[i]) && Array.isArray(arrayTwo[i])) {
            arrayOne[i].sort();
            arrayTwo[i].sort();
            for (let j=0; j < arrayOne[i].length; j++) {
                if (arrayOne[i][j] !== arrayTwo[i][j]) {
                    equal = false;
                    break;
                }
            }
        }
        else {
            if (arrayOne[i] !== arrayTwo[i]) {
                equal = false;
                break;
            }
        }
    }

    return equal;
}


module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual,
}

