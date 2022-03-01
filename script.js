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

  storedCities = JSON.parse(localStorage.Searched);
  for (i=0; i < storedCities.length; i++){
    $("#searchHistory").append("<btn id=" + storedCities[i] + ">" + storedCities[i] + "</btn> <br>");
  }
  
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
    storedCities = JSON.parse(localStorage.Searched);
 
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
          
          var WeatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=def1e160639016757785c076a3adc16b"

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
                
                //convert to fahrenheit
                let tempF = ((1.8 * (storedWeather.main.temp - 273)) + 32)
                let roundedTemp = Math.round((tempF + Number.EPSILON) * 100) / 100

                currentTemp.innerHTML = "Temp: " + roundedTemp + " &#176; F"

     
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

