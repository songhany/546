//We need to require ObjectId from mongo
let { ObjectId } = require('mongodb');


/*For demo purposes, I will create a new object ID and convert it to a string,
Then will pass that valid object ID string value into my function to check if it's a valid Object ID (which it is in this case)
I also pass in an invalid object ID when I call my function to show the error */


let newObjId = ObjectId(); //creates a new object ID


let x = newObjId.toString(); // converts the Object ID to string


console.log(typeof x); //just logging x to see it's now type string


//The below function takes in a string value and then attempts to convert it to an ObjectId


function myDBfunction(id) {
  //check to make sure we have input at all
  if (!id) throw 'Id parameter must be supplied';

  //check to make sure it's a string
  if (typeof id !== 'string') throw "Id must be a string";


  //Now we check if it's a valid ObjectId so we attempt to convert a value to a valid object ID,
  //if it fails, it will throw an error (you do not have to throw the error, it does it automatically and the catch where you call the function will catch the error just as it catches your other errors).
  let parsedId = ObjectId(id);
  //this console.log will not get executed if Object(id) fails, as it will throw an error
  console.log('Parsed it correctly, now I can pass parsedId into my query.');
  return parsedId;
}

//passing a valid string that can convert to an Object ID
try {
  let id = myDBfunction(x);
  console.log(id);
} catch (e) {
  console.log(e.message);
}

//passing an invalid string that can't be converted into an object ID:
try {
  let id = 'test'
  id = myDBfunction(id);  //error
  // console.log(id);
} catch (e) {
  console.log(e.message);
}