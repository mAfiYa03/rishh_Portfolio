let cityname=document.getElementById('cityname')
let city=document.getElementById('city')
let country=document.getElementById('country')
let temp=document.getElementById('temp')
let icon=document.getElementById('icon')
let image=document.getElementById('image')
let button=document.getElementById('btn')

// let find=()=>{
//     button.style.color= 'red'

// }
let reset = () => {
    cityname.value = "";  // Clear the input field
    city.textContent = "CITY";  // Reset city name
    country.textContent = "COUNTRY";  // Reset country
    temp.textContent = "TEMPERATURE";  // Reset temperature
    image.src = "https://images.icon-icons.com/571/PNG/512/thermometer-temperature-control-tool-weather-interface-symbol_icon-icons.com_54635.png";  // Default image for reset
}

let search = async() =>{
    if(cityname.value.length == 0){
        alert('Invalid')
    }
    else{
        try{
            let url="https://api.openweathermap.org/data/2.5/weather?q="+cityname.value+"&units=metric&appid=1cb6532aea3c298a830a71380eace21e"
            let response=await fetch(url)
            let data = await response.json()
            city.textContent = data.name;
            country.textContent = data.sys.country;
            temp.textContent = data.main.temp;

            let currentTime = new Date().getTime() / 1000; // Current time in seconds (Unix timestamp)
            let sunrise = data.sys.sunrise; // Sunrise time in seconds (Unix timestamp)
            let sunset = data.sys.sunset; // Sunset time in seconds (Unix timestamp)
            let isDaytime = currentTime >= sunrise && currentTime <= sunset;



            if(temp.textContent>25){
                if (isDaytime){
                    image.src="https://images.icon-icons.com/3993/PNG/512/summer_sunny_sun_weather_forecast_sky_bright_icon_253959.png"
                }
                else{
                    image.src="https://images.icon-icons.com/3993/PNG/512/stars_astronomy_sky_crescent_forecast_moon_star_night_weather_wea_icon_253960.png"
                }
                
            }
            else if(temp.textContent>15 && temp.textContent<25){
               if (isDaytime){
                    image.src="https://images.icon-icons.com/3993/PNG/512/cloud_weather_forecast_cloudy_sun_clouds_sky_summer_sunny_icon_253961.png"
                }
                else{
                    image.src="https://images.icon-icons.com/3993/PNG/512/forecast_moon_night_weather_cloudy_sky_stars_crescent_clouds_icon_253958.png"
                }
            }
            else{
                image.src="https://images.icon-icons.com/3993/PNG/512/cloudy_forecast_cloud_sky_weather_clouds_gloomy_grey_rain_ra_icon_253966.png"
            }
        }catch{
            alert("Enter valid City")
        }
    }
    
}
cityname.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {  // Check if the Enter key was pressed
        button.classList.add('hover');  // Manually add the hover class
        setTimeout(() => {
            button.classList.remove('hover');  // Remove the hover class after a short delay
        }, 200);  // 200ms is the delay before removing the class
        search();  // Trigger the search function
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {  // Check if the ESC key was pressed
        resetBtn.classList.add('resethover');  // Add the hover class when ESC is pressed
        setTimeout(() => {
            resetBtn.classList.remove('resethover');  // Remove hover class after 200ms
        }, 200);  
        reset();  // Trigger the reset function
    }
});
