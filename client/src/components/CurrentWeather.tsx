import React from 'react'
import { OpenWeatherResponseFeature } from '../CustomTypes'
import { Stack, Typography } from '@mui/material'
import { convertKelvinToCelsius, convertKelvinToFahrenheit, getWeatherIconUrl } from '../utils'

interface CurrentWeatherProps {
    currentWeatherData: OpenWeatherResponseFeature
    tempUnits: 'C' | 'F'
}

const CurrentWeather = React.memo((props: CurrentWeatherProps) => {
    const { currentWeatherData, tempUnits } = props

    return (
        <Stack direction='row' justifyContent='space-between'>
            <Stack spacing={0}>
                <Stack direction='row' alignItems='center'>
                    <Typography variant='h2' fontWeight='fontWeightBold'>
                        {`${tempUnits === 'C'
                            ? convertKelvinToCelsius(currentWeatherData.temp)
                            : convertKelvinToFahrenheit(currentWeatherData.temp)
                        }°${tempUnits}`}
                    </Typography>
                    <img
                        src={getWeatherIconUrl(currentWeatherData.weather[0].icon)}
                        alt='weather icon'
                        width={100}
                        height={100}
                    />
                </Stack>
                <Typography variant='subtitle1' color='grey'>
                    {`Feels like: ${tempUnits === 'C'
                        ? convertKelvinToCelsius(currentWeatherData.feels_like)
                        : convertKelvinToFahrenheit(currentWeatherData.feels_like)
                    }°${tempUnits}`}
                </Typography>
                <Typography variant='subtitle1' color='grey' textTransform='capitalize'>
                    {`${currentWeatherData.weather[0].main} (${currentWeatherData.weather[0].description})`}
                </Typography>
            </Stack>
        </Stack>
    )
})

export default CurrentWeather