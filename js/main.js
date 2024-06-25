//Today global vars
const todayDayName = document.getElementById("today-day-name");
const todayDayNum = document.getElementById("today-date-num");
const todayMounthName = document.getElementById("today-mounth-name");
const cityName = document.getElementById("today-city-name");
const todayTemp = document.getElementById("today-degrees");
const todayIcon = document.getElementById("today-icon");
const todayDesc = document.getElementById("today-desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirection = document.getElementById("wind-direction");

//other days  g-vars
const dayName = document.getElementsByClassName("day-name");
const dayTempMax = document.getElementsByClassName("day-degree-max");
const dayTempMin = document.getElementsByClassName("day-degree-min");
const dayIcon = document.getElementsByClassName("day-icon");
const dayDesc = document.getElementsByClassName("day-desc");

//search input
const searchInput = document.getElementById("search");

async function getWeatherData(cName) {
  let weatherRes = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a5c5ead50eaf4ddbb7553305242406&q=${cName}&days=3`
  );
  let weatherData = await weatherRes.json();
  return weatherData;
}

function displayWeatherData(data) {
  let todayDate = new Date();
  todayDayName.innerHTML = todayDate.toLocaleString("en-US", {weekday: "long",});
  todayDayNum.innerHTML = todayDate.getDate();
  todayMounthName.innerHTML = todayDate.toLocaleString('en-US',{month:'long'});
  cityName.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c + ` <sup>o</sup>C`;
  todayIcon.setAttribute("src", data.current.condition.icon);
  todayDesc.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + " km/h";
  windDirection.innerHTML = data.current.wind_dir;
}

function displayFollowingDay(data) {
  let forecast = data.forecast.forecastday.slice(1, 3); // Get the next 2 days forecast

  for (let i = 0; i < forecast.length; i++) {
    let dayDate = new Date(forecast[i].date);
    dayName[i].innerHTML = dayDate.toLocaleString("en-US", {weekday: "long",});
    dayTempMax[i].innerHTML = forecast[i].day.maxtemp_c + ` <sup>o</sup>C`;
    dayTempMin[i].innerHTML = forecast[i].day.mintemp_c + ` <sup>o</sup>C`;
    dayIcon[i].setAttribute("src", forecast[i].day.condition.icon);
    dayDesc[i].innerHTML = forecast[i].day.condition.text;
  }
}

searchInput.addEventListener('input',() =>{
runApp(searchInput.value);
})

async function runApp(cName='giza') {
  let weatherData = await getWeatherData(cName);
  if(!weatherData.error){
      displayWeatherData(weatherData);
      displayFollowingDay(weatherData);
  }
}
runApp();
