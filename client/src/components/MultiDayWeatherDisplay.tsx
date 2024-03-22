import React from 'react'
import { OpenWeatherResponseFeature } from '../CustomTypes'
import { Box, Stack, Typography } from '@mui/material'
import { convertKelvinToCelsius, convertKelvinToFahrenheit, convertUnixToDate, getDayName, getWeatherIconUrl } from '../utils'

interface MultiDayWeatherProps {
    weatherData: OpenWeatherResponseFeature[],
    tempUnits: 'C' | 'F'
}

const MultiDayWeather = React.memo((props: MultiDayWeatherProps) => {
    const { weatherData, tempUnits } = props

    return (
        <>
        {weatherData.map((weather) => {
            const weatherDate = convertUnixToDate(weather.dt)
            return (
                <Box
                    key={weatherDate.toISOString()}
                    width='75px'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    sx={{
                        border: '0.5px solid lightgrey',
                        borderRadius: '1rem',
                        boxShadow: 1,
                        padding: '0.5rem',
                    }}
                >
                    <Stack alignItems='center' spacing={0}>
                        <Typography variant='h6' fontWeight='fontWeightMedium'>
                            {getDayName(weatherDate)}
                        </Typography>
                        <Typography variant='subtitle2' color='grey'>
                            {`${weatherDate.getMonth() + 1}/${weatherDate.getDate()}`}
                        </Typography>
                    </Stack>
                    <Typography variant='h5' fontWeight='fontWeightBold'>
                        {`${tempUnits === 'C'
                            ? convertKelvinToCelsius(weather.temp)
                            : convertKelvinToFahrenheit(weather.temp)
                        }°${tempUnits}`}
                    </Typography>
                    <img
                        src={getWeatherIconUrl(weather.weather[0].icon)}
                        alt='weather icon'
                        width={50}
                        height={50}
                    />
                    <Stack alignItems='center' spacing={0}>
                        <Typography variant='subtitle1' fontWeight='fontWeightMedium'>
                            {weather.weather[0].main}
                        </Typography>
                        <Typography variant='subtitle2' textTransform='capitalize' textAlign='center' color='grey'>
                            {weather.weather[0].description}
                        </Typography>
                    </Stack>
                </Box>
            )
        })}
        </>
    )
})

export default MultiDayWeather