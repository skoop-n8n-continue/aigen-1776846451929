async function fetchWeather(cityId) {
  const cityConfig = CONFIG.cities[cityId];
  try {
    const response = await fetch(cityConfig.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      temp: Math.round(data.current.temperature_2m),
      code: data.current.weather_code,
      wind: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m
    };
  } catch (error) {
    console.error(`Failed to fetch weather for ${cityConfig.name}:`, error);
    return null; // Return null so we don't overwrite existing UI with empty data
  }
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

async function updateCityUI(cityId) {
  const data = await fetchWeather(cityId);
  if (!data) return; // Silent fail, keep old data on screen

  const panel = document.getElementById(`${cityId}-panel`);
  const dataContainer = panel.querySelector('.data-container');
  const skeleton = panel.querySelector('.skeleton-wrapper');

  // Mapping code to weather condition
  const weatherInfo = CONFIG.weatherCodes[data.code] || DEFAULT_WEATHER;

  // If skeleton is showing (first load), hide it and show data
  if (skeleton) {
    skeleton.style.display = 'none';
    dataContainer.style.display = 'flex';
  } else {
    // Add updating class to fade out current data
    dataContainer.classList.add('updating');
    dataContainer.classList.remove('fade-in');
  }

  // Wait 400ms for fade out transition (from CSS) before changing text,
  // except on first load where we just want it to appear
  const waitTime = skeleton ? 0 : 400;

  setTimeout(() => {
    // Update DOM
    panel.querySelector('.temperature').innerText = data.temp;
    panel.querySelector('.condition').innerText = weatherInfo.label;
    panel.querySelector('.wind-val').innerText = `${data.wind} km/h`;
    panel.querySelector('.hum-val').innerText = `${data.humidity}%`;
    panel.querySelector('.last-updated').innerText = `Last updated: ${formatTime(new Date())}`;

    // Update Icon
    const iconWrapper = panel.querySelector('.icon-wrapper');
    iconWrapper.innerHTML = `<i data-lucide="${weatherInfo.icon}" class="icon" style="stroke: ${weatherInfo.color}"></i>`;

    // Refresh lucide icons to process the new data-lucide attribute
    if (window.lucide) {
      lucide.createIcons({
        root: iconWrapper
      });
    }

    // Fade in
    if (!skeleton) {
      dataContainer.classList.remove('updating');
      dataContainer.classList.add('fade-in');
    }
  }, waitTime);
}

async function updateAllWeather() {
  await Promise.all([
    updateCityUI('lahore'),
    updateCityUI('karachi')
  ]);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initial fetch
  updateAllWeather();

  // Set interval for regular updates (2 hours)
  setInterval(updateAllWeather, CONFIG.intervals.fetch);

  // Set timeout for full page reload to clear memory leaks (24 hours)
  setTimeout(() => {
    window.location.reload();
  }, CONFIG.intervals.reload);
});