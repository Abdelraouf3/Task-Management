import React from 'react'
import { useSelector } from 'react-redux'
import { selectStats } from '../redux/tasksSlice'

const StatsBar = () => {
    const { total, completed, completionRate, high, medium, low } = useSelector(selectStats)

    return (
        <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg p-4 shadow-sm my-2">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                Today's Overview metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs text-gray-500 font-semibold">Total Tasks</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-blue-600">{total}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs text-gray-500 font-semibold">Completed</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-green-600">{completed}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 col-span-2 sm:col-span-1 flex items-center justify-between sm:flex-col sm:items-start sm:justify-between">
                    <span className="text-xs text-gray-500 font-semibold">Completion Rate</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-orange-500">{completionRate}%</span>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-[12px] font-bold text-gray-500 flex-wrap">
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-red-400 rounded-full inline-block"></span>
                    High: {high}
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full inline-block"></span>
                    Medium: {medium}
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full inline-block"></span>
                    Low: {low}
                </span>
            </div>
        </div>
    )
}

export default StatsBar