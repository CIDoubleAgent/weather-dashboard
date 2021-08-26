const APIKey = '&appid=37fdc1aba69032506199f3d6a944d491';
const units = '&units=imperial'
const onecallAPI = 'https://api.openweathermap.org/data/2.5/onecall?';
const geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=';
const todaysDate = moment().format("(MM/DD/YYYY)");

const searchButton = document.querySelector('#search-button');
let input = document.querySelector('#input-val');
let temp = document.querySelector('#temperature');
let humid = document.querySelector('#humidity');
let windSpd = document.querySelector('#wind-speed');
let uvi = document.querySelector('#uv-index');
let nameDate = document.querySelector('#name-date');

$(document).ready(function() {

  function init() {
    $('#error-div').hide();
  }

  init();

  searchButton.addEventListener('click', function () {
    fetch(geocodingAPI + input.value + APIKey)
    .then(response => response.json())
    .then(data => {
      console.log(data[0].lat + ',' + data[0].lon);
      console.log(todaysDate);
      console.log(data[0].name);
  
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      let nameVal = data[0].name;
  
      nameDate.innerHTML = nameVal + ' ' + todaysDate;
  
      fetch(onecallAPI + 'lat=' + latitude + '&lon=' + longitude + units + APIKey)
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        let weatherIconVal = data.current.weather[0].icon;
        let tempVal = data.current.temp;
        let humidVal = data.current.humidity;
        let windSpdVal = data.current.wind_speed;
        let uviVal = data.current.uvi;
        let weatherImgSrc = 'http://openweathermap.org/img/wn/' + weatherIconVal + '.png';
        console.log(weatherIconVal);
        console.log(weatherImgSrc);
        console.log(tempVal);
        console.log(humidVal);
        console.log(windSpdVal);
        console.log(uviVal);
  
        $('#weather-image').attr('src', weatherImgSrc);
        temp.innerHTML = 'Temperature: ' + Math.floor(tempVal) + '° F';
        humid.innerHTML = 'Humidity: ' + humidVal + ' %';
        windSpd.innerHTML = 'Wind Speed: ' + windSpdVal + ' MPH';
        uvi.innerHTML = 'UVI Index: ' + uviVal;
  
      })
      .catch(err => console.error(err + 'An error has occurred'));
  
    });
  
  });
});
