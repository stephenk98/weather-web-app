import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CitySearch from './components/CitySearch'
import { GeocodeData, Location, OpenWeatherResponse, OpenWeatherResponseFeature } from './CustomTypes'
import WeatherDisplay from './components/WeatherDisplay'
import { reverseGeocode, getCurrentWeather, getLastWeekWeather, geocodeLocation } from './OpenWeatherAPI'

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

const App = () => {
  const [searchLocation, setSearchLocation] = useState<Location>({
    city: "",
    state: "",
    country: ""
  })
  const [displayLocation, setDisplayLocation] = useState<GeocodeData | null>(null)
  const [currentWeather, setCurrentWeather] = useState<OpenWeatherResponse | null>(null)
  const [lastWeekWeather, setLastWeekWeather] = useState<OpenWeatherResponseFeature[] | null>(null)
  const [tempUnits, setTempUnits] = useState<'C' | 'F'>('C')

  const getCurrentLocationCoords =  async (position: any) => {
    const reverseGeocodeResponse = await reverseGeocode(
      position.coords.latitude, position.coords.longitude, setDisplayLocation
    ).then((res) => res)
    getCurrentWeather(reverseGeocodeResponse, setCurrentWeather)
    getLastWeekWeather(reverseGeocodeResponse, setLastWeekWeather)
  }

  const getDefaultLocationWeather = async () => {
    const geocodeResponse = await geocodeLocation(
      {city: "Toronto", state: "Ontario", country: "Canada"}, setDisplayLocation
    ).then((res) => res)
    getCurrentWeather(geocodeResponse, setCurrentWeather)
    getLastWeekWeather(geocodeResponse, setLastWeekWeather)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCurrentLocationCoords,
        getDefaultLocationWeather
      )
    } else {
      getDefaultLocationWeather()
    }
  }, [])

  console.log("DISPLAY LOCATION", displayLocation)
  console.log("CURRENT WEATHER", currentWeather)
  console.log("LAST WEEK WEATHER", lastWeekWeather)

  return (
    <PageContainer>
      <ContentContainer>
        <CitySearch
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          setDisplayLocation={setDisplayLocation}
          setCurrentWeather={setCurrentWeather}
          setLastWeekWeather={setLastWeekWeather}
        />
        <WeatherDisplay
          displayLocation={displayLocation}
          currentWeather={currentWeather}
          lastWeekWeather={lastWeekWeather}
          tempUnits={tempUnits}
          setTempUnits={setTempUnits}
        />
      </ContentContainer>
    </PageContainer>
  )
}

export default App