const APIKey = '&appid=f435c899986514624bda61a6f76cde46';
const units = '&units=imperial'
const onecallAPI = 'https://api.openweathermap.org/data/2.5/onecall?q=';
const geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=';

const searchButton = document.querySelector('#searchButton');
let inputVal = document.querySelector('#inputVal');
let weatherImg = document.querySelector('#weather-image');
let temp = document.querySelector('#temperature');
let humid = document.querySelector('#humidity');
let windSpd = document.querySelector('#wind-speed');
let uv = document.querySelector('#uv-index');

fetch(geocodingAPI + inputVal + APIKey)
  .then(response => response.json())
  .then(data => console.log(data));
