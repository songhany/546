const axios = require('axios');


let exportedMethods = {

    getShow: async () => {
        const { data } = await axios.get('http://api.tvmaze.com/shows');
        const parsedData = data; // parse the data from JSON into a normal JS Object
        return parsedData; // this will be the array of shows objects
    },

    getAllShow: async () => {
        let sData = await this.getShow();
        return sData;
    },

    getShowById: async (id) => {
        let searchUrl = "http://api.tvmaze.com/shows/" + id;
        const { data } = await axios.get(searchUrl);
        const parsedData = data; // parse the data from JSON into a normal JS Object
        if (!parsedData) throw "There is no show found for the given ID, please type in existing ID.";
        
        return parsedData; // this will be the array of shows objects
    }
};

module.exports = exportedMethods;