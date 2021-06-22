//下面这两种写法等价
// async function myRide() {
//     return '2017 MB GLE';
// }

// function yourRide() {
//     return Promise.resolve('2017 MB GLE');
// }


//下面这两种写法等价
// async function foo() {
//     throw 25;
// }

// function foo() {
//     return Promise.reject(25);
// }


const weather = false;

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

async function myDate() {
    try {
        const myDate = await date();
        consolo.log(myDate);
    } catch(e) {
        console.log(e);
    }
}

myDate();