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
      let areObjects = (value1 != null && typeof value1 ==='object') && (value2 != null && typeof value2 ==='object')
      if (areObjects && !isDeepEqual(value1, value2) // objects' value is an object, using recursion call itself to judge equality by value
      || !areObjects && value1 !== value2) //objects' value is not an object, compare value directly
      {
          return false;
      }
  }

  return true;
}
  const foo = n => n * 2;
  
  const first = {a: 2, b: 3};
  const second = {a: 2, b: 4};
  const third = {a: 2, b: 3};
  const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
  const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}};
  const sixth = {};
  
  console.log(isDeepEqual(forth, fifth)); // => true
  console.log(isDeepEqual(fifth, sixth)); // => false
  console.log(Object.values(third));
  console.log(typeof foo == 'function');
  console.log(Object.entries(third));