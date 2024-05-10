const url = new URL(location.href); 
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")
const img_path= 'https://image.tmdb.org/t/p/w1280/'
const APILINK = 'https://movie-web-app-fdv4.onrender.com/api/v1/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

returnReviews(APILINK);
returnInfo(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=8e9c780609a52e87297348610561d18a`);

function returnInfo(url){
  return fetch(url)
    .then(res => res.json())
    .then(function(data){
      console.log(data);
      const {poster_path, vote_average} = data;
      const image_path = poster_path; // Initialize img_path
      console.log(image_path);
      const div_new = document.createElement('div');
      div_new.innerHTML = `
        <div class="image">
            <img src="${img_path+image_path}" class="thumbnail"></img>
            <br>
            <span class="star">☆</span> ${parseFloat(vote_average).toFixed(1)}
            <button class="writeReview" id="writeReview">Write a review</button>
        </div>
          

        <div class="writeNewReview" id="writeNewReview">
          <hr>  
          <p><strong>Write a review</strong></p>
          <p><strong>User: </strong> <input type="text" id="new_user"></p>
          <p><strong>Review: </strong> </p>
          <textarea type="text" id="new_review"></textarea>
          <br>
          <a href="#" onclick="saveReview('new_review', 'new_user')"><button class="saveReview">Save Review</a>
        </div>
        
      `
      main.appendChild(div_new)
    });
}

function returnReviews(url){
  fetch(url + "movie/" + movieId).then(res => res.json())
  .then(function(data){
  console.log(data);
  data.forEach(review => {
      const div_card = document.createElement('div');
      div_card.innerHTML = `
      
      <div class="review">
          <hr>  
          <p><strong>User: </strong>${review.user}</p>
          ${review.review}
      </div>
        `

      main.appendChild(div_card);
    });
  });
}

main.addEventListener('click', (event) => {
  const newReviewDiv = document.getElementById('writeNewReview');
  // Check if the clicked element matches the button you're interested in
  if (event.target.matches('#writeReview')) {
      // Hide the new review div
      if(newReviewDiv.style.display == 'none'){
        newReviewDiv.style.display = 'block';
      }else{
        newReviewDiv.style.display = 'none';
      }
  }
});

function saveReview(reviewInputId, userInputId, id="") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": user, "review": review})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });        
  } else {
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}
