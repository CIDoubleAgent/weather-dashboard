const APIKey = '&appid=37fdc1aba69032506199f3d6a944d491';
const units = '&units=imperial'
const onecallAPI = 'https://api.openweathermap.org/data/2.5/onecall?';
const geocodingAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const todaysDate = moment().format("(MM/DD/YYYY)");
const date1Val = moment().add(1, 'days').format("MM/DD/YYYY")
const date2Val = moment().add(2, 'days').format("MM/DD/YYYY")
const date3Val = moment().add(3, 'days').format("MM/DD/YYYY")
const date4Val = moment().add(4, 'days').format("MM/DD/YYYY")
const date5Val = moment().add(5, 'days').format("MM/DD/YYYY")

const searchButton = document.querySelector('#search-button');
const searchHistory = document.getElementById('search-history');

const nameDate = document.querySelector('#name-date');
const temp = document.querySelector('#temperature');
const humid = document.querySelector('#humidity');
const windSpd = document.querySelector('#wind-speed');
const uvi = document.querySelector('#uv-index');

const date1 = document.querySelector('#date-1');
const temp1 = document.querySelector('#temperature-1');
const humid1 = document.querySelector('#humidity-1');
const windSpd1 = document.querySelector('#wind-speed-1');

const date2 = document.querySelector('#date-2');
const temp2 = document.querySelector('#temperature-2');
const humid2 = document.querySelector('#humidity-2');
const windSpd2 = document.querySelector('#wind-speed-2');

const date3 = document.querySelector('#date-3');
const temp3 = document.querySelector('#temperature-3');
const humid3 = document.querySelector('#humidity-3');
const windSpd3 = document.querySelector('#wind-speed-3');

const date4 = document.querySelector('#date-4');
const temp4 = document.querySelector('#temperature-4');
const humid4 = document.querySelector('#humidity-4');
const windSpd4 = document.querySelector('#wind-speed-4');

const date5 = document.querySelector('#date-5');
const temp5 = document.querySelector('#temperature-5');
const humid5 = document.querySelector('#humidity-5');
const windSpd5 = document.querySelector('#wind-speed-5');

const errMsg = $('#error-wrapper');
const currentDsply = $('#current-forecast');
const fiveDayDsply = $('#five-day-container');
const storageKey = 'citySearchTerms';

const searchHistoryCont = document.querySelector('#search-history-container');

function clearFunction () {
  localStorage.citySearchTerms = [];
  refresh();
}

function refresh () {
  location.reload();
}

$(document).ready(function() {

  function init() {
    currentDsply.hide();
    fiveDayDsply.hide();
    errMsg.hide();
  }

  init();


  function saveToStorage(city) {
    
    let storage = localStorage.getItem(storageKey);

    if (storage) {
      console.log(storage);
      let storedData = JSON.parse(storage);
      storedData.push(city);
      localStorage.setItem(storageKey, JSON.stringify(storedData));
      console.log(storedData);
    } else {
      let cityArr = [city];
      localStorage.setItem(storageKey, JSON.stringify(cityArr));
    }
  }

  function generateSearchButtons() {

    let storage = localStorage.getItem(storageKey);

    if (storage) {
      let storedData = JSON.parse(storage);
      storedData.forEach((city, i) => {
        generateButton(city, i);
      });
    }
  }

  generateSearchButtons();

  function generateButton(city, id) {
    let btnClasses = ['btn', 'btn-secondary', 'border-rounded', 'mt-3', 'executeSearch']
    let button = document.createElement('button');
    button.setAttribute('id', `executeSearch-${id}`);
    button.dataset.term = city;
    button.dataset.id = id;
    button.textContent = city;
    console.log(city);
    button.classList.add(...btnClasses);
    searchHistory.appendChild(button);

  }
  
  const input = document.querySelector('#input-val');

  input.addEventListener('click', function () {
    input.value = '';
  });

  searchButton.addEventListener('click', function () {
    getWeatherData(input.value);
  });
  
  
  document.addEventListener('click', (e) => {

    if (e.target.id.includes('executeSearch')){
      console.log(e.target.id);
      console.log(e.target.dataset);
      getWeatherData(e.target.dataset.term)
    }
   
  })

  function getWeatherData (searchTerm) {

    fetch(geocodingAPI + searchTerm + APIKey)

    .then(response => response.json())

    .then(data => {
      console.log(data[0].lat + ',' + data[0].lon);
      console.log(todaysDate);
      console.log(data[0].name);
  
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      let nameVal = data[0].name;
  
      nameDate.innerHTML = nameVal + ' ' + todaysDate;

      date1.innerHTML = date1Val;
      date2.innerHTML = date2Val;
      date3.innerHTML = date3Val;
      date4.innerHTML = date4Val;
      date5.innerHTML = date5Val;

 
      fetch(onecallAPI + 'lat=' + latitude + '&lon=' + longitude + units + APIKey)
      
      .then(response => response.json())

      .then(data => {
        console.log(data);

        if (input.value.length > 0) {
          saveToStorage(input.value.toLowerCase());
          generateButton(input.value.toLowerCase(), Math.floor(Math.random() * 1000));
        }
  
        let weatherIconVal = data.current.weather[0].icon;
        let tempVal = data.current.temp;
        let windSpdVal = data.current.wind_speed;
        let humidVal = data.current.humidity;
        let uviVal = data.current.uvi;
        let weatherImgSrc = 'http://openweathermap.org/img/wn/' + weatherIconVal + '.png';
        
        let weatherIconVal1 = data.daily[0].weather[0].icon;
        let weatherIconVal2 = data.daily[1].weather[0].icon;
        let weatherIconVal3 = data.daily[2].weather[0].icon;
        let weatherIconVal4 = data.daily[3].weather[0].icon;
        let weatherIconVal5 = data.daily[4].weather[0].icon;

        let weatherImgSrc1 = 'http://openweathermap.org/img/wn/' + weatherIconVal1 + '.png';
        let weatherImgSrc2 = 'http://openweathermap.org/img/wn/' + weatherIconVal2 + '.png';
        let weatherImgSrc3 = 'http://openweathermap.org/img/wn/' + weatherIconVal3 + '.png';
        let weatherImgSrc4 = 'http://openweathermap.org/img/wn/' + weatherIconVal4 + '.png';
        let weatherImgSrc5 = 'http://openweathermap.org/img/wn/' + weatherIconVal5 + '.png';

        let tempVal1 = data.daily[0].temp.day;
        let tempVal2 = data.daily[1].temp.day;
        let tempVal3 = data.daily[2].temp.day;
        let tempVal4 = data.daily[3].temp.day;
        let tempVal5 = data.daily[4].temp.day;

        let windSpdVal1 = data.daily[0].wind_speed;
        let windSpdVal2 = data.daily[1].wind_speed;
        let windSpdVal3 = data.daily[2].wind_speed;
        let windSpdVal4 = data.daily[3].wind_speed;
        let windSpdVal5 = data.daily[4].wind_speed;

        let humidVal1 = data.daily[0].humidity;
        let humidVal2 = data.daily[1].humidity;
        let humidVal3 = data.daily[2].humidity;
        let humidVal4 = data.daily[3].humidity;
        let humidVal5 = data.daily[4].humidity;
  
        $('#weather-image').attr('src', weatherImgSrc);
        temp.innerHTML = 'Temperature: ' + Math.floor(tempVal) + '° F';
        windSpd.innerHTML = 'Wind Speed: ' + windSpdVal + ' MPH';
        humid.innerHTML = 'Humidity: ' + humidVal + ' %';
        uvi.innerHTML = uviVal;

      
        if (uviVal < 4) {
          $("#uv-index").attr('class', 'badge bg-success');
        } else if (uviVal < 8) {
          $("#uv-index").attr('class', 'badge bg-warning');
        } else {
          $("#uv-index").attr('class', 'badge bg-danger');
        }
        
        $('#weather-image-1').attr('src', weatherImgSrc1);
        temp1.innerHTML = 'Temp: ' + Math.floor(tempVal1) + '° F';
        windSpd1.innerHTML = 'Wind: ' + Math.floor(windSpdVal1) + ' MPH';
        humid1.innerHTML = 'Humidity: ' + humidVal1 + ' %';
        
        $('#weather-image-2').attr('src', weatherImgSrc2);
        temp2.innerHTML = 'Temp: ' + Math.floor(tempVal2) + '° F';
        windSpd2.innerHTML = 'Wind: ' + Math.floor(windSpdVal2) + ' MPH';
        humid2.innerHTML = 'Humidity: ' + humidVal2 + ' %';
        
        $('#weather-image-3').attr('src', weatherImgSrc3);
        temp3.innerHTML = 'Temp: ' + Math.floor(tempVal3) + '° F';
        windSpd3.innerHTML = 'Wind: ' + Math.floor(windSpdVal3) + ' MPH';
        humid3.innerHTML = 'Humidity: ' + humidVal3 + ' %';
        
        $('#weather-image-4').attr('src', weatherImgSrc4);
        temp4.innerHTML = 'Temp: ' + Math.floor(tempVal4) + '° F';
        windSpd4.innerHTML = 'Wind: ' + Math.floor(windSpdVal4) + ' MPH';
        humid4.innerHTML = 'Humidity: ' + humidVal4+ ' %';
        
        $('#weather-image-5').attr('src', weatherImgSrc5);
        temp5.innerHTML = 'Temp: ' + Math.floor(tempVal5) + '° F';
        windSpd5.innerHTML = 'Wind: ' + Math.floor(windSpdVal5) + ' MPH';
        humid5.innerHTML = 'Humidity: ' + humidVal5 + ' %';

      })
      .then(function () {
        currentDsply.show();
        fiveDayDsply.show();
        errMsg.hide();
      })
      .catch(err => {
        errMsg.show();
        console.error(err + ' | An error has occurred');
      });
      
    })
    .catch(err => {
      currentDsply.hide();
      fiveDayDsply.hide();
      errMsg.show();
      console.error((err) + ' | Error, city not found');
    });
  }
});


 