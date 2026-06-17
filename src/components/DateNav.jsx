import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { previousDay, nextDay, selectSelectedDate } from '../redux/tasksSlice'

const DateNav = () => {
    const dispatch = useDispatch()
    const selectedDateStr = useSelector(selectSelectedDate)

    const formatDisplayDate = (dateStr) => {
        const dateObj = new Date(dateStr)
        const todayStr = new Date().toISOString().split('T')[0]
        if (dateStr === todayStr) return 'Today'

        return dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getDayDifference = (dateStr) => {
        const today = new Date()
        today.setHours(0,0,0,0)
    
        const selected = new Date(dateStr)
        selected.setHours(0,0,0,0)
    
        const diffTime = selected - today
    
        return Math.round(diffTime / (1000 * 60 * 60 * 24))
    }

    const dayDiff = getDayDifference(selectedDateStr)

    return (
        <div className="w-full max-w-2xl flex items-center justify-between bg-white border border-gray-300 rounded-lg p-3 shadow-sm my-2">
            <button 
                onClick={() => dispatch(previousDay())}
                className="text-xs sm:text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors cursor-pointer select-none"
            >
                ◀ Yesterday
            </button>

            <div className="text-center">
            
                <span className="text-xs sm:text-sm font-extrabold text-gray-700 bg-gray-100 px-4 py-1 rounded-md border border-gray-200">
                    {formatDisplayDate(selectedDateStr)}
                </span>
            
                {dayDiff !== 0 && (
                    <span className="text-[11px] text-gray-500 mt-1 block">
                        {dayDiff > 0
                            ? `${dayDiff} day${dayDiff > 1 ? 's' : ''} ahead`
                            : `${Math.abs(dayDiff)} day${Math.abs(dayDiff) > 1 ? 's' : ''} ago`}
                    </span>
                )}
            
            </div>

            <button 
                onClick={() => dispatch(nextDay())}
                className="text-xs sm:text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors cursor-pointer select-none"
            >
                Tomorrow ▶
            </button>
        </div>
    )
}

export default DateNav