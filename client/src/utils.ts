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

export const handleDisplayRawJSON = (jsonData: any) => {
  const newWindow = window.open('', '_blank')
  newWindow?.document.write('<pre>'+JSON.stringify(jsonData, null, 2)+'</pre>')
}