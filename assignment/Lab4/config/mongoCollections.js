const dbConnection = require('./mongoConnection');

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {  //collection parameter is collection's name
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();  //create a connection to database with mongoConnection.js
      _col = await db.collection(collection);  //collection name
    }

    return _col;
  };
};

/* Now, you can list your collections here: */ 
module.exports = {  //I can create myself collection here
  movies: getCollectionFn('movies'),  //调用了上面的 getCollectionFn(),传入了 collection name, 返回了 _col 这个 collection name
};
