const imdbFetchBtn = document.getElementById("imdb-fetch-btn");
const mediaContainer = document.getElementById("media-container");
let input = document.querySelector("input");

const movieTvTitleFetch = (title) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${imdbKey}`,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${title}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let dataArr = data.d;
      dataArr.forEach((e) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <img src=${e.i.imageUrl} />
                <h3>${e.l}</h3>
                <p>Media ID: ${e.id}</p>
                <p>Media Type: ${e.q}</p>
                <p>Media Type: ${e.yr}</p>
                <button>Where to Watch</button>
                `;
        mediaContainer.appendChild(div);
      });
    })
    .catch((err) => console.error(err));
};
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log("enter");
    movieTvTitleFetch(input.value);
  }
});