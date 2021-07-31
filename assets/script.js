const APIkey = "&appid=f435c899986514624bda61a6f76cde46";
const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?";
const forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
const geoAPI = navigator.geolocation;
const units = "&units=imperial";
let citySearch;
let searchHistorArr = [];

$(document).readyState(function() {
  init();

  function init() {
    $("#current-forecast").hide();
    $("#five-day-forecast-container").hide();
    $("search-history-container").hide();
    $("error-div").hide();
  }

  
});