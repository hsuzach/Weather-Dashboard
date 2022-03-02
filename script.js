//api call http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=def1e160639016757785c076a3adc16b

//documentation for https://openweathermap.org/api

//api key: def1e160639016757785c076a3adc16b
  
let inputCity = document.getElementById("inputCity")
let searchBtn = document.getElementById("searchBtn")
let searchHistory = document.getElementById("searchHistory")
let currentCity = document.getElementById("currentCity")
let currentDate = document.getElementById("currentDate")
let currentWeatherIcon = document.getElementById("currentWeatherIcon")
let currentTemp = document.getElementById("currentTemp")
let currentWind = document.getElementById("currentWind")
let currentHumid = document.getElementById("currentHumid")
let currentUVI = document.getElementById("currentUVI")
let weatherForecast = document.getElementById("weatherForecast")

let day1 = document.getElementById("day1")
let day2 = document.getElementById("day2")
let day3 = document.getElementById("day3")
let day4 = document.getElementById("day4")
let day5 = document.getElementById("day5")


let selectedCity
let savedCities
let geoUrl
let weatherUrl

function addCity(){
  if (JSON.stringify(savedCities)){
    savedCities.push(selectedCity)
    localStorage.setItem('Cities', JSON.stringify(savedCities))
  } else {
    savedCities = []
    savedCities.push(selectedCity)
    localStorage.setItem('Cities', JSON.stringify(savedCities))
  }
}

function showWeather(x,y){
  weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&appid=def1e160639016757785c076a3adc16b"
  
  fetch(weatherUrl)
    .then(
      function(response){
        response.json().then(function(data){
        console.log(data)
        })
      }  
    )
    .catch(function (err) {
      console.error(err);
    })
}

function findGeo(x){
  geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + x + "&limit=1&appid=def1e160639016757785c076a3adc16b"  

  fetch(geoUrl)
    .then(
      function(response){
        response.json().then(function(data){
           
        var lat = data[0].lat
        var lon = data[0].lon
        console.log(lat)
        console.log(lon)  
        showWeather(lat,lon);

      })  
    })
    .catch(function (err) {
      console.error(err);
    })
  
}



function selectCity(event){
  event.preventDefault()

  if (!inputCity.value){
      alert("Please enter a City into the search form.");
      return
  }

  selectedCity = inputCity.value.trim()
  console.log(selectedCity)
  inputCity.value = ''
  
  addCity();
  findGeo(selectedCity);

}
searchBtn.addEventListener("click",selectCity); 




