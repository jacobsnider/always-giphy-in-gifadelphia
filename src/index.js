const card = document.querySelector('.card');
const img = card.querySelector('img');
const btn = card.querySelector('button');
const deadline = '2021-11-17';
var cnt = 1;
var giphyResults;



const giphy = {
    baseURL: "https://api.giphy.com/v1/gifs/",
    apiKey: "dc6zaTOxFJmzC",
    tag: `It's Always Sunny In Philadelphia`,
};
// API URL -> https://api.giphy.com/v1/gifs/search?q=It%27s%20Always%20Sunny%20In%20Philadelphia&api_key=dc6zaTOxFJmzC
const url = `${giphy.baseURL}search?q=${giphy.tag}&api_key=${giphy.apiKey}`;

// -------------------
// FETCH FUNCTIONS -> fetch data from an api and parse the response to JSON
// -------------------

function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
}
fetchData(url)
    .then(json => {
        giphyResults = json.data;
        gif = randomGif();
        displayGif(gif);
        fetchNewGif();
    })

// -------------------
// HELPER FUNCTIONS
// -------------------
// Recieve json 
function generateGif(json) {
    let giphyResults = json;
    // console.log(giphyResults);
    return giphyResults;
}
//select random url from response array
function randomGif() {
    let random = giphyResults[~~(Math.random() * giphyResults.length)];
    gifUrl = random.images.original.url;
    gifTitle = random.title;
    console.log(gifUrl);
    return { gifUrl, gifTitle };
}

function displayGif({ gifUrl, gifTitle }) {
    var html = `
                <button class="btn btn-warning text-uppercase w-50 mx-auto my-3">random gif</button>
                <div class="img-div">
                    <img src="${gifUrl}" alt="${gifTitle}" class="img-fluid d-block mx-auto">
                </div>
                `;
    card.innerHTML = html;
}

function fetchNewGif() {
    let random = giphyResults[~~(Math.random() * giphyResults.length)];
    // console.log(random, giphyResults)
    displayGif({ gifUrl: random.images.original.url, gifTitle: random.title });
}

function clickCount() {
    cnt += 1;
    var divData = document.getElementById("clickCount");
    divData.innerHTML = `You've seen ${cnt} gifs now.`;
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const timeinterval = setInterval(() => {
        const t = getTimeRemaining(endtime);
        clock.innerHTML =
            'Only ' + t.days + 'days, ' +
            t.hours + 'hours, ' +
            t.minutes + 'minutes, ' +
            t.seconds + 'seconds left until the next season premiere.';
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }, 1000);
}

initializeClock('clockdiv', deadline);

// --------------- 
// EVENT LISTENERS
// ---------------
card.addEventListener('click', fetchNewGif.bind(this));
card.addEventListener('click', clickCount);