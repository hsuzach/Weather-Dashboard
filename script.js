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





let storedCities
let savedCities = []

function recallSearched(){

  storedCities = JSON.parse(localStorage.Searched).reverse();
  for (i=0; i < storedCities.length; i++){
    $("#searchHistory").append("<btn id=" + storedCities[i] + ">" + storedCities[i] + "</btn> <br>");
  
  }
  console.log(storedCities)
  
}
recallSearched();



function findWeather(){
  let newCity
  
  function searchForCity(event){
    event.preventDefault()
    

    if (inputCity.value === ''){
      alert("Please, enter a City into the search form.");
      return
    }
    
    searchHistory.textContent = ''
    console.log(inputCity.value)

    savedCities.push(inputCity.value)
    newCity = inputCity.value
    inputCity.value = ""
    
    
    localStorage.setItem("Searched", JSON.stringify(savedCities))
    storedCities = JSON.parse(localStorage.Searched).reverse();
 
    for (i=0; i < storedCities.length; i++){
      $("#searchHistory").append("<btn id=" + storedCities[i] + ">" + storedCities[i] + "</btn> <br>");
    }
    
    let GeoUrl = ''
  
    GeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&limit=1&appid=def1e160639016757785c076a3adc16b"

  
    fetch(GeoUrl)
      .then(
        function(response){
        response.json().then(function(data){
          console.log(data[0].lat)
          console.log(data[0].lon)
          
          var lat = data[0].lat
          var lon = data[0].lon
          
          var WeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=def1e160639016757785c076a3adc16b"

          fetch(WeatherUrl)
          .then(
            function(response){
              response.json().then(function(data){
                localStorage.setItem("StoredWeather", JSON.stringify(data))

                let storedWeather = JSON.parse(localStorage.getItem("StoredWeather")) || []
                
                console.log(storedWeather)
                
                currentCity.innerHTML = newCity

                // currentDate
                // https://day.js.org/docs/en/display/format
                let currentDay = dayjs().format('M/D/YYYY')
                currentDate.innerHTML = "("+ currentDay + ")"

                let weatherCode = storedWeather.current.weather[0].icon
                if (weatherCode == "01d"){
                  currentWeatherIcon.setAttribute("src","./img/01d@2x.png")
                }else if (weatherCode == "01n"){
                  currentWeatherIcon.setAttribute("src","./img/01n@2x.png")
                }else if (weatherCode == "02d"){
                  currentWeatherIcon.setAttribute("src","./img/02d@2x.png")
                }else if (weatherCode == "02n"){
                  currentWeatherIcon.setAttribute("src","./img/02n@2x.png")
                }else if (weatherCode == "03d"){
                  currentWeatherIcon.setAttribute("src","./img/03d@2x.png")
                }else if (weatherCode == "03n"){
                  currentWeatherIcon.setAttribute("src","./img/03n@2x.png")
                }else if (weatherCode == "04d"){
                  currentWeatherIcon.setAttribute("src","./img/04d@2x.png")
                }else if (weatherCode == "04n"){
                  currentWeatherIcon.setAttribute("src","./img/04n@2x.png")
                }else if (weatherCode == "09d"){
                  currentWeatherIcon.setAttribute("src","./img/09d@2x.png")
                }else if (weatherCode == "09n"){
                  currentWeatherIcon.setAttribute("src","./img/09n@2x.png")
                }else if (weatherCode == "10d"){
                  currentWeatherIcon.setAttribute("src","./img/10d@2x.png")
                }else if (weatherCode == "10n"){
                  currentWeatherIcon.setAttribute("src","./img/10n@2x.png")
                }else if (weatherCode == "11d"){
                  currentWeatherIcon.setAttribute("src","./img/11d@2x.png")
                }else if (weatherCode == "11n"){
                  currentWeatherIcon.setAttribute("src","./img/11n@2x.png")
                }else if (weatherCode == "13d"){
                  currentWeatherIcon.setAttribute("src","./img/13d@2x.png")
                }else if (weatherCode == "13n"){
                  currentWeatherIcon.setAttribute("src","./img/13n@2x.png")
                }else if (weatherCode == "50d"){
                  currentWeatherIcon.setAttribute("src","./img/50d@2x.png")
                }else if (weatherCode == "50n"){
                  currentWeatherIcon.setAttribute("src","./img/50n@2x.png")
                } 
                

                console.log(weatherCode)

                //convert to fahrenheit
                let tempF = ((1.8 * (storedWeather.current.temp - 273)) + 32)
                let roundedTemp = Math.round((tempF + Number.EPSILON) * 100) / 100

                currentTemp.innerHTML = "Temp: " + roundedTemp + " &#176; F"
                
                let humidity = storedWeather.current.humidity
                currentHumid.innerHTML = "Humidity: " + humidity + "%"

                let windSpeed = storedWeather.current.wind_speed               
                currentWind.innerHTML = "Wind Speed: " + windSpeed + " MPH"

                let uvi = storedWeather.current.uvi
                currentUVI.innerHTML = "UV Index: " + uvi
     
              })
            }
           )

        })
        }
      )  


  }

  searchBtn.addEventListener("click",searchForCity);  
  
}
findWeather();

