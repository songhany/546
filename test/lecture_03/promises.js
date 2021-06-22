//方式1
// const weather = true;

// const date = new Promise((resolve, reject) => {
//     if (weather) {
//         const dateDetails = {
//             name: 'Cubana Restaurant',
//             location: '55th Street',
//             table: 5
//         };

//         resolve (dateDetails);
//     } 
//     else {
//         reject ('Bad weather so no date!');
//     }
// });

// date.then((details) => {
//     console.log(details);
// })
//   .catch((error) => {
//     console.log(error);
// });

//方式2
const weather = true;

function date() {
    if (weather) {
        const dateDetails = {
            name: 'Cubana Restaurant',
            location: '55th Street',
            table: 5
        };

        return Promise.resolve (dateDetails);
    } 
    else {
        return Promise.reject ('Bad weather so no date!');
    }
};

// date().then((details) => {
//     console.log(details);
// })
//   .catch((error) => {
//     console.log(error);
// });


/* Chain promises：使用方式2的 date()函数 */
// const myDate1 = function() {
//     date().then((details) => {
//         console.log(`We are going on a date!`);
//         console.log(details);
//     }).catch((error) => {
//         console.log(error);
//     });
// };

const orderUber = (dateDetails) => {
    const message = `Get me an uber ASAP to ${dateDetails.location}, we are going on a date`
    return Promise.resolve(message);
}

const myDate2 = () => {
    date().then(orderUber).then((message) => {
        console.log(message);
    }).catch((error) => {
        console.log(error);
    });
};

myDate2();
console.log("AFTER mydate2 has been called");