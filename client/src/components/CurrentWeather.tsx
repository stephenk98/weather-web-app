import React from 'react'
import { OpenWeatherResponseFeature } from '../CustomTypes'
import { Divider, Stack, Typography } from '@mui/material'
import { convertKelvinToCelsius, convertKelvinToFahrenheit, getWeatherIconUrl } from '../utils'

interface CurrentWeatherProps {
    currentWeatherData: OpenWeatherResponseFeature
    tempUnits: 'C' | 'F'
}

const CurrentWeather = React.memo((props: CurrentWeatherProps) => {
    const { currentWeatherData, tempUnits } = props

    return (
        <>
            <Typography variant='h5' fontWeight='fontWeightMedium'>Current Weather</Typography>
            <Stack direction='row' justifyContent='space-between'>
                <Stack>
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
                <Divider orientation='vertical' />
                <Stack spacing={0} justifyContent='flex-end' alignItems='flex-end'>
                    <Typography variant='subtitle1' fontWeight='fontWeightMedium'>
                        {`Humidity: ${currentWeatherData.humidity}%`}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight='fontWeightMedium'>
                        {`UV Index: ${currentWeatherData.uvi}`}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight='fontWeightMedium'>
                        {`Pressure: ${currentWeatherData.pressure} hPa`}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight='fontWeightMedium'>
                        {`Wind: ${currentWeatherData.wind_speed} m/s`}
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
})

export default CurrentWeather