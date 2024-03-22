import React from 'react'
import styled from 'styled-components'
import { Button, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { GeocodeData, Location, OpenWeatherResponse, OpenWeatherResponseFeature } from '../CustomTypes'
import { geocodeLocation, getCurrentWeather, getLastWeekWeather } from '../OpenWeatherAPI'

const SearchContainer = styled.div`
    display: grid;
    grid-template-columns: 80% 20%;
    grid-gap: 1rem;
`

const SearchInputContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
`

interface CitySearchProps {
    searchLocation: Location
    setSearchLocation: (location: Location) => void
    setDisplayLocation: (geocodeData: GeocodeData) => void
    setCurrentWeather: (weather: OpenWeatherResponse) => void
    setLastWeekWeather: (weather: OpenWeatherResponseFeature[]) => void
}

const CitySearch = React.memo((props: CitySearchProps) => {
    const { searchLocation, setSearchLocation, setDisplayLocation, setCurrentWeather, setLastWeekWeather } = props

    const handleSearch = async () => {
        const geocodeResponse = await geocodeLocation(
            searchLocation, setDisplayLocation
        ).then((res) => res)
        getCurrentWeather(geocodeResponse, setCurrentWeather)
        // getLastWeekWeather(geocodeResponse, setLastWeekWeather)
        setSearchLocation({
            city: "",
            state: "",
            country: ""
        })
    }

    return (
        <SearchContainer>
            <SearchInputContainer>
                <TextField
                    label='City'
                    value={searchLocation.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchLocation({ ...searchLocation, city: e.target.value })}
                    variant='outlined'
                />
                <TextField
                    label='State/Province'
                    value={searchLocation.state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchLocation({ ...searchLocation, state: e.target.value })}
                    variant='outlined'
                />
                <TextField
                    label='Country'
                    value={searchLocation.country}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchLocation({ ...searchLocation, country: e.target.value })}
                    variant='outlined'
                />
            </SearchInputContainer>
            <Button
                onClick={() => handleSearch()}
                variant='contained'
                disabled={
                    searchLocation.city === "" || searchLocation.state === "" || searchLocation.country === ""
                }
            >
                <Search />
                Search
            </Button>
        </SearchContainer>
    )
})

export default CitySearch