const APIKey = '&appid=37fdc1aba69032506199f3d6a944d491';
const units = '&units=imperial'
const onecallAPI = 'https://api.openweathermap.org/data/2.5/onecall?';
const geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=';

const searchButton = document.querySelector('#search-button');
let inputVal = document.querySelector('#input-val');
let weatherImg = document.querySelector('#weather-image');
let temp = document.querySelector('#temperature');
let humid = document.querySelector('#humidity');
let windSpd = document.querySelector('#wind-speed');
let uv = document.querySelector('#uv-index');

searchButton.addEventListener('click', function () {
  fetch(geocodingAPI + inputVal.value + APIKey)
  .then(response => response.json())
  .then(data => {
    console.log(data[0].lat + ',' + data[0].lon);
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    fetch(onecallAPI + 'lat=' + latitude + '&lon=' + longitude + units + APIKey)
    .then(response => response.json())
    .then(data => console.log(data))
  })

});
