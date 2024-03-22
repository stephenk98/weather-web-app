import { OpenWeatherResponseFeature } from "./CustomTypes"

export const convertKelvinToFahrenheit = (kelvin: number) => {
    return Math.round((kelvin - 273.15) * 9/5 + 32)
}

export const convertKelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15)
}

export const getWeatherIconUrl = (iconId: string) => `http://openweathermap.org/img/wn/${iconId}@4x.png`

export const convertUnixToDate = (unixDateTime: number) => new Date(unixDateTime * 1000)

export const getDayName = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[date.getDay()]
}

export const cleanHistoricalDataForDownload = (
  lastWeekWeatherData: OpenWeatherResponseFeature[],
  tempUnits: 'C' | 'F'
): any => {
  const cleanedData = lastWeekWeatherData.map((weather) => {
    const weatherDate = convertUnixToDate(weather.dt)
    const sunriseDate = convertUnixToDate(weather.sunrise)
    const sunsetDate = convertUnixToDate(weather.sunset)
    return {
      ...weather,  
      dt: weatherDate,
      sunrise: sunriseDate,
      sunset: sunsetDate,
      temp: `${tempUnits === 'C'
          ? convertKelvinToCelsius(weather.temp)
          : convertKelvinToFahrenheit(weather.temp)
      }°${tempUnits}`,
      feels_like: `${tempUnits === 'C'
          ? convertKelvinToCelsius(weather.feels_like)
          : convertKelvinToFahrenheit(weather.feels_like)
      }°${tempUnits}`,
      weather_main: weather.weather[0].main,
      weather_description: weather.weather[0].description,
      weather_icon: weather.weather[0].icon,
      weather_id: weather.weather[0].id,
    }
  })
  return cleanedData
}

export const getHistoricalDataCSVName = (
  lastWeekWeatherData: OpenWeatherResponseFeature[],
  location: string,
) => {
  const firstDate = convertUnixToDate(lastWeekWeatherData[0].dt)
  const lastDate = convertUnixToDate(lastWeekWeatherData[lastWeekWeatherData.length - 1].dt)
  return `${location}_weather_${firstDate.toDateString().replace(/ /g,'')}_to_${lastDate.toDateString().replace(/ /g,'')}.csv`
}

export const testLastWeekWeatherData: OpenWeatherResponseFeature[] = [
    {
      "clouds": 100,
      "dew_point": 277.41,
      "dt": 1710456592,
      "feels_like": 274.92,
      "humidity": 85,
      "pressure": 1012,
      "rain": {
        "1h": 3.05
      },
      "sunrise": 1710415844,
      "sunset": 1710458554,
      "temp": 279.75,
      "visibility": 9656,
      "weather": [
        {
          "description": "mist",
          "icon": "50d",
          "id": 701,
          "main": "Mist"
        },
        {
          "description": "moderate rain",
          "icon": "10d",
          "id": 501,
          "main": "Rain"
        }
      ],
      "wind_deg": 60,
      "wind_gust": 14.92,
      "wind_speed": 9.77
    },
    {
      "clouds": 20,
      "dew_point": 275.51,
      "dt": 1710542993,
      "feels_like": 277.32,
      "humidity": 68,
      "pressure": 1012,
      "sunrise": 1710502135,
      "sunset": 1710545027,
      "temp": 281.04,
      "visibility": 10000,
      "weather": [
        {
          "description": "few clouds",
          "icon": "02d",
          "id": 801,
          "main": "Clouds"
        }
      ],
      "wind_deg": 320,
      "wind_gust": 9.77,
      "wind_speed": 7.2
    },
    {
      "clouds": 100,
      "dew_point": 277.08,
      "dt": 1710629393,
      "feels_like": 277.82,
      "humidity": 74,
      "pressure": 999,
      "sunrise": 1710588427,
      "sunset": 1710631499,
      "temp": 281.43,
      "uvi": 0,
      "visibility": 10000,
      "weather": [
        {
          "description": "overcast clouds",
          "icon": "04d",
          "id": 804,
          "main": "Clouds"
        }
      ],
      "wind_deg": 200,
      "wind_speed": 7.2
    },
    {
      "clouds": 75,
      "dew_point": 268.91,
      "dt": 1710715794,
      "feels_like": 271.37,
      "humidity": 53,
      "pressure": 1005,
      "sunrise": 1710674718,
      "sunset": 1710717972,
      "temp": 277.07,
      "uvi": 0,
      "visibility": 10000,
      "weather": [
        {
          "description": "broken clouds",
          "icon": "04d",
          "id": 803,
          "main": "Clouds"
        }
      ],
      "wind_deg": 300,
      "wind_speed": 9.77
    },
    {
      "clouds": 100,
      "dew_point": 268.8,
      "dt": 1710802194,
      "feels_like": 267.39,
      "humidity": 64,
      "pressure": 1009,
      "sunrise": 1710761009,
      "sunset": 1710804444,
      "temp": 274.29,
      "uvi": 0,
      "visibility": 10000,
      "weather": [
        {
          "description": "overcast clouds",
          "icon": "04d",
          "id": 804,
          "main": "Clouds"
        }
      ],
      "wind_deg": 300,
      "wind_gust": 13.89,
      "wind_speed": 10.8
    },
    {
      "clouds": 100,
      "dew_point": 271.84,
      "dt": 1710888594,
      "feels_like": 269.22,
      "humidity": 83,
      "pressure": 1001,
      "sunrise": 1710847300,
      "sunset": 1710890916,
      "temp": 274.22,
      "uvi": 0,
      "visibility": 10000,
      "weather": [
        {
          "description": "overcast clouds",
          "icon": "04d",
          "id": 804,
          "main": "Clouds"
        }
      ],
      "wind_deg": 240,
      "wind_gust": 11.83,
      "wind_speed": 5.66
    },
    {
      "clouds": 75,
      "dew_point": 264.91,
      "dt": 1710974995,
      "feels_like": 264.7,
      "humidity": 56,
      "pressure": 1010,
      "sunrise": 1710933591,
      "sunset": 1710977388,
      "temp": 271.7,
      "uvi": 0,
      "visibility": 10000,
      "weather": [
        {
          "description": "broken clouds",
          "icon": "04d",
          "id": 803,
          "main": "Clouds"
        }
      ],
      "wind_deg": 290,
      "wind_gust": 19.03,
      "wind_speed": 11.32
    }
]