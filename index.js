// JavaScript

let motnButton = document.getElementById('motn-fetch-btn');
const imdbFetchBtn = document.getElementById("imdb-fetch-btn");
const mediaContainer = document.getElementById("media-container");
let input = document.querySelector("input");

let services = [];
let info = [];

motnButton.addEventListener('click', (ttcode) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${motnKey}`,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    fetch(`https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt1877830`, options)
        .then(response => response.json())
        .then(response => {
            console.log("resonse", response)
            for (const property in response.result.streamingInfo.us) {
                console.log(property)
                // services.push(property)
            }

            // console.log(services)
            // for (services in response.result.streamingInfo.us) {
            //     for (const object in response.result.streamingInfo.us[services]) {
            //         // console.log(object)
            //         for (const type in response.result.streamingInfo.us[services][object]) {
            //             console.log(response.result.streamingInfo.us[services][object].link)
            //         }
            //     }
            //     // console.log(services, response.result.streamingInfo.us[services])
            //     // info.push(services, response.result.streamingInfo.us[services])
            // }
            // console.log(types)
            // console.log(response.result.streamingInfo.us.prime)
        })
        .catch(err => console.error(err));
})

let motnFetch = (ttcode) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${motnKey}`,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    fetch(`https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=${ttcode}`, options)
        .then(response => response.json())
        .then(response => {
            for (const property in response.result.streamingInfo.us) {
                console.log(property)
                // services.push(property)
            }

            // console.log(services)
            // for (services in response.result.streamingInfo.us) {
            //     for (const object in response.result.streamingInfo.us[services]) {
            //         // console.log(object)
            //         for (const type in response.result.streamingInfo.us[services][object]) {
            //             console.log(response.result.streamingInfo.us[services][object].link)
            //         }
            //     }
            //     // console.log(services, response.result.streamingInfo.us[services])
            //     // info.push(services, response.result.streamingInfo.us[services])
            // }
            // console.log(types)
            // console.log(response.result.streamingInfo.us.prime)
        })
        .catch(err => console.error(err));
}

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
                <div class="card-body">
                    <h5 class="card-title">${e.l}</h5>
                    <p>Media Type: ${e.q}</p>
                    <p>Media Type: ${e.yr}</p>
                    <p id='media-id' hidden='true'>Media ID: ${e.id}</p>
                    <button onclick='motnFetch("${e.id}")'>Where to Watch</button>
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
