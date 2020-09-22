let key = "8c5fcb32";
let search = document.getElementById("Search");
let form = document.getElementById("movieForm");
let input = document.getElementById("Movie");

form.addEventListener("submit",(e) => {
      e.preventDefault();
       var searchKey = input.value;
       searchMovies(searchKey);
    
});



async function searchMovies(searchKey){
    let BASE_URL = `http://www.omdbapi.com/?s=${searchKey}&apikey=${key}`
    
    try {
        let response = await window.fetch(BASE_URL);
        let movies = await response.json();
        console.log(movies);

        
        let output = [];
        for(let movie of movies.Search){
            
            let setDefaultPoster = movie.Poster === "N/A" ? "../images/download.png" : movie.Poster;
            output += `
            <div class = "card col-md-3 p-0 mt-5">
            
            <img src = "${setDefaultPoster}" class="img-card-top" alt="${movie.Title}">
            <div class="card-body">
              <h4>${movie.Title}</h4>
              <h4>${movie.Year}</h4>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Details</a>
            
            </div>
            </div>`;
        }
        document.getElementById("template").innerHTML = output;
        
    } catch (error) {
        console.log(error);
        
    }
}

async function movieSelected(id){
    let MOVIE_DATA = `http://www.omdbapi.com/?i=${id}&apikey=${key}`
    
    try{
        let data = await window.fetch(MOVIE_DATA);
        let movieProperties = await data.json(); 
        console.log(movieProperties);

        let output1 = [];

        output1 += `
        <div class="row">
          <div class="col-md-4">
            <img src="${movieProperties.Poster}" class="img-thumbnail">
          </div>
          <div class="col-md-8">
           <h2>${movieProperties.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre</strong>${movieProperties.Genre}</li>
              <li class="list-group-item"><strong>Released</strong>${movieProperties.Released}</li>
              <li class="list-group-item"><strong>Rated</strong>${movieProperties.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating</strong>${movieProperties.imdbRating}</li>
              <li class="list-group-item"><strong>Director</strong>${movieProperties.Director}</li>
              <li class="list-group-item"><strong>Writer</strong>${movieProperties.Writer}</li>
              <li class="list-group-item"><strong>Actors</strong>${movieProperties.Actors}</li>
              
            </ul>
          </div>
        </div>
        <div>
          <h3>Plot</h3>
          <p>${movieProperties.Plot}</p>
          <hr>
          <a href="http://imdb.com/title/${id}" target="_blank" class="btn btn-primary m-1">View IMDB</a>
          <a href="index.html" class="btn btn-dark m-1">Go Back to Search</a>
        </div>`;

        document.getElementById("template").innerHTML = output1;

    }

    catch(error) {
        console.error();
    }

}