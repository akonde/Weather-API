$(document).ready(function () {
  var apiKey = "9e744c7880dfffd38fa92dad98c4424b";
  var searchHistory = [];
  var lat = "44.34";
  var lon = "10.99";
  var currentCity;
  // Function to fetch weather data and update UI
  function fetchWeather(city) {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;
    var currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    $.getJSON(apiUrl, function (data) {
      // Update forecast UI
      
      $("#forecast").empty();
      for (let i = 4; i < 40; i += 8) {
        const item = data.list[i];
        console.log(item, 'checking');
        lat = data.city.coord.lat;
        lon = data.city.coord.lon
        currentCity = data.city.name;
        var forecastDate = new Date(item.dt * 1000).toLocaleDateString();
        var forecastTemp = item.main.temp;
        var forcastWind = item.wind.speed;
        var forecastHumidity = item.main.humidity;
        var forecastIconCode = item.weather[0].icon;
        var forecastIconUrl =
          "https://openweathermap.org/img/w/" + forecastIconCode + ".png";
        $("#forecast").append(`
            <div class="forecast-item">
              <h5> ${forecastDate}</h5>
              <p><img src="${forecastIconUrl}" alt="Weather icon"></p>
              <p>Temp: ${forecastTemp}°C</p>
              <p>Wind: ${forcastWind}KPH</p>
              <p>Humidity: ${forecastHumidity}%</p>
            </div>
          `);
      } return data;
    });
    $.getJSON(currentApiUrl, function (data) {
      // Update current weather UI
      var currentWeather = data;
      var currentDate = new Date(currentWeather.dt * 1000).toLocaleDateString();
      var currentTemp = (currentWeather.main.temp -32 * 5 / 9 ).toFixed()
      var currentHumidity = currentWeather.main.humidity;
      var currentWindSpeed = currentWeather.wind.speed;
      var iconCode = currentWeather.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

      $("#today").html(`
      <div class="today-header">
           <h2>${currentCity} (${currentDate}) <img src="${iconUrl}" alt="Weather icon"></h2>
          <p>Temperature: ${currentTemp}°C</p>
          <p>Wind: ${currentWindSpeed}KPH</p>
          <p>Humidity: ${currentHumidity}%</p>
        </div>  
        `);
    })
  }

  // Function to update search history
  function updateSearchHistory(city) {
    searchHistory.push(city);
    $("#search-history").empty();
    searchHistory.forEach(function (item) {
      $("#search-history").append(
        `<button class="search-item custom-btn">${item}</button>`
      );
    });
  }

  // Event handler for form submission
  $("#search-form").submit(function (event) {
    event.preventDefault();
    var city = $("#search-input").val().trim();

    if (city) {
      fetchWeather(city);
      updateSearchHistory(city);
    }
    $("#search-input").val("");
  });

  // Event delegation for search history clicks
  $("#search-history").on("click", ".search-item", function () {
    var city = $(this).text();
    fetchWeather(city);
  });
});
