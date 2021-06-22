const makeArrays = function makeArrays(arrOfObj) {
    if (arrOfObj === undefined) throw "The arrOfObj input parameter does not exit";
    
    for (let e of arrOfObj) {
        if (e.constructor !== Object) throw "The array element must be object";
        if (Object.entries(e).length === 0 && e.constructor === Object)  //check if an object is empty. https://flaviocopes.com/how-to-check-object-empty/
            throw "Object in array must not be an empty object";
    }

    if (arrOfObj.length < 2) throw "You should include at least 2 elements(objects) in the array";

    //make array
    let retArr = [];
    for (let e of arrOfObj) {
        for (const [key, value] of Object.entries(e)) {
            retArr.push([key, value]);
        }
    }

    return retArr;
}


const isDeepEqual = function isDeepEqual(obj1, obj2) {
    if (obj1 === undefined || obj2 === undefined) throw "The input parameter does not exit, you should provide both parameter";
    if (obj1.constructor !== Object || obj2.constructor !== Object) throw "Each parameter must be object";
  
    //check each field (at every level deep) in obj1 and obj2 for equality. reference: https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
        return false;
    }
  
    for (const key of keys1) {
        let value1 = obj1[key];
        let value2 = obj2[key];
  
        //judge if object1 and object2's corresponding value are object
        let areObjects = (value1 != null && typeof value1 ==='object') && (value2 != null && typeof value2 ==='object');
        // objects' value is an object, using recursion call itself to judge equality by value
        // objects' value is not an object, compare value directly
        if (areObjects && !isDeepEqual(value1, value2) 
        || !areObjects && value1 !== value2) {
            return false;
        }
    }
  
    return true;
}


const computeObject = function computeObject(object, func) {
    if (object.constructor !== Object) throw "The first input parameter should be an object";
    if (Object.keys(object).length === 0 || Object.values(object).length === 0) throw "Object must have at least one key/value pair";
    
    let values = Object.values(object);
    for (let n of values) {
        if (typeof n != 'number') throw "All values for each key in the object must be numbers";
    }

    if (typeof func != 'function') throw "Second parameter must be a function";

    //compute Object
    let newObj = {};
    for (const [key, value] of Object.entries(object)) {
        newObj[key] = func(value);
    }

    return newObj;
}


module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject,
}
