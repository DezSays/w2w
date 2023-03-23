// JavaScript

let motnButton = document.getElementById("motn-fetch-btn");
const imdbFetchBtn = document.getElementById("imdb-fetch-btn");
const mediaContainer = document.getElementById("media-container");
let input = document.querySelector("input");

let services = [];
let info = [];

motnButton.addEventListener("click", (ttcode) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${motnKey}`,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  fetch(
    `https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt1877830`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("resonse", response);
      for (const property in response.result.streamingInfo.us) {
        console.log(property);
      }
    })
    .catch((err) => console.error(err));
});

let motnFetch = (ttcode) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${motnKey}`,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  fetch(
    `https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=${ttcode}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let wtwDiv = document.getElementById(`wtw-${ttcode}`);
      let wtwTrailer = document.createElement("div");
      wtwTrailer.innerHTML = `
        <button>
          <a href="${response.result.youtubeTrailerVideoLink}" target="_blank">
            Trailer
          </a>
        </button>
      `;
      wtwDiv.appendChild(wtwTrailer);
      for (services in response.result.streamingInfo.us) {
        for (const object in response.result.streamingInfo.us[services]) {
          /* Creating a new div element. */
          const newDiv = document.createElement("div");
          /* Creating a new div element and adding the innerHTML to it. */
          newDiv.innerHTML = `
                    <button><a href="${response.result.streamingInfo.us[services][object].link}" target="_blank">${services}: ${response.result.streamingInfo.us[services][object].type}</a></button>
                    `;
          /* Appending the newDiv to the wtwDiv. */
          wtwDiv.appendChild(newDiv);
        }
      }
    })
    .catch((err) => console.error(err));
};

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
        <div class="col">
            <div class="card">
            <img src=${e.i.imageUrl} class="card-img-top" alt=${e.l}>
                <div id="card-div-id" class="card-body">
                    <h5 class="card-title">${e.l}</h5>
                    <p>Starring: ${e.s}</p>
                    <button type="button" onclick='motnFetch("${e.id}")'>Where to Watch</button>
                    <div id="wtw-${e.id}"></div>
                </div>
            </div>
        </div>
                `;
        mediaContainer.appendChild(div);
      });
    })
    .catch((err) => console.error(err));
};
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    movieTvTitleFetch(input.value);
  }
});
