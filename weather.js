let cityname = document.getElementById('cityname');
let city = document.getElementById('city');
let country = document.getElementById('country');
let temp = document.getElementById('temp');
let image = document.getElementById('image');

let reset = () => {
    cityname.value = "";
    city.textContent = "City";
    country.textContent = "Country";
    temp.textContent = "Temperature";
    image.src = "https://cdn-icons-png.flaticon.com/512/1116/1116453.png";
    image.className = "icon"; // Remove animations
}

let search = async () => {
    if (cityname.value.trim().length === 0) {
        alert('Please enter a city name');
        return;
    }
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&units=metric&appid=1cb6532aea3c298a830a71380eace21e`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod !== 200) {
            alert('City not found');
            return;
        }

        city.textContent = data.name;
        country.textContent = data.sys.country;
        temp.textContent = data.main.temp;

        let currentTime = new Date().getTime() / 1000;
        let isDaytime = currentTime >= data.sys.sunrise && currentTime <= data.sys.sunset;

        image.className = "icon"; // Reset classes
        if (data.weather[0].main === "Rain") {
            image.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
            image.classList.add("rain-animation");
        } else if (data.weather[0].main === "Clouds") {
            image.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
            image.classList.add("cloud-animation");
        } else if (data.weather[0].main === "Clear") {
            image.src = isDaytime
                ? "https://cdn-icons-png.flaticon.com/512/869/869869.png"
                : "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
            image.classList.add("sun-animation");
        } else if (data.weather[0].main === "Snow") {
            image.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
            image.classList.add("snow-animation");
        } else {
            image.src = "https://cdn-icons-png.flaticon.com/512/1116/1116453.png";
        }
    } catch (error) {
        alert('Error fetching weather data');
    }
}

cityname.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        search();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        reset();
    }
});
