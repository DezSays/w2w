// JavaScript

// Netflix, Amazon Prime Video, Hulu, Disney+, HBO Max, Peacock, Paramount+, Starz, Showtime, Apple TV+

let motnButton = document.getElementById('motn-fetch-btn')

let services = [];
let info = [];

motnButton.addEventListener('click', () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${motnKey}`,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    fetch('https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt1877830', options)
        .then(response => response.json())
        .then(response => {
            for (const property in response.result.streamingInfo.us) {
                // console.log(property)
                services.push(property)
            }

            // console.log(services)
            for (services in response.result.streamingInfo.us) {
                for (const object in response.result.streamingInfo.us[services]) {
                    // console.log(object)
                    for (const type in response.result.streamingInfo.us[services][object]) {
                        console.log(response.result.streamingInfo.us[services][object].link)
                    }
                }
                // console.log(services, response.result.streamingInfo.us[services])
                // info.push(services, response.result.streamingInfo.us[services])
            }
            // console.log(types)
            // console.log(response.result.streamingInfo.us.prime)
        })
        .catch(err => console.error(err));
})