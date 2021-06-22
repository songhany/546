const movies = require('./data/movies');
const connection = require('./config/mongoConnection');

async function main() {

    const billAndTed = await movies.create(
        "Bill and Ted Face the Music",
        "Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.",
        "PG-13", 
        "1hr 31min",
        "Comedy",
        ["Keanu Reeves","Alex Winter"],
        {director: "Dean Parisot", yearReleased: 2020}
    );
    console.log(billAndTed);


    const allMovies = await movies.getAll();
    console.log(allMovies);


    const Songhan = await movies.get(billAndTed._id);
    console.log(Songhan);


    const renamedBillAndTed = await movies.rename(billAndTed._id, "Patrick and Ted Face the Music");
    console.log(renamedBillAndTed);

    
    const removeBillAndTed = await movies.remove(billAndTed._id);
    console.log(removeBillAndTed);

    // close database connection
    const db = await connection();
    await db.serverConfig.close();
    console.log('Done!');
};


main().catch((error) => {
    console.log(error);
});