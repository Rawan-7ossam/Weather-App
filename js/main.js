const API_KEY = "89819d23816b4237950201930250107";

var searchInput = document.querySelector("#searchInput");
var findButton = document.querySelector("#findButton");
var colTodayDegree = document.querySelector("#col-today-degree");

var todayDayElement = document.querySelector("#todayDay");
var todayDateElement = document.querySelector("#todayDate");
var locationElement = document.querySelector("#location");
var todayDegree = document.querySelector("#degree");
var iconTodayDegree = document.querySelector("#iconTodayDegree");
var textTodayDegree = document.querySelector(".text-degree");


var tomorrowDay = document.querySelector("#tomorrowDay");
var iconTomorrowDegree = document.querySelector("#iconTomorrowDegree");
var tomorrowMaxDegree =document.querySelector("#tomorrowMaxDegree");
var tomorrowMinDegree = document.querySelector("#tomorrowMinDegree");
var textTomorrowDegree = document.querySelector("#textTomorrowDegree");


var afterTomorrowDay = document.querySelector("#afterTomorrowDay");
var iconAfterTomorrowDegree = document.querySelector("#iconAfterTomorrowDegree");
var afterTomorrowMaxDegree =document.querySelector("#afterTomorrowMaxDegree");
var afterTomorrowMinDegree = document.querySelector("#afterTomorrowMinDegree");
var textAfterTomorrowDegree = document.querySelector("#textAfterTomorrowDegree");


function getWeather(location){
    var httpReq = new XMLHttpRequest();

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`;

    httpReq.open("GET", apiUrl, true);
    httpReq.responseType = "json";
    httpReq.send();

    httpReq.addEventListener("load" , function(){
        console.log(httpReq.response);
        displayWeather(httpReq.response);
        
    })

    httpReq.addEventListener("error", function() {
        console.error(" error occurred while trying to get weather data.");
        
    });

}



function displayWeather(dataWeather){
    var todayData = dataWeather.forecast.forecastday[0];
    var currentLocation = dataWeather.location;
    var currentCondition = dataWeather.current;

    var todayDateObj = new Date(todayData.date);
    todayDayElement.textContent = todayDateObj.toLocaleDateString('en-US', { weekday: 'long' });
    todayDateElement.textContent = `${todayDateObj.getDate()}${todayDateObj.toLocaleDateString('en-US', { month: 'long' })}`;
    locationElement.textContent = currentLocation.name;
    todayDegree.textContent = `${currentCondition.temp_c}°C`;
    iconTodayDegree.src = currentCondition.condition.icon;
    textTodayDegree.textContent = currentCondition.condition.text;
    
    var forecastDays = dataWeather.forecast.forecastday;

    if(forecastDays[1]){
        var tomorrowDataWeather = forecastDays[1];
        var tomorrowDateObj = new Date(tomorrowDataWeather.date);
        tomorrowDay.textContent = tomorrowDateObj.toLocaleDateString('en-US', { weekday: 'long' });
        iconTomorrowDegree.src = tomorrowDataWeather.day.condition.icon;
        tomorrowMaxDegree.textContent = `${tomorrowDataWeather.day.maxtemp_c}°C`;
        tomorrowMinDegree.textContent = `${tomorrowDataWeather.day.mintemp_c}°C`;
        textTomorrowDegree.textContent = tomorrowDataWeather.day.condition.text;

    }

    if(forecastDays[2]){
        var afterTomorrowDataWeather = forecastDays[2];
        var afterTomorrowDateObj = new Date(afterTomorrowDataWeather.date);
        afterTomorrowDay.textContent = afterTomorrowDateObj.toLocaleDateString('en-US', { weekday: 'long' });
        iconAfterTomorrowDegree.src = afterTomorrowDataWeather.day.condition.icon;
        afterTomorrowMaxDegree.textContent = `${afterTomorrowDataWeather.day.maxtemp_c}°C`;
        afterTomorrowMinDegree.textContent = `${afterTomorrowDataWeather.day.mintemp_c}°C`;
        textAfterTomorrowDegree.textContent = afterTomorrowDataWeather.day.condition.text;

    }
}


findButton.addEventListener("click", function() {
    var location = searchInput.value;
    getWeather(location);
});

searchInput.addEventListener("input", function() {
    var location = searchInput.value;
    getWeather(location);
});

document.addEventListener('DOMContentLoaded', function() { //show cairo as default city
    getWeather("Cairo"); 
});








