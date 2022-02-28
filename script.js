//api call http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=def1e160639016757785c076a3adc16b

//documentation for https://openweathermap.org/api

  
let inputCity = document.getElementById("inputCity")
let searchBtn = document.getElementById("searchBtn")
let searchHistory = document.getElementById("searchHistory")
let storedCities
let savedCities = []


function searchForCity(event){
  event.preventDefault()
  

  if (inputCity.value === ''){
    alert("Please, enter a City into the search form.");
    return
  }
  
  searchHistory.textContent = ''
  console.log(inputCity.value)

  savedCities.push(inputCity.value)
  inputCity.value = ""
  
  localStorage.setItem("Searched", JSON.stringify(savedCities))
  storedCities = JSON.parse(localStorage.Searched);

  console.log(storedCities)
  
  for (i=0; i < storedCities.length; i++){
    $("#searchHistory").append("<btn id=" + storedCities[i] + ">" + storedCities[i] + "</btn> <br>");
  }

}

searchBtn.addEventListener("click",searchForCity);

function recallSearched(){

  let storedCities = JSON.parse(localStorage.Searched);
  for (i=0; i < storedCities.length; i++){
    $("#searchHistory").append("<btn id=" + storedCities[i] + ">" + storedCities[i] + "</btn> <br>");
  }
  
}
recallSearched();