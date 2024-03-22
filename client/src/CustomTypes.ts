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

export interface HourlyForecast extends OpenWeatherResponseFeature {
    pop: number
}

export interface DailyForecast extends Omit<HourlyForecast, 'temp' | 'feels_like'>{
    moonrise: number,
    moonset: number,
    moon_phase: number,
    summary: string,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    }
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number
    }
}

export interface OpenWeatherResponse {
    current: OpenWeatherResponseFeature
    daily: DailyForecast[]
    hourly: HourlyForecast[]
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
}