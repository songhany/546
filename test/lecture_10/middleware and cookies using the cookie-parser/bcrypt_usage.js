const bcrypt = require('bcrypt');  // other version by using 'bcryptjs'
const saltRounds = 16;  //the higher number, the longer time wil be 

async function main() {
  const plainTextPassword = 'mySuperAwesomePassword';
  const hash = await bcrypt.hash(plainTextPassword, saltRounds);  //generate a hash with painTxt, store it in your database
  console.log(hash);

  let compareToMerlin = false;

  try {
    compareToMerlin = await bcrypt.compare('elementarymydearwatson', hash);
  } catch (e) {
    //no op
  }

  if (compareToMerlin) {
    console.log("The passwords match.. this shouldn't be");
  } else {
    console.log('The passwords do not match');
  }

  let compareToMatch = false;

  try {
    compareToMatch = await bcrypt.compare('mySuperAwesomePassword', hash);
  } catch (e) {
    //no op
  }

  if (compareToMatch) {
    console.log('The passwords match.. this is good');
  } else {
    console.log(
      'The passwords do not match, this is not good, they should match'
    );
  }
}

main();
