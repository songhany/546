const dbConnection = require('./mongoConnection');

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {  //collection parameter is collection's name
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();  //create connection to database with mongoConnection.js
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {  //I can create myself collection here
  posts: getCollectionFn('posts'),  //调用了上面的 getCollectionFn()，并传入了 collection name
  users: getCollectionFn('users')
};
