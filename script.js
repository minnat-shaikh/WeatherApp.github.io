//  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
  key: "09fa8d041ca854e31d8ba6b2a12797ce",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");
window.addEventListener("load", () => {
  let long;
  let lat;
  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const sample = async () => {
    document.querySelector(".info-txt").style.display = "block";
    let delayres = await delay(3000);
    document.querySelector(".info-txt").style.display = "none";
  };
  sample();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`
      )
        .then((weather) => {
          return weather.json();
        })
        .then(showWeatherReport);
    });
  }
});

// Show preloader
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    const delay = (delayInms) => {
      return new Promise((resolve) => setTimeout(resolve, delayInms));
    };

    const sample = async () => {
      document.querySelector(".info-txt").style.display = "block";
      let delayres = await delay(950);
      document.querySelector(".info-txt").style.display = "none";
    };
    sample();
  }
});

// Event listener Function on Keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;
  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
  let weatherType = document.getElementById("weather");
  weatherType.innerHTML = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  } else if (weatherType.textContent == "Smoke") {
    document.body.style.backgroundImage = "url('images/smoke.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/haze.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weatherType.textContent == "Mist") {
    document.body.style.backgroundImage = "url('images/mist.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rain.jpg')";
  }
}

// Date Manage
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];
  console.log(dateArg);

  return `${date} ${month} (${day}), ${year}`;
}
