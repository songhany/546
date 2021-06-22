const axios = require('axios');


let exportedMethods = {

  getShowBySearchTerm: async (searchTerm) => {
    let searchUrl = "http://api.tvmaze.com/search/shows?q=" + searchTerm;
    const { data } = await axios.get(searchUrl);
    const parsedData = data; // parse the data from JSON into a normal JS Object
    if (!parsedData) throw `We're sorry, but no results were found for ${searchTerm}.`;
    
    return parsedData; // this will be the array of shows objects
  }

};

module.exports = exportedMethods;