const movies = require('./data/movies');
const connection = require('./config/mongoConnection');


async function main() {

    //movie1
    const tomAndJerry = await movies.create(
        "Tom and Jerry",
        "After countless years of conflict, Tom Cat and Jerry Mouse relocate to New York City for a fresh start.",
        "G", 
        "1hr 41min",
        "Comedy",
        ["Rob Delaney","Michael Peña"],
        {director: "Tim Story", yearReleased: 2021}
    );
    console.log(tomAndJerry);


    //movie2
    const theAvengers = await movies.create(
        "The Avengers",
        "The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri.",
        "PG", 
        "2hr 23min",
        "Action",
        ["Robert Downey Jr.","Chris Evans", "Mark Ruffalo", "Scarlett Johansson"],
        {director: "Joss Whedon", yearReleased: 2012}
    );

    //Query all movies, and log them all
    let allMovies = await movies.getAll();
    console.log(allMovies);

    
    //movie3
    const forrestGump = await movies.create(
        "Forrest Gump",
        "In 1981, at a bus stop in Savannah, Georgia, a man named Forrest Gump recounts his life story to strangers who sit next to him on a bench.",
        "PG13", 
        "2hr 22min",
        "Comedy",
        ["Tom Hanks","Robin Wright"],
        {director: "Robert Zemeckis", yearReleased: 1994}
    );
    console.log(forrestGump);


    //Rename the first movie's title
    const renamedTomAndJerry = await movies.rename(tomAndJerry._id.toString(), "Jerry and Tom is very good story");
    console.log(renamedTomAndJerry);

    //remove second movie
    const removeTheAvengers = await movies.remove(theAvengers._id.toString());
    console.log(removeTheAvengers);

    //Query all movies, and log them all
    allMovies = await movies.getAll();  
    console.log(allMovies);

    //Try to create a movie with bad input parameters to make sure it throws errors.
    try {
        const theAvengers = await movies.create(
            "The Avengers",
            "The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri.",
            PG, 
            "2hr 23min",
            "Action",
            ["Robert Downey Jr.","Chris Evans", "Mark Ruffalo", "Scarlett Johansson"],
            {director: "Joss Whedon", yearReleased: 2012}
        );
    } catch(e) {
        console.log(e);
    }

    //Try to remove a movie that does not exist to make sure it throws errors.
    try {
        const removeBillAndTed = await movies.remove("603902add23cb74a70e5e25d");
        console.log(removeBillAndTed);
    } catch(e) {
        console.log(e);
    }

    //Try to rename a movie that does not exist to make sure it throws errors.
    try {
        const renamedBillAndTed = await movies.rename("603902add23cb74a70e5e25d", "Patrick and Ted Face the Music");
        console.log(renamedBillAndTed);
    } catch (e) {
        console.log(e);
    }

    //Try to rename a movie passing in invalid data for the parameter to make sure it throws errors.
    try {
        const renamedBillAndTed = await movies.rename("603902add23cb74a70e5e25d", 12);
        console.log(renamedBillAndTed);
    } catch (e) {
        console.log(e);
    }

    //Try getting a movie by ID that does not exist to make sure it throws errors.
    try {
        const Songhan = await movies.get("603902add23cb74a70e5e25d");
        console.log(Songhan);
    } catch(e) {
        console.log(e);
    }

    // close database connection
    const db = await connection();
    await db.serverConfig.close();
};


main().catch((error) => {
    console.log(error);
});