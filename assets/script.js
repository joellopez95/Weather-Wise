var cityName = "San Antonio";
var apiKey = "e38952739d3c9739605b17f167baf501";
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-input");
var searchHistory = document.querySelector("#search-history");
var currentWeather = document.querySelector("#current-weather");
var forecast = document.querySelector("#forecast");
var weatherImage = document.getElementById("#weathericon");

//GIVEN a weather dashboard with form inputs
//function to create current weather

function displayCurrentWeather(data) {
  var city = data.name;
  //had to convert timestamp to date (stackoverflow)
  var date = new Date(data.dt * 1000);
  //converted temp from kelvin to celsius and got decimal place down to 2.
  var temperature = (data.main.temp - 273.15).toFixed(2);
  var humidity = data.main.humidity;
  var windSpeed = data.wind.speed;
  var weatherIcon = data.weather[0].icon;
  var iconURL = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

  //html elements to display
  //get date as a string w3 schools date.todatestring()
  //concatination, had to play around with quotations to get variables up and running
  //"prettier" made it look like this
  // used template literals instead of concatination
  //temp in kelvin?? need to convert!
  //tested, lots of decimals, cut down!
  //got code to get icon in reddit.
  currentWeather.innerHTML = `<h2>${city}</h2><p>Date: ${date.toDateString()}</p> <img src="${iconURL}" alt="Weather Icon"><p>Temperature: ${temperature} °C </p><p>Humidity: ${humidity} % </p><p>Wind Speed: ${windSpeed} m/s </p> 
`;
}
// Extract the latitude and longitude from the response

//function to get 5 day forecast
//must use lat lon, from read me

//same process as function displaycurrentweather: copied same code, edited
function getFiveDayForecast(lat, lon) {
  // Use template literals for string interpolation
  var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(fiveDayURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network not ok");
      }
      return response.json();
    })
    .then(function (weatherData) {
      //get 5 day forecast from the response
      var forecastData = weatherData.list;
      //cleared previous forecast data
      forecast.innerHTML = "";

      //variable to keep track of days:
      var daysDisplayed = 0;

      //need container for the items:
      var forecastContainer = document.createElement('div');
      forecastContainer.className = "forecast-container";
      //need to get only 5 days showing:
      forecastData.forEach(function (item) {
        if (daysDisplayed < 5) {
          var date = new Date(item.dt * 1000).toDateString();
          //converted temp from kelvin to celsius and got decimal place down to 2.
          //copied and pasted var for this.
          var temperature = (item.main.temp - 273.15).toFixed(2);
          var humidity = item.main.humidity;
          var windSpeed = item.wind.speed;
          var weatherIcon = item.weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
          var forecastItem = document.createElement('div');
          forecastItem.className = 'forecast-item';

          //copied pasted currentweatherinner
          forecastItem.innerHTML = `<p> ${date}</p> <img src="${iconURL}" alt="Weather Icon"><p>Temperature: ${temperature} °C </p><p>Humidity: ${humidity} % </p><p>Wind Speed: ${windSpeed} m/s </p> `;
          // need to append that way it shows!!
          forecastContainer.appendChild(forecastItem);

          //increment for days displayed:
          daysDisplayed++;
        }
      });
      //need to append forecast container to forecast div
      forecast.appendChild(forecastContainer);
    })
    .catch(function (error) {
      console.error(error);
    });
}

//click event listener for submit?? **form submit created in html!!

cityForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var city = cityInput.value.trim();

  if (city) {
    //URL for city name
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    //obtain api using fetch (same ex as mini proj)
    fetch(apiURL)
      .then(function (response) {
        if (!response.ok) {
          //throw new error got it from miniproj
          throw new Error("Network not ok");
        }
        return response.json();
      })
      .then(function (data) {
        //call data
        displayCurrentWeather(data);
        if (data.coord && data.coord.lat && data.coord.lon) {
          var lat = data.coord.lat;
          var lon = data.coord.lon;

          getFiveDayForecast(lat, lon);
        } else {
          console.error("Error: Coordinates not found for the city.");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//will need a function to display current weather
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//add event listener "click"
//THEN I am again presented with current and future conditions for that city
