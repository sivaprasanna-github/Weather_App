async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  try {
    // Get city coordinates
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.innerHTML = "<p>City not found. Try again.</p>";
      return;
    }

    const { latitude, longitude } = geoData.results[0];

    // Get weather info
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    const w = weatherData.current_weather;

    resultDiv.innerHTML = `
      <h3>${city}</h3>
      <p>Temperature: ${w.temperature}°C</p>
      <p>Wind Speed: ${w.windspeed} km/h</p>
      <p>Time: ${w.time}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching weather data.</p>";
    console.error(error);
  }
}