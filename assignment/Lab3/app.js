const people = require('./people.js');
const work = require('./work.js');

async function main() {
    
    try {
        console.log(await people.getPersonById(43)); 
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.getPersonById(-1));  //Throw Error
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.getPersonById(1001));  //Throw Error
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.getPersonById());  //Throw Error
    } catch(e) {
        console.log(e);
    }


    try {
        console.log(await people.howManyPerState("NY"));  // Returns: 64
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.howManyPerState("CO"));  // Returns: 27
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.howManyPerState(-1));  // Throw error
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.howManyPerState("WY"));  // Throws Error since there are no people in WY
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.howManyPerState());  // Throws Error
    } catch(e) {
        console.log(e);
    }

    
    try {
        console.log(await people.personByAge(0));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.personByAge(43));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.personByAge(500));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.personByAge(999));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.personByAge(-1));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.personByAge(1000));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await people.personByAge());
    } catch(e) {
        console.log(e);
    }


    try {
        console.log(await people.peopleMetrics());
    } catch(e) {
        console.log(e);
    }


    try {
        console.log(JSON.stringify(await work.listEmployees(), null, 2));
    } catch(e) {
        console.log(e);
    }
    

    try {
        console.log(await work.fourOneOne('240-144-7553'));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.fourOneOne(43));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.fourOneOne('212-208-8374'));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.fourOneOne('5045890047'));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.fourOneOne());
    } catch(e) {
        console.log(e);
    }

    
    try {
        console.log(await work.whereDoTheyWork('299-63-8866'));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.whereDoTheyWork('277-85-0056'));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.whereDoTheyWork());
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.whereDoTheyWork("123456789"));
    } catch(e) {
        console.log(e);
    }

    try {
        console.log(await work.whereDoTheyWork("264-67-0084"));
    } catch(e) {
        console.log(e);
    }
}


main();