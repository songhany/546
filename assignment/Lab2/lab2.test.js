const arrayUtils = require("./arrayUtils");
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');


// arrayUtils.js test case
console.log('mean(array) test:');
console.log(arrayUtils.mean([1, 2, 3])); // Returns: 2
console.log(arrayUtils.mean([1, 3, 5, 7, 9])); // Returns: 5


console.log('\nmedianSquared(array) test:')
console.log(arrayUtils.medianSquared([1, 2, 4]));  //Returns: 4
console.log(arrayUtils.medianSquared([1, 2, 4, 6, 8])); //Returns: 16
console.log(arrayUtils.medianSquared([1, 2, 4, 6])); //Returns: 9
console.log(arrayUtils.medianSquared([1, 2, 4, 6, 8, 10])); //Returns: 25


console.log('\nmaxElement(array) test:')
console.log(arrayUtils.maxElement([5, 6, 7]));  //Returns: {'7': 2}
console.log(arrayUtils.maxElement([5, 5, 5]));  //Returns: {'5': 0}


console.log('\nfill(end, value) test:')
console.log(arrayUtils.fill(6));  //Returns: [0, 1, 2, 3, 4, 5]
console.log(arrayUtils.fill(3, 'Welcome'));  //Returns: ['Welcome', 'Welcome', 'Welcome']
console.log(arrayUtils.fill(3, 666));  //Returns: [ 666, 666, 666 ]
console.log(arrayUtils.fill(3, true));  //Returns: [ true, true, true ]
console.log(arrayUtils.fill(3, []));  //Returns: [ [], [], [] ]
console.log(arrayUtils.fill(3, {}));  //Returns: [ {}, {}, {} ]


console.log('\ncountRepeating(array) test:')
console.log(arrayUtils.countRepeating([7, '7', 13, "Hello","Hello", "hello"]));  //Returns {'7': 2, Hello: 2} 
console.log(arrayUtils.countRepeating([]));  //Returns {}
console.log(arrayUtils.countRepeating([1,2,3]));  //Returns {}


console.log('\nisEqual(arrayOne, arrayTwo) test:')
console.log(arrayUtils.isEqual([1, 2, 3], [3, 1, 2]));  //Returns: true
console.log(arrayUtils.isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z']));  //Returns: true
console.log(arrayUtils.isEqual([1, 2, 3], [4, 5, 6]));  //Returns: false
console.log(arrayUtils.isEqual([1, 3, 2], [1, 2, 3, 4]));  //Returns: false
console.log(arrayUtils.isEqual([1, 2], [1, 2, 3])); // Returns: false
console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]));  //Returns: true
console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]]));  // Returns: false
console.log(arrayUtils.isEqual([null, null, null], [null, null, null]));  //Returns: true
console.log(arrayUtils.isEqual([0, [1, 2], ["3", "4"]], [[2, 1], ["4", "3"], 0]));  //Returns: true

// stringUtils.js test case
console.log('\ncamelCase(string) test:')
console.log(stringUtils.camelCase('my function rocks'));  //Returns: "myFunctionRocks"
console.log(stringUtils.camelCase('FOO BAR'));  //Returns: "fooBar"
console.log(stringUtils.camelCase("How now brown cow"));  //Returns: "howNowBrownCow"


console.log('\nreplaceChar(string) test:')
console.log(stringUtils.replaceChar("Daddy"));  //Returns: "Da*$y"
console.log(stringUtils.replaceChar("Mommy"));  // Returns: "Mo*$y" 
console.log(stringUtils.replaceChar("Hello, How are you? I hope you are well"));  //Returns: "Hello, *ow are you? I $ope you are well"
console.log(stringUtils.replaceChar("babbbbble"));  // Returns: "ba*$*$*le"


console.log('\nmashUp(string1, string2) test:')
console.log(stringUtils.mashUp("Patrick", "Hill"));  //Returns "Hitrick Pall"
console.log(stringUtils.mashUp("hello", "world"));  //Returns "wollo herld"
console.log(stringUtils.mashUp("Songhan", "Yu"));  //Returns "Yunghan So"


// objUtils.js test case
console.log('\nmakeArrays([objects]) test:')
let one = { x: 2, y: 3};
let two = { a: 70, x: 4, z: 5 };
let three = { x: 0, y: 9, q: 10 };
console.log(objUtils.makeArrays([one, two, three]));  // [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
console.log(objUtils.makeArrays([two, three]));  // [ ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
console.log(objUtils.makeArrays([three, one, two]));  // [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]


console.log('\nisDeepEqual(obj1, obj2) test:')
let first = {a: 2, b: 3};
let second = {a: 2, b: 4};
let third = {a: 2, b: 3};
let forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
let fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}};
console.log(objUtils.isDeepEqual(first, second)); // false
console.log(objUtils.isDeepEqual(forth, fifth)); // true
console.log(objUtils.isDeepEqual(forth, third)); // false
console.log(objUtils.isDeepEqual({}, {})); // true


console.log('\ncomputeObject(object, func) test:')
console.log(objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
/* Returns:
{
  a: 6,
  b: 14,
  c: 10
}
*/