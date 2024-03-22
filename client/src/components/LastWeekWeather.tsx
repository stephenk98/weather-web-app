import React from 'react'
import { OpenWeatherResponseFeature } from '../CustomTypes'
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Download } from '@mui/icons-material'
import { cleanHistoricalDataForDownload, getHistoricalDataCSVName, handleDisplayRawJSON } from '../utils'
import { CSVLink } from 'react-csv'
import MultiDayWeather from './MultiDayWeatherDisplay'

interface LastWeekWeatherProps {
    lastWeekWeatherData: OpenWeatherResponseFeature[]
    tempUnits: 'C' | 'F'
    location: string
}

const LastWeekWeather = React.memo((props: LastWeekWeatherProps) => {
    const { lastWeekWeatherData, tempUnits, location } = props

    return (
        <>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h5' fontWeight='fontWeightMedium'>Last 7 Days</Typography>
                <Stack direction='row' justifyContent='center'>
                    <Button onClick={() => handleDisplayRawJSON(lastWeekWeatherData)}>
                        View Raw JSON
                    </Button>
                    <CSVLink
                        data={cleanHistoricalDataForDownload(lastWeekWeatherData, tempUnits)}
                        filename={getHistoricalDataCSVName(lastWeekWeatherData, location)}
                        target='_blank'
                    >
                        <IconButton aria-label='download' color='primary'>
                            <Download />
                        </IconButton>
                    </CSVLink>
                </Stack>
            </Stack>
            <Stack direction='row' spacing='1rem' width='100%' justifyContent='space-evenly'>
                <MultiDayWeather weatherData={lastWeekWeatherData} tempUnits={tempUnits} />
            </Stack>
        </>
    )
})

export default LastWeekWeather