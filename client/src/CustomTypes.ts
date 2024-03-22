export interface Location {
    city: string
    state: string
    country: string
}

export interface GeocodeData {
    name: string
    state: string
    country: string
    lat: number
    lon: number
}

export interface Weather {
    description: string
    icon: string
    id: number
    main: string
}

export interface OpenWeatherResponseFeature {
    clouds: number
    dew_point: number
    dt: number
    feels_like: number
    humidity: number
    pressure: number
    rain?: {[key: string]: number}
    snow?: {[key: string]: number}
    sunrise: number
    sunset: number
    temp: number
    uvi?: number
    visibility: number
    weather: Weather[]
    wind_deg: number
    wind_gust?: number
    wind_speed: number
}

export interface OpenWeatherResponse {
    current: OpenWeatherResponseFeature
    daily: OpenWeatherResponseFeature[]
    hourly: OpenWeatherResponseFeature[]
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
}