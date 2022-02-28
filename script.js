//api call http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=def1e160639016757785c076a3adc16b

//documentation for https://openweathermap.org/api

  
let inputCity = document.getElementById("inputCity")
let searchBtn = document.getElementById("searchBtn")
let searchHistory = document.getElementById("searchHistory")
let savedCities = []
let storedCities = []

function searchForCity(event){
  event.preventDefault()

  if (inputCity.value === ''){
    alert("Please, enter a City into the search form.");
    return
  }
  
  searchHistory.textContent = ''

  console.log(inputCity.value)

  savedCities.push(inputCity.value)

  localStorage.setItem("Searched", JSON.stringify(savedCities))
  
  storedCities = JSON.parse(localStorage.Searched);

  console.log(storedCities)
  
 
  for (i=0; i < savedCities.length; i++){
    $("#searchHistory").append("<li>" + storedCities[i] + "</li>");
  }

  storedCities = []
  
  inputCity.value = ""
  
  
}

searchBtn.addEventListener("click",searchForCity);

// function recallSearched(){
//   for (i=0; i < savedCities.length; i++){
//   $("#searchHistory").append("<li>" + savedCities[i] + "</li>");
//   }
// }
// recallSearched();
