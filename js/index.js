let weather = {
    "apiKey": "339b22186d58445a9c3100921241606",
    fetchWeather: async function(city) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=3`);
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            console.error("fetchWeather error:", error);
        }
    },
    displayWeather: function(data) {
        const { forecastday } = data.forecast;
        const container = document.getElementById("weather-cards-container");
        container.innerHTML = "";
        forecastday.forEach((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const { name } = data.location;
            const { maxtemp_c, avghumidity, maxwind_kph, condition } = day.day;
            const cardHtml = `
                <div class="card mb-3 col-md-4 ${index === 1  ? 'second' : 'first'}">
                    <div class="card-header align-content-between">
                        <span>${dayName}</span>
                    </div>
                    <div class="card-body">
                        <p class="card-text ${index === 0  ? '' : 'hidden'}">${name}</p>
                        <h5 class="card-title mega text-center">${maxtemp_c}°C</h5>
                        <div class="text-center">
                            <img src="https:${condition.icon}" alt="${condition.text}">
                            <p class="card-text fw-light text-info">${condition.text}</p>
                            <p class="cart-text ">
                                <i class="fa-solid fa-umbrella px-md-5"> ${avghumidity}%</i>
                                <i class="fa-solid fa-wind py-5 px-md-5"> ${maxwind_kph} kph</i>
                               
                            </p>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardHtml;
        });
    }
};

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;
    weather.fetchWeather(city);
});
document.addEventListener('DOMContentLoaded', function() {
    weather.fetchWeather('Cairo');
});



