//api call http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=def1e160639016757785c076a3adc16b

//documentation for https://openweathermap.org/api

  
let inputCity = document.getElementById("inputCity")
let searchBtn = document.getElementById("searchBtn")
let searchHistory = document.getElementById("searchHistory")

function searchForCity(){
  console.log(inputCity.value)
  

}

searchBtn.addEventListener("click",searchForCity);

