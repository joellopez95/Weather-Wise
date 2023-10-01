var cityName = 'San Antonio';


//GIVEN a weather dashboard with form inputs

//WHEN I search for a city
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}';
//obtain api using fetch (same ex as mini proj)
fetch(apiURL)
.then(function(response){
    if (!response.ok){
      // Handle error by displaying message
      console.error('Error: Unable to retrieve city coordinates.');  
      return;
    }
    return response.json();
})
.then(function(data){
    console.log(data)
    if (!data.coord || !data.coord.lat || !data.coord.lon){
        console.error('Error: Unable to locate coord for city');  
    }
// Extract the latitude and longitude from the response
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

    fetch(fiveDayURL)

})
.catch(function(error){
    console.error(error);
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