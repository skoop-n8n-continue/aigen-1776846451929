const CONFIG = {
  cities: {
    lahore: {
      name: "Lahore",
      url: "https://api.open-meteo.com/v1/forecast?latitude=31.5204&longitude=74.3587&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto"
    },
    karachi: {
      name: "Karachi",
      url: "https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto"
    }
  },
  intervals: {
    fetch: 7200000, // 2 hours
    reload: 86400000 // 24 hours
  },
  weatherCodes: {
    0: { label: "Clear Sky", icon: "sun", color: "var(--accent-sunny)" },
    1: { label: "Mainly Clear", icon: "sun", color: "var(--accent-sunny)" },
    2: { label: "Partly Cloudy", icon: "cloud-sun", color: "var(--accent-cloudy)" },
    3: { label: "Overcast", icon: "cloud", color: "var(--accent-cloudy)" },
    45: { label: "Fog", icon: "cloud-fog", color: "var(--accent-cloudy)" },
    48: { label: "Depositing Rime Fog", icon: "cloud-fog", color: "var(--accent-cloudy)" },
    51: { label: "Light Drizzle", icon: "cloud-drizzle", color: "var(--accent-rain)" },
    53: { label: "Moderate Drizzle", icon: "cloud-drizzle", color: "var(--accent-rain)" },
    55: { label: "Dense Drizzle", icon: "cloud-drizzle", color: "var(--accent-rain)" },
    56: { label: "Light Freezing Drizzle", icon: "cloud-drizzle", color: "var(--accent-rain)" },
    57: { label: "Dense Freezing Drizzle", icon: "cloud-drizzle", color: "var(--accent-rain)" },
    61: { label: "Slight Rain", icon: "cloud-rain", color: "var(--accent-rain)" },
    63: { label: "Moderate Rain", icon: "cloud-rain", color: "var(--accent-rain)" },
    65: { label: "Heavy Rain", icon: "cloud-rain", color: "var(--accent-rain)" },
    66: { label: "Light Freezing Rain", icon: "cloud-rain", color: "var(--accent-rain)" },
    67: { label: "Heavy Freezing Rain", icon: "cloud-rain", color: "var(--accent-rain)" },
    71: { label: "Slight Snow Fall", icon: "cloud-snow", color: "var(--text-primary)" },
    73: { label: "Moderate Snow Fall", icon: "cloud-snow", color: "var(--text-primary)" },
    75: { label: "Heavy Snow Fall", icon: "cloud-snow", color: "var(--text-primary)" },
    77: { label: "Snow Grains", icon: "cloud-snow", color: "var(--text-primary)" },
    80: { label: "Slight Rain Showers", icon: "cloud-rain", color: "var(--accent-rain)" },
    81: { label: "Moderate Rain Showers", icon: "cloud-rain", color: "var(--accent-rain)" },
    82: { label: "Violent Rain Showers", icon: "cloud-lightning", color: "var(--accent-rain)" },
    85: { label: "Slight Snow Showers", icon: "cloud-snow", color: "var(--text-primary)" },
    86: { label: "Heavy Snow Showers", icon: "cloud-snow", color: "var(--text-primary)" },
    95: { label: "Thunderstorm", icon: "cloud-lightning", color: "var(--accent-sunny)" },
    96: { label: "Thunderstorm with Slight Hail", icon: "cloud-lightning", color: "var(--accent-sunny)" },
    99: { label: "Thunderstorm with Heavy Hail", icon: "cloud-lightning", color: "var(--accent-sunny)" },
  }
};

// Fallback if code isn't found
const DEFAULT_WEATHER = { label: "Unknown", icon: "help-circle", color: "var(--text-secondary)" };
