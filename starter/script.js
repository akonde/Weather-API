$(document).ready(function () {
  var apiKey = "9e744c7880dfffd38fa92dad98c4424b";
  var searchHistory = [];

  // Get element by id
  var city = $("#search-input").val();
  var history = $("#history")



  // Function to fetch weather data and update UI
  function fetchWeather(city) {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;

    $.getJSON(apiUrl, function (data) {
      // Update current weather UI
      console.log("api info =======", data);
      var currentWeather = data.list[0];
      var currentCity = data.city.name;
      var currentDate = new Date(currentWeather.dt * 1000).toLocaleDateString();
      var currentTemp = currentWeather.main.temp;
      var currentHumidity = currentWeather.main.humidity;
      var currentWindSpeed = currentWeather.wind.speed;
      var iconCode = currentWeather.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

      $("#current-weather").html(`
          <h2>${currentCity} (${currentDate}) <img src="${iconUrl}" alt="Weather icon"></h2>
          <p>Temperature: ${currentTemp}°C</p>
          <p>Humidity: ${currentHumidity}%</p>
          <p>Wind Speed: ${currentWindSpeed} m/s</p>
        `);

      // Update forecast UI
      var forecast = data.list.slice(1, 6);
      $("#forecast").empty();
      forecast.forEach(function (item) {
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
      });
    });
  }

  // Function to update search history
  function updateSearchHistory(city) {
    searchHistory.push(city);
    $("#search-history").empty();
    searchHistory.forEach(function (item) {
      $("#search-history").append(`<button class="search-item">${item}</button>`);
    });
  }

  // Event handler for form submission
  $("#search-form").submit(function (event) {
    event.preventDefault();
    var city = $("#search-input").val().trim();

    if (city) {
      fetchWeather(city);
      updateSearchHistory(city);
      $("#city-input").val(""); // Clear input
    }
  });

  // Event delegation for search history clicks
  $("#search-history").on("click", ".search-item", function () {
    var city = $(this).text();
    fetchWeather(city);
  });

  console.log("city name: ", city);
});
