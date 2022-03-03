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
let day1Icon = document.getElementById("day1Icon")
let day2Icon = document.getElementById("day2Icon")
let day3Icon = document.getElementById("day3Icon")
let day4Icon = document.getElementById("day4Icon")
let day5Icon = document.getElementById("day5Icon")
let day1Temp = document.getElementById("day1Temp")
let day2Temp = document.getElementById("day2Temp")
let day3Temp = document.getElementById("day3Temp")
let day4Temp = document.getElementById("day4Temp")
let day5Temp = document.getElementById("day5Temp")
let day1Humid = document.getElementById("day1Humid")
let day2Humid = document.getElementById("day2Humid")
let day3Humid = document.getElementById("day3Humid")
let day4Humid = document.getElementById("day4Humid")
let day5Humid = document.getElementById("day5Humid")

let selectedCity
let savedCities
let geoUrl
let weatherUrl
let citiesHistory

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function showHistory(){
  searchHistory.innerHTML = ''
  
  if (localStorage.Cities){
    citiesHistory = JSON.parse(localStorage.Cities).reverse();
    
    for (i=0; i < citiesHistory.length ; i++){
      $("#searchHistory").append("<btn type='submit' class='stored' data-search=" + citiesHistory[i] + ">" + citiesHistory[i] + "</btn> <br>");
    }
  } else {
    return
  }
}
showHistory();

function addCity(x){
  if (localStorage.Cities){
    savedCities = JSON.parse(localStorage.Cities)
    savedCities.push(x)
    localStorage.setItem('Cities', JSON.stringify(savedCities))

  } else {
    savedCities = []
    savedCities.push(x)
    localStorage.setItem('Cities', JSON.stringify(savedCities))
    
  }
  // console.log(citiesHistory.length)
  showHistory();
}


function showWeather(x,y){
  weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&appid=def1e160639016757785c076a3adc16b"
  
  fetch(weatherUrl)
    .then(
      function(response){
        response.json().then(function(data){
        console.log(data)
        
        let localTimezone = data.timezone

        let currentDay = dayjs().tz(localTimezone).format('M/D/YYYY')
        currentDate.innerHTML = "("+ currentDay + ")"

        let weatherCode = data.current.weather[0].icon
        let weatherIconSrc = "./img/" + weatherCode + "@2x.png"
        currentWeatherIcon.setAttribute("src", weatherIconSrc)
        currentWeatherIcon.setAttribute("style","visibility: visible");

        function displayTemp(x,y){
          let tempF  = Math.round((((1.8 * (x - 273)) + 32) + Number.EPSILON) * 100) / 100
          y.innerHTML = "Temp: " + tempF + " &#176; F"
        }
        displayTemp(data.current.temp, currentTemp)
        
        function displayHumidity(x,y){
          let humidity = x
          y.innerHTML = "Humidity: " + humidity + "%"
        }
        displayHumidity(data.current.humidity, currentHumid)

        let windSpeed = data.current.wind_speed               
        currentWind.innerHTML = "Wind Speed: " + windSpeed + " MPH"

        let uvi = data.current.uvi
        currentUVI.innerHTML = "UV Index: <span id='uviColor' style='display:inline'>" + uvi + "</span>" 
        let uviColor = document.getElementById("uviColor")
          if (uvi < 3){
            uviColor.setAttribute("style","background-color: green")
          }else if (uvi < 7) {
            uviColor.setAttribute("style","background-color: yellow")
          }else {
            uviColor.setAttribute("style","background-color: red")
          }
        
        let dayf1 = dayjs().tz(localTimezone).add(1, 'day').format('M/D/YYYY')
        day1Date.innerHTML = dayf1
        let iconf1 = data.daily[0].weather[0].icon
        let iconf1Src = "./img/" + iconf1 + "@2x.png"
        day1Icon.setAttribute("src", iconf1Src)
        displayTemp(data.daily[0].temp.max, day1Temp)
        displayHumidity(data.daily[0].humidity, day1Humid)
        
        let dayf2 = dayjs().tz(localTimezone).add(2, 'day').format('M/D/YYYY')
        day2Date.innerHTML = dayf2
        let iconf2 = data.daily[1].weather[0].icon
        let iconf2Src = "./img/" + iconf2 + "@2x.png"
        day2Icon.setAttribute("src", iconf2Src)
        displayTemp(data.daily[1].temp.max, day2Temp)
        displayHumidity(data.daily[1].humidity, day2Humid)

        let dayf3 = dayjs().tz(localTimezone).add(3, 'day').format('M/D/YYYY')
        day3Date.innerHTML = dayf3
        let iconf3 = data.daily[2].weather[0].icon
        let iconf3Src = "./img/" + iconf3 + "@2x.png"
        day3Icon.setAttribute("src", iconf3Src)
        displayTemp(data.daily[2].temp.max, day3Temp)
        displayHumidity(data.daily[2].humidity, day3Humid)

        let dayf4 = dayjs().tz(localTimezone).add(4, 'day').format('M/D/YYYY')
        day4Date.innerHTML = dayf4
        let iconf4 = data.daily[3].weather[0].icon
        let iconf4Src = "./img/" + iconf4 + "@2x.png"
        day4Icon.setAttribute("src", iconf4Src)
        displayTemp(data.daily[3].temp.max, day4Temp)
        displayHumidity(data.daily[3].humidity, day4Humid)

        let dayf5 = dayjs().tz(localTimezone).add(5, 'day').format('M/D/YYYY')
        day5Date.innerHTML = dayf5
        let iconf5 = data.daily[4].weather[0].icon
        let iconf5Src = "./img/" + iconf5 + "@2x.png"
        day5Icon.setAttribute("src", iconf5Src)
        displayTemp(data.daily[4].temp.max, day5Temp)
        displayHumidity(data.daily[4].humidity, day5Humid)



        forecast.setAttribute("style", "visbility: visible")

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
        if (!data[0]){
          alert("Sorry, your city could not be found. Please check your spelling or try another city.")
          return
        }   
        currentCity.textContent = x

        var lat = data[0].lat
        var lon = data[0].lon
        
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
  inputCity.value = ''
  
  findGeo(selectedCity);
  addCity(selectedCity);
}
searchBtn.addEventListener("click",selectCity);

function recallLast(){
  if (localStorage.Cities){
    lastSearched = JSON.parse(localStorage.Cities).reverse()
    lastCity = lastSearched[0]
    
    findGeo(lastCity)

  } else {
    return
  }  
}
recallLast();

function recallFromHistory(x){
  if (!x.target.matches('.stored')) {
    return;
  }

  let btn = x.target
  let fromHistory = btn.getAttribute('data-search')
  findGeo(fromHistory)
}
searchHistory.addEventListener('click', recallFromHistory)
