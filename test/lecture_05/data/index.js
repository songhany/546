const postData = require('./posts');
const userData = require('./users');

module.exports = {  //glue file
  users: userData,
  posts: postData
};
