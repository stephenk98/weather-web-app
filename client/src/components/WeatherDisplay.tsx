import React from 'react'
import { GeocodeData, OpenWeatherResponse, OpenWeatherResponseFeature } from '../CustomTypes'
import { Box, Button, CircularProgress, Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import styled from 'styled-components'
import CurrentWeather from './CurrentWeather'
import LastWeekWeather from './LastWeekWeather'
import { handleDisplayRawJSON } from '../utils'

const WeatherDisplayContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
`

interface WeatherDisplayProps {
    displayLocation: GeocodeData | null
    currentWeather: OpenWeatherResponse | null
    lastWeekWeather: OpenWeatherResponseFeature[] | null
    tempUnits: 'C' | 'F'
    setTempUnits: (tempUnits: 'C' | 'F') => void
}

const WeatherDisplay = React.memo((props: WeatherDisplayProps) => {
    const { displayLocation, currentWeather, lastWeekWeather, tempUnits, setTempUnits } = props

    return (
        <Box
            width='100%'
            display='flex'
            justifyContent='center'
            sx={{
                border: '0.5px solid lightgrey',
                borderRadius: '1rem',
                boxShadow: 1,
                padding: '0.5rem',
            }}
        >
            {displayLocation && currentWeather && lastWeekWeather
                ?  <WeatherDisplayContent>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Stack>
                                <Typography variant='h4' fontWeight='fontWeightBold'>
                                    {displayLocation.name}, {displayLocation.state}, {displayLocation.country}
                                </Typography>
                                <Typography variant='subtitle2' color='gray'>
                                    {`${displayLocation.lat}, ${displayLocation.lon}`}
                                </Typography>
                            </Stack>
                            <Stack direction='row' spacing='1rem' alignItems='center'>
                                <ToggleButtonGroup
                                    color='primary'
                                    value={tempUnits}
                                    exclusive
                                    onChange={(e, value) => setTempUnits(value)}
                                    sx={{height: '35px'}}
                                >
                                    <ToggleButton value='C'>°C</ToggleButton>
                                    <ToggleButton value='F'>°F</ToggleButton>
                                </ToggleButtonGroup>
                                <Button color='primary' onClick={() => handleDisplayRawJSON(currentWeather)}>
                                    View Raw JSON
                                </Button>
                            </Stack>
                        </Stack>
                        <Divider sx={{ marginY: '1rem' }} />
                        <CurrentWeather
                            currentWeatherData={currentWeather.current}
                            tempUnits={tempUnits}
                        />
                        <Divider sx={{ marginY: '1rem' }} />
                        <LastWeekWeather
                            lastWeekWeatherData={lastWeekWeather}
                            tempUnits={tempUnits}
                            location={`${displayLocation.name}${displayLocation.state}${displayLocation.country}`}
                        />
                </WeatherDisplayContent>
                : <CircularProgress sx={{ marginY: '1rem' }} />
            }
        </Box>
    )
})

export default WeatherDisplay