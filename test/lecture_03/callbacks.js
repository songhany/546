// console.log('Plant Corn');
// console.log('Water Plant');
// console.log('Add fertilizer');

// console.log('Plant Peas');

// setTimeout(() => {
//     console.log("Water Plant")
// }, 3000)

// console.log('Add fertilizer');


// setInterval(() => {
//     console.log('Hello');
// }, 1000);


// const list = ["Man", "Woman", "Child"]

// const newList = list.map((value) => {
//     return value + 'kind';
// });

// console.log(newList);

// newList.forEach((element) => {
//     console.log(element);
// });


// function greeting(name) {
//     console.log (`Hello ${name}, welcome to CS-546!`);
// }

// function introduction(firstName, lastName, callback) {
//     const fullName = `${firstName} ${lastName}`;
//     callback(fullName);
// }

// introduction('Songhan', 'Yu', greeting);


function study(subject, callback) {
    console.log(`I am about to study ${subject}`);
    callback(subject);
}

function afterStudy(subject) {
    console.log(`I'm done studying ${subject}. Now it's time to party!`)
}

study('Web Programming', afterStudy);  //callback方式1

study('MongoDB', (subject) => {  //callback方式1
    console.log(`I've studied too much ${subject} and I am tried`);
});