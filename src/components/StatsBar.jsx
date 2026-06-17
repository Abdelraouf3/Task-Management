import React from 'react'
import { useSelector } from 'react-redux'
import { selectStats } from '../redux/tasksSlice'

const StatsBar = () => {
    const { total, completed, completionRate, high, medium, low } = useSelector(selectStats)

    return (
        <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                Today's Overview metrics
            </h3>
            
            <div className="flex flex-col lg:flex-row items-stretch gap-6">
            
                <div className="grid flex-1 grid-cols-1 sm:grid-cols-3 gap-4">
            
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 font-semibold block">
                            Total Tasks
                        </span>
            
                        <span className="text-3xl font-extrabold text-blue-600">
                            {total}
                        </span>
                    </div>
            
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 font-semibold block">
                            Completed
                        </span>
            
                        <span className="text-3xl font-extrabold text-green-600">
                            {completed}
                        </span>
                    </div>
            
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 font-semibold block">
                            Completion Rate
                        </span>
            
                        <span className="text-3xl font-extrabold text-orange-500">
                            {completionRate}%
                        </span>
                    </div>
            
                </div>
            
                <div className="lg:w-45 lg:border-l lg:pl-6 border-gray-200 flex flex-col justify-center gap-3">
            
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        High: {high}
                    </span>
            
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        Medium: {medium}
                    </span>
            
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        Low: {low}
                    </span>
            
                </div>
            
            </div>
        
        </div>
    )
}

export default StatsBar