const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the array of people objects
}


async function getPersonById(id) {
    if (id === undefined) throw "The id parameter does not exit";
    if (typeof id != 'number') throw "id parameter must be number type";

    let pData = await getPeople();  //store array of people object

    if (id <= 0 || id > pData.length) throw "The id values is not exits, the id must be within bounds in respect to id values";

    for (let obj of pData) {
        if (obj['id'] === id) {
            return obj;
        }
    }
}


async function howManyPerState(stateAbbrv) {
    if (stateAbbrv === undefined) throw "The stateAbbrv parameter does not exit";
    if (typeof stateAbbrv != 'string') throw "The stateAbbrv parameter must be string type";

    let pData = await getPeople();  //store array of people object 

    let count = 0;
    for (let obj of pData) {
        if (obj['address']['state'] == stateAbbrv) {
            count += 1;
        }
    }

    if (count === 0)
        throw `There are no people in ${stateAbbrv}`;
    else
        return count;
}


async function personByAge(index) {
    if (index === undefined) throw "The index parameter does not exit";
    if (typeof index != 'number') throw "The index parameter must be number type";
    if (index < 0 || index > 999) throw "The index is out of bound";

    let pData = await getPeople();  //store array of people object

    //Descending order: sort all the people by their date_of_birth from oldest to youngest
    function compareDateOfBirth(a, b) {
        let birth1 = new Date(a.date_of_birth);
        let birth2 = new Date(b.date_of_birth);
        if (birth1 < birth2)
            return -1;
        if (birth1 > birth2)
            return 1;
        return 0;
    }
    pData.sort(compareDateOfBirth);

    //computer age
    let Age = 0;
    const date1 = new Date();

    for (let obj of pData) {
        let dateBirth = obj['date_of_birth'];
        let date2 = new Date(dateBirth);

        //because we need to compute their age (in full years), so we compare month firstly and then day
        if (date2.getMonth() < date1.getMonth()) {
            Age = date1.getFullYear() - date2.getFullYear();  //enough a full year
        }
        else if (date2.getMonth() == date1.getMonth()) {
            if (date2.getDate() < date1.getDate())
                Age = date1.getFullYear() - date2.getFullYear();  //enough a full year
            else
                Age = date1.getFullYear() - date2.getFullYear() - 1;  //not enough a full year
        }
        else
            Age = date1.getFullYear() - date2.getFullYear() - 1;  //not enough a full year

        //after getting age of people, add age property to people obj
        obj.age = Age;
    }

    //make a new return object
    let retObj = {};
    retObj.first_name = pData[index]['first_name'];
    retObj.last_name = pData[index]['last_name'];
    retObj.date_of_birth = pData[index]['date_of_birth'];
    retObj.age = pData[index]['age'];

    return retObj;
}


async function peopleMetrics() {
    let pData = await getPeople();  //store array of people object

    const letter = "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz";
    const consonants = "BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz";
    const vowels = "AEIOUaeiou";

    let metricsObj = {
        totalLetters: 0,
        totalVowels: 0,
        totalConsonants: 0,
        longestName: '',
        shortestName: '',
        mostRepeatingCity: '',
        averageAge: 0
    };

    metricsObj.shortestName = pData[0]['first_name'] + ' ' + pData[0]['last_name'];  //set shortestName a default value

    //age
    let Age = 0;
    const date1 = new Date();
    let sumAge = 0;

    //handle every people object
    for (let obj of pData) {
        let firstN = obj['first_name'];
        let lastN = obj['last_name'];
        let fullN = firstN + ' ' + lastN;
        let count = 0;

        for (let c of fullN)
        {   
            count += 1;
            if (consonants.includes(c)) {
                metricsObj.totalConsonants += 1;
                metricsObj.totalLetters += 1;
            }
            else if (vowels.includes(c)) {
                metricsObj.totalVowels += 1;
                metricsObj.totalLetters += 1;
            }
        }

        //find longest name and shortest name
        if (count > metricsObj.longestName.length)
            metricsObj.longestName = fullN;
        else if (count < metricsObj.shortestName.length)
            metricsObj.shortestName = fullN;


        //computer age
        let dateBirth = obj['date_of_birth'];
        let date2 = new Date(dateBirth);

        //because we need to compute their age (in full years), so we compare month firstly and then day
        if (date2.getMonth() < date1.getMonth()) {
            Age = date1.getFullYear() - date2.getFullYear();  //enough a full year
        }
        else if (date2.getMonth() == date1.getMonth()) {
            if (date2.getDate() < date1.getDate())
                Age = date1.getFullYear() - date2.getFullYear();  //enough a full year
            else
                Age = date1.getFullYear() - date2.getFullYear() - 1;  //not enough a full year
        }
        else
            Age = date1.getFullYear() - date2.getFullYear() - 1;  //not enough a full year

        //after getting age of people, add age property to people obj
        obj.age = Age;
        //sum age of every people
        sumAge += obj.age;  //ps: if age is not added by personByAge(index)，I should add 'age' into every object firstly
    }

    //averageAge
    let avg = sumAge / pData.length;
    metricsObj.averageAge = avg;

    //mostRepeatingCity
    let most = 0;
    let temObj = {};
    for (let i=0; i<pData.length; i++) {
        let c = pData[i].address.city;  //temporary variable
        if (!temObj[c])
            temObj[c] = 1;
        else {
            temObj[c] += 1;
        }
    }
    for (let city_name in temObj) {  //find most repeating city
        if (temObj[city_name] > most) {
            metricsObj.mostRepeatingCity = city_name;
            most = temObj[city_name];
        }
    }

    return metricsObj;
}


module.exports = {
    getPeople,
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics,
}