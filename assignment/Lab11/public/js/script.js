$(() => {

  // 1. Page load:
  let requestConfig = {
    method: 'GET',
    url: 'http://api.tvmaze.com/shows'
  };

  $.ajax(requestConfig).then((resMessage) => {
    let li;
    for (let show of resMessage) {
      li = `<li><a class="singleShow" href="${show._links.self.href}">${show.name}</a></li>`;
      $('#showList').append(li);
    }
    $('#showList').show()
  });


  // 2. Search Form Submission: 
  $(document).on('submit', '#searchForm', function(event) {
    try {
      event.preventDefault();
      $('#error').empty();
      $('#error').hide();  // hide containers by default
      $('#show').empty();
      $('#show').hide();
      $('#showList').empty();
      $('#homeLink').show();
  
      let searchTerm = $('#search_term').val();  // user input search term
      if(!searchTerm.trim()) throw 'You must enter search term and it also cannot be space.';
  
      requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm,
      };
  
      $.ajax(requestConfig).then((resMessage) => {
        let li;
        for (let s of resMessage) {
          li = `<li><a class="singleShow" href="${s.show._links.self.href}">${s.show.name}</a></li>`;
          $('#showList').append(li);
        }
        $('#showList').show();
      });
    } catch (e) {
      const message = typeof e === 'string' ? e : e.message;
      let p = `<p class="error">${message}</p>`;
      $('#error').append(p);
      $('#error').show();
    }
  });
      
  
  // Link Clicked:  For the link, you will need to call a function on the click event of the link
  $(document).on('click', '.singleShow', function(event) {
    event.preventDefault();  // prevent default link behavior
    $('#showList').hide();  // When the link to a show is clicked, it will hide the showList element
    $('#showList').empty();  // it will then empty the show  element (just in case there was show data previously loaded into the show element

    let singleLinkUrl = $(this).attr('href');  // every single link url

    $.ajax({
      url: singleLinkUrl,
      method: 'GET'
    }).then((resMessage) => {  // resMessage here is JSON of single show
      
      // check each field needed for the show element.
      // <h1>
      if (resMessage.name) {
        let h1 = `<h1>${resMessage.name}</h1>`;
        $('#show').append(h1);
      }
      else {
        let h1 = `<h1>N/A</h1>`;
        $('#show').append(h1);
      }
      
      // <img>
      if (resMessage.image) {
        let img = `<img src='${resMessage.image.medium}'>`;
        $('#show').append(img);
      } 
      else {
        let img = `<img src='../public/img/no_image.jpeg'>`;
        $('#show').append(img);
      }

      // <dl>
      let genre = '<dt>Genres</dt><dd><ul>';
      if (resMessage.genres.length != 0) {  // ❤ check whether array is empty
        for (let g of resMessage.genres)
          genre += `<li>${g}</li>`;
        genre += `</ul></dd>`;
      }
      else {
        genre = `<dt>Genres</dt><dd>N/A</dd>`;
      }
      
      // <dl>
      let language;
      if (resMessage.language) 
        language = `<dt>Language</dt><dd>${resMessage.language}</dd>`;
      else
        language = `<dt>Language</dt><dd>N/A</dd>`;

      let average;
      if (resMessage.rating.average) 
        average = `<dt>Average Rating</dt><dd>${resMessage.rating.average}</dd>`;
      else
        average = '<dt>Average Rating</dt><dt>N/A<dt>';

      let networkName;
      if (resMessage.network)
        networkName = `<dt>Network</dt><dd>${resMessage.network.name}</dd>`;
      else
        networkName = '<dt>Network</dt><dt>N/A<dt>';
      
      let summary;
      if (resMessage.summary)
        summary = `<dt>Summary</dt><dd>${resMessage.summary}</dd>`;
      else
        summary = '<dt>Summary</dt><dt>N/A<dt>';

      // make definition list
      let dl = `<dl>
                  ${language} 
                  ${genre}
                  ${average}
                  ${networkName}
                  ${summary}
                </dl>`;
      $('#show').append(dl);
      $('#show').show();

    });
  });
});

