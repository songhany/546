const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the array of people objects
}

async function getWork() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the array of people objects
}


async function listEmployees() {
    let pData = await getPeople();  //store array of people object 
    let wData = await getWork();  //store array of work object

    let retArr = [];  //finally returned array

    //get company name and id of employees from array
    for (let obj of wData) {
        let companyName = obj['company_name'];
        let employeesArr = obj['employees'];  //[27, 655, 606, 566]

        let eNameArr = [];  //store [{ first_name: 'Songhan', last_name: 'Yu' }]

        for (let id of employeesArr) {
            for (let p of pData) {
                if (p['id'] == id) {
                    let firstName = p['first_name'];
                    let lastName = p['last_name'];

                    let eObj = {};
                    eObj['first_name'] =  firstName;
                    eObj['last_name'] = lastName;
        
                    eNameArr.push(eObj);
                    break;
                }
            }
        }

        let obj_retArr = {
            company_name: companyName,
            employees: eNameArr
        };

        retArr.push(obj_retArr);
    }

    return retArr;
}


async function fourOneOne(phoneNumber) {
    if (phoneNumber === undefined) throw "phoneNumber parameter does not exit";
    if (typeof phoneNumber != 'string') throw "phoneNumber parameter must be string type";

    //make sure the phoneNumber parameter is in the same format as the data: "###-###-####"
    const regex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/g;
    const found = phoneNumber.match(regex);
    if (found === null)
        throw 'phoneNumber is not in proper ###-###-#### format';
    else {
        //User have already entered proper phoneNumber format
        let wData = await getWork();  //store array of work object
        let found2 = false;

        //check whether company can be found for the supplied phone number
        for (let obj of wData) {
            if (obj["company_phone"] == phoneNumber) {
                found2 = true;
                break;
            }
        }

        if (!found2) throw "nothing exists for that phone number"
        else {
            for (let obj of wData) {
                if (obj["company_phone"] == phoneNumber) {
                    let companyName = obj['company_name'];
                    let companyAddr = obj['company_address'];

                    let retObj = {};
                    retObj.company_name = companyName;
                    retObj.company_address = companyAddr;

                    return retObj;
                }
            }
        }

    }
}


async function whereDoTheyWork(ssn) {
    if (ssn === undefined) throw "ssn parameter does not exit";
    if (typeof ssn != 'string') throw "ssn parameter must be string type";

    //make sure ssn format is "###-##-####"
    const regex = /[0-9]{3}-[0-9]{2}-[0-9]{4}/g;
    const found = ssn.match(regex);
    if (found === null)
        throw 'ssn is not in proper ###-##-#### format';
    else {
        let pData = await getPeople();  //store array of people object
        let wData = await getWork();  //store array of work object
        let found2 = false;
        let id = undefined;
        let fullName = '';
        let retString = '';  //finally return String


        for (let p of pData) {
            if (p['ssn'] == ssn) {
                found2 = true;
                id = p['id'];
                fullName = p['first_name'] + ' ' + p['last_name'];
                break;
            }
        }

        if (!found2) throw "no one exists with that SSN"
        else {
            //there is people with ssn that we found
            let companyName = '';
            for (let obj of wData) {
                //find id in array of employees
                let temArr = obj['employees'];  //eg. temArr = [471, 906, 764, 596]
                for (let i of temArr) {
                    if (id === i) {
                        companyName = obj['company_name'];
                        break;
                    }
                }
            }
            retString = `${fullName} works at ${companyName}` 
            return retString
        }
    }
}

module.exports = {
    getPeople,
    getWork,
    listEmployees,
    fourOneOne,
    whereDoTheyWork,
}