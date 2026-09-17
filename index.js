import country_codes from './country_code'

// Element Selectors
let bg_video = document.getElementById("bg-video");
let location_access = document.querySelector(".location_access");
let ui_1 = document.querySelector(".UI-1");
let ui_2 = document.querySelector(".UI-2");
let ui_3 = document.querySelector(".UI-3");
let ui_4 = document.querySelector(".UI-4");

// Data Displays for Current Location (UI-3)
let ui3_city = ui_3.querySelector(".city");
let ui3_flag = ui_3.querySelector(".flag");
let ui3_weather = ui_3.querySelector(".weather");
let ui3_temperature = ui_3.querySelector(".temperature");
let ui3_weatherIcon = ui_3.querySelector(".weather_icon");
let ui3_wind = ui_3.querySelector(".wind_text");
let ui3_humidity = ui_3.querySelector(".humidity_text");
let ui3_clouds = ui_3.querySelector(".clouds_text");

let ui3_aqi_status = ui_3.querySelector(".aqi_status");
let ui3_aqi_pm25 = ui_3.querySelector(".aqi_pm25");
let ui3_aqi_pm10 = ui_3.querySelector(".aqi_pm10");
let ui3_aqi_o3 = ui_3.querySelector(".aqi_o3");
let ui3_aqi_no2 = ui_3.querySelector(".aqi_no2");
let ui3_aqi_so2 = ui_3.querySelector(".aqi_so2");
let ui3_aqi_co = ui_3.querySelector(".aqi_co");

let ui3_alerts_container = ui_3.querySelector(".alerts_container");
let ui3_alerts_content = ui_3.querySelector(".alerts_content");
let ui3_hourly_row = ui_3.querySelector(".hourly_forecast_row");
let ui3_forecast_row = ui_3.querySelector(".forecast_row");
let ui3_marine_container = ui_3.querySelector(".marine_container");
let ui3_marine_wave = ui_3.querySelector(".marine_wave");
let ui3_marine_swell_ht = ui_3.querySelector(".marine_swell_ht");
let ui3_marine_swell_period = ui_3.querySelector(".marine_swell_period");
let ui3_marine_swell_dir = ui_3.querySelector(".marine_swell_dir");
let ui3_marine_tides_row = ui_3.querySelector(".marine_tides_row");
let ui3_astro_sunrise = ui_3.querySelector(".astro_sunrise");
let ui3_astro_sunset = ui_3.querySelector(".astro_sunset");
let ui3_astro_moonrise = ui_3.querySelector(".astro_moonrise");
let ui3_astro_moonset = ui_3.querySelector(".astro_moonset");
let ui3_astro_phase = ui_3.querySelector(".astro_moon_phase");
let ui3_astro_illum = ui_3.querySelector(".astro_illumination");


// Data Displays for Searched City (UI-4)
let ui4_info = document.querySelector(".ui_4_info");
let ui4_city = ui4_info.querySelector(".city");
let ui4_flag = ui4_info.querySelector(".flag");
let ui4_weather = ui4_info.querySelector(".weather");
let ui4_temperature = ui4_info.querySelector(".temperature");
let ui4_weatherIcon = ui4_info.querySelector(".weather_icon");
let ui4_wind = ui4_info.querySelector(".wind_text");
let ui4_humidity = ui4_info.querySelector(".humidity_text");
let ui4_clouds = ui4_info.querySelector(".clouds_text");

let ui4_aqi_status = ui4_info.querySelector(".aqi_status");
let ui4_aqi_pm25 = ui4_info.querySelector(".aqi_pm25");
let ui4_aqi_pm10 = ui4_info.querySelector(".aqi_pm10");
let ui4_aqi_o3 = ui4_info.querySelector(".aqi_o3");
let ui4_aqi_no2 = ui4_info.querySelector(".aqi_no2");
let ui4_aqi_so2 = ui4_info.querySelector(".aqi_so2");
let ui4_aqi_co = ui4_info.querySelector(".aqi_co");

let ui4_alerts_container = ui4_info.querySelector(".alerts_container");
let ui4_alerts_content = ui4_info.querySelector(".alerts_content");
let ui4_hourly_row = ui4_info.querySelector(".hourly_forecast_row");
let ui4_forecast_row = ui4_info.querySelector(".forecast_row");
let ui4_marine_container = ui4_info.querySelector(".marine_container");
let ui4_marine_wave = ui4_info.querySelector(".marine_wave");
let ui4_marine_swell_ht = ui4_info.querySelector(".marine_swell_ht");
let ui4_marine_swell_period = ui4_info.querySelector(".marine_swell_period");
let ui4_marine_swell_dir = ui4_info.querySelector(".marine_swell_dir");
let ui4_marine_tides_row = ui4_info.querySelector(".marine_tides_row");
let ui4_astro_sunrise = ui4_info.querySelector(".astro_sunrise");
let ui4_astro_sunset = ui4_info.querySelector(".astro_sunset");
let ui4_astro_moonrise = ui4_info.querySelector(".astro_moonrise");
let ui4_astro_moonset = ui4_info.querySelector(".astro_moonset");
let ui4_astro_phase = ui4_info.querySelector(".astro_moon_phase");
let ui4_astro_illum = ui4_info.querySelector(".astro_illumination");


// Interactions
let your_weather = document.querySelector(".Your_weather");
let search_weather = document.querySelector(".Search_weather");
let city_name = document.querySelector(".city_name");
let city_search_button = document.querySelector(".search_button");
let suggestions_list = document.querySelector(".suggestions_list");

var key = "8a14d477f9f8475eab720157261309";
var latitude = "";
var longitude = "";
let debounceTimer; 

// === MAP VARIABLES ===
let map3, weatherLayer3;
let map4, weatherLayer4;
let currentLayerType3 = 'precip';
let currentLayerType4 = 'precip';

// Event Listeners
your_weather.addEventListener('click', ui1Orui3Render);
search_weather.addEventListener('click', ui4render);
city_search_button.addEventListener('click', () => fetch_data_on_city());
location_access.addEventListener('click', getCurrLocation);

document.addEventListener('click', (e) => {
    if (!city_name.contains(e.target) && !suggestions_list.contains(e.target)) {
        suggestions_list.classList.add('hidden');
    }
});

city_name.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    if (query.length < 3) {
        suggestions_list.classList.add('hidden');
        suggestions_list.innerHTML = "";
        return;
    }

    debounceTimer = setTimeout(async () => {
        try {
            let response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${query}`);
            let data = await response.json();
            
            suggestions_list.innerHTML = ""; 

            if (data && data.length > 0) {
                data.forEach(city => {
                    let li = document.createElement('li');
                    li.className = "px-6 py-3 hover:bg-white/20 cursor-pointer transition-colors flex flex-col text-left";
                    let mainText = `<span class="font-bold text-lg">${city.name}</span>`;
                    let subText = `<span class="text-sm text-white/70">${city.region ? city.region + ', ' : ''}${city.country}</span>`;
                    li.innerHTML = `${mainText}${subText}`;
                    
                    li.addEventListener('click', () => {
                        city_name.value = `${city.name}, ${city.country}`; 
                        suggestions_list.classList.add('hidden');
                        fetch_data_on_city(`${city.lat},${city.lon}`); 
                    });
                    
                    suggestions_list.appendChild(li);
                });
                suggestions_list.classList.remove('hidden');
            } else {
                suggestions_list.classList.add('hidden');
            }
        } catch (error) {
            console.error("Autocomplete error:", error);
        }
    }, 300);
});

city_name.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        suggestions_list.classList.add('hidden');
        fetch_data_on_city(); 
    }
});

// Map Layer Control Listeners
document.querySelectorAll('.ui3-map-controls button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.ui3-map-controls button').forEach(b => b.classList.remove('active-map-btn'));
        e.target.classList.add('active-map-btn');
        currentLayerType3 = e.target.getAttribute('data-layer');
        if (map3 && latitude && longitude) renderMap(map3, 'ui3', latitude, longitude, currentLayerType3);
    });
});
document.querySelectorAll('.ui4-map-controls button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.ui4-map-controls button').forEach(b => b.classList.remove('active-map-btn'));
        e.target.classList.add('active-map-btn');
        currentLayerType4 = e.target.getAttribute('data-layer');
        let lat = document.getElementById('map-ui4').getAttribute('data-lat');
        let lon = document.getElementById('map-ui4').getAttribute('data-lon');
        if (map4 && lat && lon) renderMap(map4, 'ui4', lat, lon, currentLayerType4);
    });
});

// Helper Functions
function hideAll() {
    ui_1.classList.add('hidden');
    ui_2.classList.add('hidden');
    ui_3.classList.add('hidden');
    ui_4.classList.add('hidden');
}

function updateActiveTab(activeTab, inactiveTab) {
    activeTab.classList.add('bg-white/30', 'shadow-md');
    inactiveTab.classList.remove('bg-white/30', 'shadow-md');
}

function getSecureIconUrl(url) {
    return url.startsWith('//') ? `https:${url}` : url;
}

function getAQIDetails(index) {
    switch (index) {
        case 1: return { text: "Good", color: "bg-green-500/80 text-white shadow-green-500/50" };
        case 2: return { text: "Moderate", color: "bg-yellow-500/80 text-white shadow-yellow-500/50" };
        case 3: return { text: "Unhealthy for Sensitive Groups", color: "bg-orange-500/80 text-white shadow-orange-500/50" };
        case 4: return { text: "Unhealthy", color: "bg-red-500/80 text-white shadow-red-500/50" };
        case 5: return { text: "Very Unhealthy", color: "bg-purple-500/80 text-white shadow-purple-500/50" };
        case 6: return { text: "Hazardous", color: "bg-rose-900/80 text-white shadow-rose-900/50" };
        default: return { text: "Unknown Data", color: "bg-gray-500/80 text-white" };
    }
}

function getUTCDateTimeStr() {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() + 2); 
    
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const hh = String(now.getUTCHours()).padStart(2, '0');
    
    return `${yyyy}${mm}${dd}${hh}`;
}

function renderMap(mapInstance, mapIdString, lat, lon, layerType) {
    let timeStr = getUTCDateTimeStr();

    if (!mapInstance) {
        mapInstance = L.map(`map-${mapIdString}`).setView([lat, lon], 2); 
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 16
        }).addTo(mapInstance);

        if(mapIdString === 'ui3') map3 = mapInstance;
        if(mapIdString === 'ui4') map4 = mapInstance;
    } else {
        mapInstance.setView([lat, lon], 2);
    }

    setTimeout(() => { mapInstance.invalidateSize(); }, 300);

    if (mapIdString === 'ui3' && weatherLayer3) mapInstance.removeLayer(weatherLayer3);
    if (mapIdString === 'ui4' && weatherLayer4) mapInstance.removeLayer(weatherLayer4);

    let newWeatherLayer = L.tileLayer(`https://weathermaps.weatherapi.com/${layerType}/tiles/${timeStr}/{z}/{x}/{y}.png`, {
        opacity: 0.7, 
        attribution: 'WeatherAPI.com',
        maxNativeZoom: 10, 
        zIndex: 10 
    }).addTo(mapInstance);

    if(mapIdString === 'ui3') weatherLayer3 = newWeatherLayer;
    if(mapIdString === 'ui4') weatherLayer4 = newWeatherLayer;
}

function applyThemeAndUpdateVideo(ans) {
    const condition = ans.current.condition.text.toLowerCase();
    const isDay = ans.current.is_day; // 1 for day, 0 for night
    
    let targetVideo = "/assets/clouds.mp4"; 
    let themeName = "cloudy"; // Default

    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower') || condition.includes('pellets')) {
        targetVideo = "/assets/rain.mp4";
        themeName = "rainy";
    } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('blizzard') || condition.includes('ice')) {
        targetVideo = "/assets/snow.mp4";
        themeName = "snowy";
    } else if (condition.includes('thunder') || condition.includes('storm')) {
        targetVideo = "/assets/thunder.mp4";
        themeName = "stormy";
    } else if (condition.includes('sunny') || condition.includes('clear')) {
        targetVideo = isDay ? "/assets/sunny.mp4" : "/assets/clouds.mp4";
        themeName = isDay ? "sunny" : "cloudy"; 
    } else {
        targetVideo = "/assets/clouds.mp4"; 
        themeName = "cloudy"; 
    }

    // Apply color theme to body tag
    document.body.setAttribute('data-theme', themeName);

    // Swap Video seamlessly
    const filename = targetVideo.split('/').pop();
    if (!bg_video.currentSrc || !bg_video.currentSrc.includes(filename)) {
        bg_video.src = targetVideo;
        bg_video.load();
        bg_video.play().catch(err => console.log("Autoplay note:", err));
    }
}

function renderHourlyForecast(forecastdayArray, currentEpoch) {
    let allHours = [];
    forecastdayArray.forEach(day => {
        allHours = allHours.concat(day.hour);
    });

    let upcomingHours = allHours.filter(h => (h.time_epoch + 3600) > currentEpoch);
    let displayHours = upcomingHours.slice(0, 24);

    let html = '';
    displayHours.forEach((hourData, index) => {
        let dateObj = new Date(hourData.time_epoch * 1000);
        let displayTime = index === 0 ? "Now" : dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

        let iconStr = getSecureIconUrl(hourData.condition.icon);
        let temp = Math.round(hourData.temp_c);
        let chanceOfRain = hourData.chance_of_rain;

        html += `
            <div class="flex flex-col items-center bg-black/20 rounded-2xl p-4 min-w-[80px] shrink-0 hover:bg-white/20 transition-all cursor-default border border-white/5">
                <span class="text-xs uppercase text-white/80 font-bold mb-2 tracking-wider">${displayTime}</span>
                <img src="${iconStr}" alt="weather icon" class="w-8 h-8 object-contain drop-shadow-md mb-2">
                <span class="text-white font-extrabold text-sm mb-1">${temp}&deg;</span>
                <div class="flex items-center gap-1 text-[10px] text-theme-light font-semibold">
                    <i class="fa-solid fa-droplet"></i> ${chanceOfRain}%
                </div>
            </div>
        `;
    });
    return html;
}

function renderForecastDays(forecastdayArray) {
    let html = '';
    forecastdayArray.forEach((dayData, index) => {
        let dateObj = new Date(dayData.date_epoch * 1000);
        let dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        
        if (index === 0) dayName = "Today";

        let iconStr = getSecureIconUrl(dayData.day.condition.icon);
        let maxTemp = Math.round(dayData.day.maxtemp_c);
        let minTemp = Math.round(dayData.day.mintemp_c);

        html += `
            <div class="flex flex-col items-center bg-black/20 rounded-2xl p-4 min-w-[90px] shrink-0 hover:bg-white/20 transition-all cursor-default border border-white/5">
                <span class="text-xs uppercase text-white/80 font-bold mb-2 tracking-wider">${dayName}</span>
                <img src="${iconStr}" alt="weather icon" class="w-10 h-10 object-contain drop-shadow-md mb-2">
                <div class="flex gap-2 text-sm font-extrabold">
                    <span class="text-white">${maxTemp}&deg;</span>
                    <span class="text-white/50">${minTemp}&deg;</span>
                </div>
            </div>
        `;
    });
    return html;
}

function ui4render() {
    updateActiveTab(search_weather, your_weather);
    hideAll();
    ui_4.classList.remove('hidden');
    ui_4.classList.add('flex');
}

async function ui1Orui3Render() {
    updateActiveTab(your_weather, search_weather);
    hideAll();

    try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        if (result.state === "granted") {
            ui_2.classList.remove('hidden');
            ui_2.classList.add('flex');
            getCurrLocation();
        } else {
            ui_1.classList.remove('hidden');
            ui_1.classList.add('flex');
        }
    } catch (e) {
        ui_1.classList.remove('hidden');
        ui_1.classList.add('flex');
    }
}

async function getCurrLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                fetch_data_on_lat_lon();
            },
            (error) => {
                alert(`Error getting location: ${error.message}`);
                hideAll();
                ui_1.classList.remove('hidden');
                ui_1.classList.add('flex');
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Update UI-3 (Current Location)
function ui3_render(ans, marineAns) {
    applyThemeAndUpdateVideo(ans); 
    
    ui3_city.textContent = `${ans.location.name}`;
    ui3_flag.src = `https://flagsapi.com/${country_codes[ans.location.country]}/shiny/64.png`;
    ui3_weather.textContent = `${ans.current.condition.text}`;
    ui3_weatherIcon.src = getSecureIconUrl(ans.current.condition.icon);
    ui3_temperature.textContent = `${ans.current.temp_c}\u00B0C`;
    ui3_wind.textContent = `${ans.current.wind_mph} m/s`;
    ui3_humidity.textContent = `${ans.current.humidity}%`;
    ui3_clouds.textContent = `${ans.current.cloud}%`;

    // Process AQI
    if(ans.current.air_quality) {
        let aqiData = ans.current.air_quality;
        let epaIndex = aqiData['us-epa-index'];
        let aqiInfo = getAQIDetails(epaIndex);
        
        ui3_aqi_status.className = `aqi_status text-sm sm:text-base font-extrabold mb-5 px-4 py-2 rounded-full shadow-lg border border-white/20 transition-all duration-300 text-center ${aqiInfo.color}`;
        ui3_aqi_status.textContent = aqiInfo.text;
        
        ui3_aqi_pm25.textContent = aqiData.pm2_5.toFixed(1);
        ui3_aqi_pm10.textContent = aqiData.pm10.toFixed(1);
        ui3_aqi_o3.textContent = aqiData.o3.toFixed(1);
        ui3_aqi_no2.textContent = aqiData.no2.toFixed(1);
        ui3_aqi_so2.textContent = aqiData.so2.toFixed(1);
        ui3_aqi_co.textContent = Math.round(aqiData.co); 
    }

    // Process Alerts
    if (ans.alerts && ans.alerts.alert && ans.alerts.alert.length > 0) {
        let uniqueAlerts = [];
        let seenHeadlines = new Set();
        
        ans.alerts.alert.forEach(a => {
            if (!seenHeadlines.has(a.headline)) {
                seenHeadlines.add(a.headline);
                uniqueAlerts.push(a);
            }
        });

        let alertsHTML = uniqueAlerts.map(a => `
            <div>
                <strong class="block text-red-200 text-base mb-1">${a.event}</strong>
                <span class="text-xs opacity-90">${a.headline}</span>
            </div>
        `).join('');
        ui3_alerts_content.innerHTML = alertsHTML;
        ui3_alerts_container.classList.remove('hidden');
    } else {
        ui3_alerts_container.classList.add('hidden');
    }

    // Process Timelines & Forecasts & Astronomy
    if (ans.forecast && ans.forecast.forecastday && ans.forecast.forecastday.length > 0) {
        ui3_hourly_row.innerHTML = renderHourlyForecast(ans.forecast.forecastday, ans.location.localtime_epoch);
        ui3_forecast_row.innerHTML = renderForecastDays(ans.forecast.forecastday);

        let astro = ans.forecast.forecastday[0].astro;
        ui3_astro_sunrise.textContent = astro.sunrise;
        ui3_astro_sunset.textContent = astro.sunset;
        ui3_astro_moonrise.textContent = astro.moonrise;
        ui3_astro_moonset.textContent = astro.moonset;
        ui3_astro_phase.textContent = astro.moon_phase;
        ui3_astro_illum.textContent = astro.moon_illumination + "%";
    }

    // Process Marine & Tides
    if (marineAns && marineAns.forecast && marineAns.forecast.forecastday && marineAns.forecast.forecastday.length > 0) {
        try {
            let localHourStr = marineAns.location.localtime.split(" ")[1]; 
            let localHour = parseInt(localHourStr.split(":")[0]);
            let currentMarineHour = marineAns.forecast.forecastday[0].hour[localHour];
            
            ui3_marine_wave.textContent = currentMarineHour.sig_ht_mt + "m";
            ui3_marine_swell_ht.textContent = currentMarineHour.swell_ht_mt + "m";
            ui3_marine_swell_period.textContent = currentMarineHour.swell_period_secs + "s";
            ui3_marine_swell_dir.textContent = currentMarineHour.swell_dir_16_point;

            let tidesHTML = '';
            if (marineAns.forecast.forecastday[0].day.tides && marineAns.forecast.forecastday[0].day.tides[0].tide) {
                let tideArray = marineAns.forecast.forecastday[0].day.tides[0].tide;
                tideArray.forEach(t => {
                    let typeStr = t.tide_type === 'High' 
                        ? '<i class="fa-solid fa-arrow-up text-theme-accent"></i> High' 
                        : '<i class="fa-solid fa-arrow-down text-theme-accent opacity-70"></i> Low';
                    let tTime = t.tide_time.split(" ")[1] || t.tide_time; 
                    
                    tidesHTML += `
                       <div class="flex flex-col bg-black/20 rounded-xl p-3 min-w-[100px] shrink-0 border border-white/5 text-center">
                          <span class="text-xs font-bold text-white mb-1">${typeStr}</span>
                          <span class="text-xs text-white/80">${tTime}</span>
                          <span class="text-[10px] text-theme-light mt-1">${t.tide_height_mt}m</span>
                       </div>
                    `;
                });
            } else {
                tidesHTML = '<span class="text-xs text-white/50 w-full text-center py-2">No tide data currently available</span>';
            }
            ui3_marine_tides_row.innerHTML = tidesHTML;
            ui3_marine_container.classList.remove('hidden');
        } catch(e) {
            ui3_marine_container.classList.add('hidden');
        }
    } else {
        ui3_marine_container.classList.add('hidden');
    }

    renderMap(map3, 'ui3', ans.location.lat, ans.location.lon, currentLayerType3);
}

// Update UI-4 (Searched City)
function ui4_render(ans, marineAns) {
    applyThemeAndUpdateVideo(ans); 

    ui4_city.textContent = `${ans.location.name}`;
    ui4_flag.src = `https://flagsapi.com/${country_codes[ans.location.country]}/shiny/64.png`;
    ui4_weather.textContent = `${ans.current.condition.text}`;
    ui4_weatherIcon.src = getSecureIconUrl(ans.current.condition.icon);
    ui4_temperature.textContent = `${ans.current.temp_c}\u00B0C`;
    ui4_wind.textContent = `${ans.current.wind_mph} m/s`;
    ui4_humidity.textContent = `${ans.current.humidity}%`;
    ui4_clouds.textContent = `${ans.current.cloud}%`;

    // Process AQI
    if(ans.current.air_quality) {
        let aqiData = ans.current.air_quality;
        let epaIndex = aqiData['us-epa-index'];
        let aqiInfo = getAQIDetails(epaIndex);
        
        ui4_aqi_status.className = `aqi_status text-sm sm:text-base font-extrabold mb-5 px-4 py-2 rounded-full shadow-lg border border-white/20 transition-all duration-300 text-center ${aqiInfo.color}`;
        ui4_aqi_status.textContent = aqiInfo.text;
        
        ui4_aqi_pm25.textContent = aqiData.pm2_5.toFixed(1);
        ui4_aqi_pm10.textContent = aqiData.pm10.toFixed(1);
        ui4_aqi_o3.textContent = aqiData.o3.toFixed(1);
        ui4_aqi_no2.textContent = aqiData.no2.toFixed(1);
        ui4_aqi_so2.textContent = aqiData.so2.toFixed(1);
        ui4_aqi_co.textContent = Math.round(aqiData.co);
    }

    // Process Alerts
    if (ans.alerts && ans.alerts.alert && ans.alerts.alert.length > 0) {
        let uniqueAlerts = [];
        let seenHeadlines = new Set();
        
        ans.alerts.alert.forEach(a => {
            if (!seenHeadlines.has(a.headline)) {
                seenHeadlines.add(a.headline);
                uniqueAlerts.push(a);
            }
        });

        let alertsHTML = uniqueAlerts.map(a => `
            <div>
                <strong class="block text-red-200 text-base mb-1">${a.event}</strong>
                <span class="text-xs opacity-90">${a.headline}</span>
            </div>
        `).join('');
        ui4_alerts_content.innerHTML = alertsHTML;
        ui4_alerts_container.classList.remove('hidden');
    } else {
        ui4_alerts_container.classList.add('hidden');
    }

    // Process Timelines & Forecasts & Astronomy
    if (ans.forecast && ans.forecast.forecastday && ans.forecast.forecastday.length > 0) {
        ui4_hourly_row.innerHTML = renderHourlyForecast(ans.forecast.forecastday, ans.location.localtime_epoch);
        ui4_forecast_row.innerHTML = renderForecastDays(ans.forecast.forecastday);

        let astro = ans.forecast.forecastday[0].astro;
        ui4_astro_sunrise.textContent = astro.sunrise;
        ui4_astro_sunset.textContent = astro.sunset;
        ui4_astro_moonrise.textContent = astro.moonrise;
        ui4_astro_moonset.textContent = astro.moonset;
        ui4_astro_phase.textContent = astro.moon_phase;
        ui4_astro_illum.textContent = astro.moon_illumination + "%";
    }

    // Process Marine & Tides
    if (marineAns && marineAns.forecast && marineAns.forecast.forecastday && marineAns.forecast.forecastday.length > 0) {
        try {
            let localHourStr = marineAns.location.localtime.split(" ")[1]; 
            let localHour = parseInt(localHourStr.split(":")[0]);
            let currentMarineHour = marineAns.forecast.forecastday[0].hour[localHour];
            
            ui4_marine_wave.textContent = currentMarineHour.sig_ht_mt + "m";
            ui4_marine_swell_ht.textContent = currentMarineHour.swell_ht_mt + "m";
            ui4_marine_swell_period.textContent = currentMarineHour.swell_period_secs + "s";
            ui4_marine_swell_dir.textContent = currentMarineHour.swell_dir_16_point;

            let tidesHTML = '';
            if (marineAns.forecast.forecastday[0].day.tides && marineAns.forecast.forecastday[0].day.tides[0].tide) {
                let tideArray = marineAns.forecast.forecastday[0].day.tides[0].tide;
                tideArray.forEach(t => {
                    let typeStr = t.tide_type === 'High' 
                        ? '<i class="fa-solid fa-arrow-up text-theme-accent"></i> High' 
                        : '<i class="fa-solid fa-arrow-down text-theme-accent opacity-70"></i> Low';
                    let tTime = t.tide_time.split(" ")[1] || t.tide_time; 
                    
                    tidesHTML += `
                       <div class="flex flex-col bg-black/20 rounded-xl p-3 min-w-[100px] shrink-0 border border-white/5 text-center">
                          <span class="text-xs font-bold text-white mb-1">${typeStr}</span>
                          <span class="text-xs text-white/80">${tTime}</span>
                          <span class="text-[10px] text-theme-light mt-1">${t.tide_height_mt}m</span>
                       </div>
                    `;
                });
            } else {
                tidesHTML = '<span class="text-xs text-white/50 w-full text-center py-2">No tide data currently available</span>';
            }
            ui4_marine_tides_row.innerHTML = tidesHTML;
            ui4_marine_container.classList.remove('hidden');
        } catch(e) {
            ui4_marine_container.classList.add('hidden');
        }
    } else {
        ui4_marine_container.classList.add('hidden'); 
    }

    ui4_info.classList.remove('hidden');
    ui4_info.classList.add('flex');

    document.getElementById('map-ui4').setAttribute('data-lat', ans.location.lat);
    document.getElementById('map-ui4').setAttribute('data-lon', ans.location.lon);

    renderMap(map4, 'ui4', ans.location.lat, ans.location.lon, currentLayerType4);
}

// Fetch APIs
async function fetch_data_on_lat_lon() {
    hideAll();
    ui_2.classList.remove('hidden');
    ui_2.classList.add('flex');
    
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`);
        const ans = await response.json();
        
        let marineAns = null;
        try {
            let marineRes = await fetch(`https://api.weatherapi.com/v1/marine.json?key=${key}&q=${latitude},${longitude}&days=1&tides=yes`);
            if (marineRes.ok) marineAns = await marineRes.json();
        } catch (e) {
            // Fails silently
        }

        if (your_weather.classList.contains('bg-white/30')) {
            hideAll();
            ui_3.classList.remove('hidden');
            ui_3.classList.add('flex');
            ui3_render(ans, marineAns);
        }
    } catch (error) {
        console.error(error);
        if (your_weather.classList.contains('bg-white/30')) {
            hideAll();
            ui_1.classList.remove('hidden');
            ui_1.classList.add('flex');
        }
    }
}

async function fetch_data_on_city(exactQuery = null) {
    let query = exactQuery ? exactQuery : city_name.value;
    if (!query) return;

    ui4_info.classList.add('hidden');
    ui_2.classList.remove('hidden'); 
    ui_2.classList.add('flex');

    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query}&days=7&aqi=yes&alerts=yes`);
        if (!response.ok) throw new Error("City not found");
        
        const ans = await response.json();
        
        let marineAns = null;
        try {
            let marineRes = await fetch(`https://api.weatherapi.com/v1/marine.json?key=${key}&q=${query}&days=1&tides=yes`);
            if (marineRes.ok) marineAns = await marineRes.json();
        } catch (e) {
            // Fails silently
        }

        ui_2.classList.add('hidden');
        ui4_render(ans, marineAns);
    } catch (error) {
        ui_2.classList.add('hidden');
        alert("City not found. Please try again.");
    }
}

// Initial Call
ui1Orui3Render();
