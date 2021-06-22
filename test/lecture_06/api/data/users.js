const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('uuid/v4');

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();  //get Collection by calling getCollectionFn('users')
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw 'No users in system!';
    return userList;
  },

  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getUserById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (!user) throw 'User not found';
    return user;
  },
  

  async addUser(firstName, lastName) {
    const userCollection = await users();

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      _id: uuid(),
      posts: []
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getUserById(newInsertInformation.insertedId);
  },


  async removeUser(id) {
    const userCollection = await users();
    const deletionInfo = await userCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    return true;
  },


  async updateUser(id, updatedUser) {
    const user = await this.getUserById(id);  //log original user info object
    console.log(user);

    let userUpdateInfo = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName
    };

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: id },
      { $set: userUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getUserById(id);  //return updated user info object
  },


  async addPostToUser(userId, postId, postTitle) {
    let currentUser = await this.getUserById(userId);  //current user
    console.log(currentUser);

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $addToSet: { posts: { id: postId, title: postTitle } } }  // $addToSet operator adds a value to an array, if the value is already present in array, in which case $addToSet does nothing to that array. https://docs.mongodb.com/manual/reference/operator/update/addToSet/
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getUserById(userId);
  },

  
  async removePostFromUser(userId, postId) {
    let currentUser = await this.getUserById(userId);
    console.log(currentUser);

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $pull: { posts: { id: postId } } }  // $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getUserById(userId);
  }
};

module.exports = exportedMethods;
