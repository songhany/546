const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

// Mean Tests
try {
    // Should Pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const meanTwo = arrayUtils.mean(["guitar", 1, 3, "apple"]);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}


// medianSquared Tests
try {
    // Should Pass
    const medianSquaredOne = arrayUtils.medianSquared([1, 2, 4]);
    console.log('medianSquared passed successfully');
} catch (e) {
    console.error('medianSquared failed test case');
}
try {
    // Should Fail
    const medianSquaredTwo = arrayUtils.medianSquared(["guitar", 1, 3, "apple"]);
    console.error('medianSquared did not error');
} catch (e) {
    console.log('medianSquared failed successfully');
}


// maxElement Tests
try {
    // Should Pass
    const maxElementOne = arrayUtils.maxElement([5, 6, 7]);
    console.log('maxElement passed successfully');
} catch (e) {
    console.error('maxElement failed test case');
}
try {
    // Should Fail
    const maxElementTwo = arrayUtils.maxElement(5, 6, 7);
    console.error('maxElement did not error');
} catch (e) {
    console.log('maxElement failed successfully');
}


// fill Tests
try {
    // Should Pass
    const fillOne = arrayUtils.fill(3, 'Welcome');
    console.log('fill passed successfully');
} catch (e) {
    console.error('fill failed test case');
}
try {
    // Should Fail
    const fillTwo = arrayUtils.fill("test");
    console.error('fill did not error');
} catch (e) {
    console.log('fill failed successfully');
}


// countRepeating Tests
try {
    // Should Pass
    const countRepeatingOne = arrayUtils.countRepeating([7, '7', 13, "Hello","Hello", "hello"]);
    console.log('countRepeating passed successfully');
} catch (e) {
    console.error('countRepeating failed test case');
}
try {
    // Should Fail
    const countRepeatingTwo = arrayUtils.countRepeating([7, '7', 13, true, null]);
    console.error('countRepeating did not error');
} catch (e) {
    console.log('countRepeating failed successfully');
}


// isEqual Tests
try {
    // Should Pass
    const isEqualOne = arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]);
    console.log('isEqual passed successfully');
} catch (e) {
    console.error('isEqual failed test case');
}
try {
    // Should Fail
    const isEqualTwo = arrayUtils.isEqual();
    console.error('isEqual did not error');
} catch (e) {
    console.log('isEqual failed successfully');
}


// camelCase Tests
try {
    // Should Pass
    const camelCaseOne = stringUtils.camelCase('my function rocks');
    console.log('camelCase passed successfully');
} catch (e) {
    console.error('camelCase failed test case');
}
try {
    // Should Fail
    const camelCaseTwo =  stringUtils.camelCase(123);
    console.error('camelCase did not error');
} catch (e) {
    console.log('camelCase failed successfully');
}


// replaceChar Tests
try {
    // Should Pass
    const replaceCharOne = stringUtils.replaceChar("Hello, How are you? I hope you are well");
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed test case');
}
try {
    // Should Fail
    const replaceCharTwo =  stringUtils.replaceChar("");
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}


//mashUp Tests
try {
    // Should Pass
    const mashUpOne = stringUtils.replaceChar("Songhan", "Yu");
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed test case');
}
try {
    // Should Fail
    const mashUpTwo =  stringUtils.replaceChar("");
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}


//makeArrays Tests
let one = { x: 2, y: 3};
let two = { a: 70, x: 4, z: 5 };
let three = { x: 0, y: 9, q: 10 };
try {
    // Should Pass
    const makeArraysOne = objUtils.makeArrays([one, two, three]);
    console.log('makeArrays passed successfully');
} catch (e) {
    console.error('makeArrays failed test case');
}
try {
    // Should Fail
    const makeArraysTwo =  objUtils.makeArrays([one, {}, three]);
    console.error('makeArrays did not error');
} catch (e) {
    console.log('makeArrays failed successfully');
}


//isDeepEqual Tests
let first = {a: 2, b: 3};
let second = {a: 2, b: 4};
let third = {a: 2, b: 3};
let forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
let fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}};
try {
    // Should Pass
    const isDeepEqualOne = objUtils.isDeepEqual(forth, fifth);
    console.log('isDeepEqual passed successfully');
} catch (e) {
    console.error('isDeepEqual failed test case');
}
try {
    // Should Fail
    const isDeepEqualTwo =  objUtils.isDeepEqual(first,[]);
    console.error('isDeepEqual did not error');
} catch (e) {
    console.log('isDeepEqual failed successfully');
}


//computeObject Tests
try {
    // Should Pass
    const computeObjectOne = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject passed successfully');
} catch (e) {
    console.error('computeObject failed test case');
}
try {
    // Should Fail
    const computeObjectTwo =  objUtils.computeObject({ a: 3, b: 7, c: 'test' }, n => n * 2);
    console.error('computeObject did not error');
} catch (e) {
    console.log('computeObject failed successfully');
}