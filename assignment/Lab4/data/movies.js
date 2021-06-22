const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let ObjectID = require('mongodb').ObjectID;  //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
let { ObjectId } = require('mongodb');


module.exports = {

    async getMovieById(id) {  //id parameter at here is ObjectId parameter
        if (!id) throw 'You must provide an id to search for';
            
        const movieCollection = await movies();
        const movie = await movieCollection.findOne({ _id: id });
        if (movie === null) throw 'No movie with that id';
    
        movie._id = movie._id.toString();  //convert ObjectId to String
        return movie;
    },


    async create(title, plot, rating, runtime, genre, cast, info) {
        if (title == " " || plot == " " || rating == " " || runtime == " " || genre == " ") throw "Strings with empty spaces are NOT valid strings";
        if (!title || !plot || !rating || !runtime || !genre || !cast || !info) throw "All fields need to have valid values";
        if (typeof title !== 'string' || typeof plot !== 'string' || typeof rating !== 'string' || typeof runtime !== 'string' || typeof genre !== 'string') throw "The title, plot, rating, runtime, genre parameter must be string type";
        if (title.length === 0 ||  plot.length === 0 || rating.length === 0 || runtime.length === 0 || genre.length ===0) throw "The title, plot, rating, runtime, genre parameter cannot be empty strings";
        if (!Array.isArray(cast) || cast.length===0 || cast.every(e => (typeof e !== "string"))) throw "The cast is not an array, or cast must have at least one element that is a valid string";
        
        if (info.constructor !== Object) throw "info parameter must be an object";
        if (typeof info.director !== 'string' || !info.director || info.director.length === 0) throw "info.director is not a valid string type, or is not provided, or is an empty string";
        if (!info.yearReleased || typeof info.yearReleased !== 'number' || info.yearReleased.toString().length !== 4) throw "info.yearReleased is not a 4 digit number or is not provided";
        for (let i in info) {
            if (i == 'yearReleased') {
                if (info[i] < 1930)
                    throw "info.yearReleased is not in a valid range";
                if (info[i] > new Date().getFullYear() + 5)
                    throw "info.yearReleased is not in a valid range";
            }
        }


        const movieCollection = await movies();  //get a reference to the collection, before we can do anything to it

        let newMovie = {
            title: title,
            plot: plot,
            rating: rating,
            runtime: runtime,
            genre: genre,
            cast: cast,
            info: info
        };

        const insertInfo = await movieCollection.insertOne(newMovie);  //insert Movie into database
        if (insertInfo.insertedCount === 0) throw 'Could not add Movie into database';

        //after successfully inserting movie, mongo will automatically generate an _id for it, then we can get the Id
        const newId = insertInfo.insertedId;  //newId is ObjectId

        const movie = await this.getMovieById(newId);
        return movie;
    },


    async getAll() {
        const movieCollection = await movies();  //call getCollectionFn('dogs') in mongoCollections.js

        const movieList = await movieCollection.find({}).toArray();  //because we want find all, we write {} in parentheses. And we convert it to array, so it is finally an array of object

        //convert ObjectId to String for every array element
        for (let e of movieList) {
            e._id = e._id.toString();
        }

        return movieList;  //an array of object
    },


    async get(id) {
        if (!id) throw 'You must provide an id to get';
        if (typeof id !== 'string' || id.length === 0) throw "the id must be string type and not an empty string";
        if (!ObjectID.isValid(id)) throw "the id provided is not a valid ObjectId";  //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid

        let parsedId = ObjectId(id);

        const movieCollection = await movies();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection
        const movie = await movieCollection.findOne({ _id: parsedId });  //mongo shell method, Returns one document that satisfies the specified query criteria on the collection
        if (movie === null) throw 'No movie with that id';
    
        movie._id = movie._id.toString();  //convert ObjectId to String
        return movie;
    },


    async remove(id) {
        if (!id) throw 'You must provide an id for removing';
        if (typeof id !== 'string' || id.length === 0) throw "the id must be string type and not an empty string";
        if (!ObjectID.isValid(id)) throw "the id provided is not a valid ObjectId";

        let parsedId = ObjectId(id);

        const movieCollection = await movies();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection
        const movie = await this.getMovieById(parsedId);  //get movie name that is deleted. You must store movie object bofore using deleteOne({ _id: parsedId }) 
        
        const deletionInfo = await movieCollection.deleteOne({ _id: parsedId });
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete movie with id of ${id}`;
        }

        return `${movie.title} has been successfully deleted`;
    },


    async rename(id, newTitle) {
        if (!id) throw 'You must provide an id for removing';
        if (typeof id !== 'string' || id.length === 0) throw "the id must be string type and not an empty string";
        if (!ObjectID.isValid(id)) throw "the id provided is not a valid ObjectId";
        if (!newTitle) throw 'You must provide an newTitle';
        if (typeof newTitle !== 'string' || newTitle.length === 0) throw "the id must be string type and not an empty string";
        
        const movieCollection = await movies();  //call getCollectionFn('dogs') in mongoCollections.js, and then we wait the Collection
        const updatedMovie = {
            title: newTitle,
        };

        let parsedId = ObjectId(id);

        const updatedInfo = await movieCollection.updateOne(
            { _id: parsedId },
            { $set: updatedMovie }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update movie successfully';
        }

        return await this.get(id);
    }
};

