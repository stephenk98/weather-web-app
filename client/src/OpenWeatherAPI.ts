import { GeocodeData, Location, OpenWeatherResponse, OpenWeatherResponseFeature } from "./CustomTypes"

export const reverseGeocode = async (
    lat: number,
    lon: number,
    setDisplayLocation: (geocodeData: GeocodeData) => void
) => {
    const response = await fetch('/reverse_geocode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lat: lat, lon: lon}),
    }).then((res) => res.json())
    setDisplayLocation(response)
    return response
}

export const geocodeLocation = async (
    location: Location,
    setDisplayLocation: (geocodeData: GeocodeData) => void
) => {
    const response = await fetch('/geocode_location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(location),
    }).then((res) => res.ok ? res.json() : null)
    if (response) {
        setDisplayLocation(response)
    }
    return response
}

export const getCurrentWeather = async (
    geocodeResponseData: GeocodeData,
    setCurrentWeather: (weather: OpenWeatherResponse) => void
) => {
    const response = await fetch('/current_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lat: geocodeResponseData.lat, lon: geocodeResponseData.lon}),
    }).then((res) => res.json())
    setCurrentWeather(response)
}

export const getLastWeekWeather = async (
    geocodeResponseData: GeocodeData,
    setLastWeekWeather: (weather: OpenWeatherResponseFeature[]) => void
) => {
    const response = await fetch('/last_week_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lat: geocodeResponseData.lat, lon: geocodeResponseData.lon}),
    }).then((res) => res.json())
    setLastWeekWeather(response)
}