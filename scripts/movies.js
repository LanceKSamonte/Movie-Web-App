const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=8e9c780609a52e87297348610561d18a&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// function to show posters, images, titles, descriptions, ratings of movies
function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    console.log(data.results);
    main.innerHTML = '';
    data.results.forEach(element => {
        const{id, title, poster_path, vote_average, overview} = element;
        const movieEl = document.createElement('div');
        
        movieEl.innerHTML = makeCard(title, overview, id, poster_path, vote_average);
   
        main.appendChild(movieEl);
    });
  });
}

// Check for Search
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;
    if(searchItem){
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});

// function to make a movie card
function makeCard(title, overview, id, poster_path, vote_average){
    return `
        <div class="row">
            <div class="column">
                <div class="card">
                    <div class="movie_title"><h3>${title}</h3></div>
                    <hr>
                    <img src="${poster_path ? IMG_PATH + poster_path : '../images/imgNotFound.jpg'}" 
                        class="thumbnail" alt="${title}">   
                    <div class="description">
                        <p>${overview}</p>
                    </div>
                    <span class="rating"><a href="movie.html?id=${id}&title=${title}"><button class="toReviews">Reviews</button></a><span class="star">☆</span>${parseFloat(vote_average).toFixed(1)}
                    </span> 
                    
                </div>
            </div>
        </div>
    `; 
}
