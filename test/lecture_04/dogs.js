// a module that has functions that we're going to export that allows us to call those function to do inserting of data, reading, deleting and updating data
const mongoCollections = require('./mongoCollections');
const dogs = mongoCollections.dogs;

module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define methods on an object with this shorthand!
  async getDogById(id) {
    if (!id) throw 'You must provide an id to search for';

    const dogCollection = await dogs();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection
    const doggo = await dogCollection.findOne({ _id: id });  //mongo shell method, Returns one document that satisfies the specified query criteria on the collection or view
    if (doggo === null) throw 'No dog with that id';

    return doggo;
  },


  async getAllDogs() {
    const dogCollection = await dogs();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection

    const dogList = await dogCollection.find({}).toArray();  //because we want find all, we write {} in parentheses. And, we convert it to array, so it is finally an array of object

    return dogList;
  },


  async addDog(name, breeds) {
    if (!name) throw 'You must provide a name for your dog';
    if (!breeds || !Array.isArray(breeds))
      throw 'You must provide an array of breeds';
    if (breeds.length === 0) throw 'You must provide at least one breed.';

    const dogCollection = await dogs();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection
    
    let newDog = {
      name: name,
      breeds: breeds
    };

    const insertInfo = await dogCollection.insertOne(newDog);  //insert newDog into database
    if (insertInfo.insertedCount === 0) throw 'Could not add dog';

    const newId = insertInfo.insertedId;

    const dog = await this.getDogById(newId);
    return dog;
  },


  async removeDog(id) {
    if (!id) throw 'You must provide an id to search for';

    const dogCollection = await dogs();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection
    const deletionInfo = await dogCollection.deleteOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete dog with id of ${id}`;
    }
    return { deleted: true };
  },


  async updateDog(id, name, breeds) {  //replace old dog data
    if (!id) throw 'You must provide an id to search for';
    if (!name) throw 'You must provide a name for your dog';
    if (!breeds || !Array.isArray(breeds))
      throw 'You must provide an array of breeds';
    if (breeds.length === 0) throw 'You must provide at least one breed.';

    const dogCollection = await dogs();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection
    const updatedDog = {
      name: name,
      breeds: breeds
    };

    const updatedInfo = await dogCollection.updateOne(
      { _id: id },
      { $set: updatedDog }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update dog successfully';
    }

    return await this.getDogById(id);
  }
};
