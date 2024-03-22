import React from 'react'
import { OpenWeatherResponse } from '../CustomTypes';

interface RawJSONDataDisplayProps {
    currentWeatherData: OpenWeatherResponse | null
}

const RawJSONDataDisplay = React.memo((props: RawJSONDataDisplayProps) => {
    const { currentWeatherData } = props

    return (
        <pre>
            {JSON.stringify(currentWeatherData, null, 2)}
        </pre>
    )
})

export default RawJSONDataDisplay