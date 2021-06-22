const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();  //Removes the current database, deleting the associated data files.

    //test case
    //book1: sample
    const sampleBook = await books.createBook(
        "The first book title",
        {authorFirstName: "Songhan", authorLastName: "Yu"},
        ["Comdedy", "Documentary"], 
        "1/1/2000",
        "This is very nice book, I still do not finish it."
    );
    // console.log(sampleBook);  //sampleBook._id here is stringId
    await reviews.createReview(sampleBook._id, "title of review", "name of reviewer", 4, "1/1/1930", "review will go here")  //bookId, title, reviewer, rating, dateOfReview, review
    await reviews.createReview(sampleBook._id, "title1", "reviewer1", 1, "1/1/1910", "review1");  
    await reviews.createReview(sampleBook._id, "title2", "reviewer2", 1, "1/1/1910", "review2");

    //book2
    const billAndTed = await books.createBook(
        "Bill And Ted",
        {authorFirstName: "Keanu", authorLastName: "Reeves"},
        ["Novel", "Horror fiction", "Comedy"], 
        "1/1/2001",
        "Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny."
    );
    // console.log(billAndTed);
    await reviews.createReview(billAndTed._id, "This book scared me to death!!", "scaredycat", 5, "10/7/2020", "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best works!");
    await reviews.createReview(billAndTed._id, "title2", "reviewer2", 3, "1/1/1920", "review2");


    //book3
    const tomAndJerry = await books.createBook(
        "Tom and Jerry",
        {authorFirstName: "Rob", authorLastName: "Delaney"},
        ["Comedy", "Animation"], 
        "1/1/2002",
        "After countless years of conflict, Tom Cat and Jerry Mouse relocate to New York City for a fresh start."
    );
    // console.log(tomAndJerry);
    await reviews.createReview(tomAndJerry._id, "title2", "reviewer2", 3, "1/1/1930", "review2");


    //book4
    const theAvengers = await books.createBook(
        "The Avengers",
        {authorFirstName: "Robert", authorLastName: "Downey Jr."},
        ["Action", "Adventure"], 
        "1/1/2003",
        "The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri."
    );
    // console.log(theAvengers);
    await reviews.createReview(theAvengers._id, "title1", "reviewer1", 1, "1/1/1940", "review1");


    //book5
    const forrestGump = await books.createBook(
        "Forrest Gump",
        {authorFirstName: "Tom", authorLastName: "Hanks"},
        ["Inspiration", "Comedy"], 
        "1/1/2004",
        "In 1981, at a bus stop in Savannah, Georgia, a man named Forrest Gump recounts his life story to strangers who sit next to him on a bench."
    );
    // console.log(forrestGump);
    await reviews.createReview(forrestGump._id, "title1", "reviewer1", 1, "1/1/1950", "review1");


    //book6
    const theLastSamurai = await books.createBook(
        'The Last Samurai',
        {authorFirstName: "Edward", authorLastName: "Zwick"},
        ["Horror"], 
        "2/1/2005",
        "The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri."
    );
    // console.log(theLastSamurai);
    await reviews.createReview(theLastSamurai._id, "title1", "reviewer1", 1, "1/1/1960", "review1");


    //book7
    const inception = await books.createBook(
        'Inception',
        {authorFirstName: "Christopher", authorLastName: "Nolan"},
        ["Action"], 
        "2/1/2006",
        "In 1981, at a bus stop in Savannah, Georgia, a man named Forrest Gump recounts his life story to strangers who sit next to him on a bench."
    );
    // console.log(inception);
    await reviews.createReview(inception._id, "title1", "reviewer1", 3, "1/1/1970", "review1");


    //book8
    const darkKnightRises = await books.createBook(
        "Dark Knight Rises",
        {authorFirstName: "Christopher", authorLastName: "Nolan"},
        ["Inspiration", "Comedy"], 
        "2/1/2007",
        "The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri."
    );
    // console.log(darkKnightRises);
    await reviews.createReview(darkKnightRises._id, "title1", "reviewer1", 3, "1/1/1980", "review1");


    //book9
    const kingsman = await books.createBook(
        "Kingsman: The Secret Service",
        {authorFirstName: "Matthew", authorLastName: "Vaughn"},
        ["Comedy"], 
        "2/1/2008",
        "In 1981, at a bus stop in Savannah, Georgia, a man named Forrest Gump recounts his life story to strangers who sit next to him on a bench."
    );
    // console.log(kingsman);
    await reviews.createReview(kingsman._id, "title1", "reviewer1", 5, "1/1/1990", "review1");


    //book10
    const flatliners = await books.createBook(
        "Flatliners",
        {authorFirstName: "Joel", authorLastName: "Schumacher"},
        ["Fiction"], 
        "2/1/2009",
        "The Asgardian Loki encounters the Other, the leader of an extraterrestrial race known as the Chitauri."
    );
    // console.log(flatliners);
    await reviews.createReview(flatliners._id, "title1", "reviewer1", 5, "1/1/2000", "review1");

    
    // close database connection
    await db.serverConfig.close();
    console.log('Done seeding database');
}

main().catch((error) => {
    console.log(error);
});