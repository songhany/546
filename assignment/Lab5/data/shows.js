const axios = require('axios');


let exportedMethods = {

    async getShow() {
        const { data } = await axios.get('http://api.tvmaze.com/shows');
        const parsedData = data; // parse the data from JSON into a normal JS Object
        return parsedData; // this will be the array of shows objects
    },

    async getAllShow() {
        let sData = await this.getShow();
        return sData;
    },

    async getShowById(id) {
        let sData = await this.getShow();  //store array of show object
        if (id === undefined) throw "The id parameter does not exit";
        if (isNaN(id)) throw "id must be numeric, it cannot be any other data type besides a positive whole number";  //check if string is integer

        id = parseInt(id);
        if (id < 1 || id > sData.length) throw "There is no show with that ID and id should be a positive whole number";

        for (let obj of sData) {
            if (obj['id'] == id) {
                return obj;
            }
        }
    },
};

module.exports = exportedMethods;