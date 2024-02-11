// Data Fetching using the API
// API fetching forn "https://openweathermap.org/"
const apiKey = "2c5ce9f397ce994d7d5096ff76e3e94e";
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        
        if(!response.ok){
            throw new Error("Unable to Fetch Weather!")
        }
        const data = await response.json();

// Things to Check that the API data fetch is Working correctly or not...
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.main.feels_like);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        
        updateWeatherUI(data); //function for show of all the data
    } catch(err){
        console.log(err);
    }
}

// fetchWeatherData(); //USES FOR THE TRY DATA CHECK


// Display of the Data after fetching it form the API as per requirement
const date = document.querySelector(".date");
const descriptiontxt = document.querySelector(".description i");
const cityElement = document.querySelector(".city");
const descriptionText = document.querySelector(".description-text");
const temperature = document.querySelector(".temperature");
const feels_like = document.querySelector(".feels-like");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-speed");


function updateWeatherUI(data){ //function thats shows the all the data
    // const currentDate = new Date();
    date.innerText = new Date().toDateString();

    cityElement.innerText = data.name;
    descriptionText.innerText = data.weather[0].description;
    temperature.innerText = `${solveTemp(data.main.temp)}`;
    feels_like.innerText = `feels-like:- ${solveTemp(data.main.feels_like)}°C`;
    windSpeed.innerText =  `${data.wind.speed} Km/H`;
    humidity.innerText = `${data.main.humidity}%`;
    visibility.innerText = `${data.visibility/1000} Km`;

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptiontxt.innerHTML = `<i class="material-icons">${weatherIconName}</i>`
}


// function for solving the temperature form the Kelivn to Celcius
function solveTemp(temp){
    return Math.floor(temp-273.88);
}

// function that helps in changing the weather-icon
function getWeatherIconName(weatherConditions){
    const icon = {
        Clouds: "wb_cloudy",
        Rain: "umberalla",
        light_rain: "rainy_light",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "mist",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "foggy",
        Thunderstrom: "thunderstrom",
        clear_sky: "clear_day",
    };

    return icon[weatherConditions] || "help"
}



// Putting the EVENT_LISTENER_ON_THE_FORM-SECTION, so that entered thing can be read and the Weather details can be soon accordingly
const SearchformElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

SearchformElement.addEventListener("submit", (e)=>{
    e.preventDefault();

    const city = inputElement.value;
    if(city != ""){
        fetchWeatherData(city);
        inputElement.value = "";
    }
});