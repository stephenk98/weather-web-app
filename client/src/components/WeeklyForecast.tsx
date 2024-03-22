import React from 'react'
import { DailyForecast, OpenWeatherResponseFeature } from '../CustomTypes'
import { Button, Stack, Typography } from '@mui/material'
import { handleDisplayRawJSON } from '../utils'
import MultiDayWeatherDisplay from './MultiDayWeatherDisplay'

interface WeeklyForecastProps {
    weeklyForecastData: DailyForecast[]
    tempUnits: 'C' | 'F'
}

const WeeklyForecast = React.memo((props: WeeklyForecastProps) => {
    const { weeklyForecastData, tempUnits } = props

    // Cleaning step where the data is converted to the format that the MultiDayWeatherDisplay component expects
    const convertWeeklyForecastData = (weeklyForecastData: DailyForecast[]): OpenWeatherResponseFeature[] => {
        const cleanedData = weeklyForecastData.map(({moonrise, moonset, moon_phase, summary, pop, ...rest}) => {
            const cleanedDay = {
                ...rest,
                temp: rest.temp.day,
                feels_like: rest.feels_like.day,
            }
            return cleanedDay
        })
        // Omits the first day since it's the current day
        return cleanedData.slice(1)
    }

    return (
        <>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h5' fontWeight='fontWeightMedium'>7 Day Forecast</Typography>
                <Button onClick={() => handleDisplayRawJSON(weeklyForecastData)}>
                    View Raw JSON
                </Button>
            </Stack>
            <Stack direction='row' spacing='1rem' width='100%' justifyContent='space-evenly'>
                <MultiDayWeatherDisplay weatherData={convertWeeklyForecastData(weeklyForecastData)} tempUnits={tempUnits} />
            </Stack>
        </>
    )
})

export default WeeklyForecast