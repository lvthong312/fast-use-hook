import dayjs, { Dayjs, type ManipulateType } from 'dayjs'
import { useState } from 'react'
import { useInterval } from './useInterval'

export const useCountDownTimeReach = (targetTime: Dayjs, {
    timeNumber = 10,
    unit = 'minutes'
}: {
    timeNumber: number
    unit: ManipulateType
}) => {
    const [isCompleted, setIsCompleted] = useState(false)
    useInterval(() => {
        const now = dayjs().add(timeNumber, unit)
        if (now.isAfter(targetTime)) {
            setIsCompleted(true)
        }
    }, {
        delay: 1000,
        stop: isCompleted
    })
    return {
        setIsCompleted,
        isCompleted
    }
}

