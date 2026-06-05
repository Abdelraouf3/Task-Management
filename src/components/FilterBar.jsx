import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, selectFilter } from '../redux/tasksSlice'

const filters = [
    { label: 'All', value: 'all' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
    { label: 'Pinned', value: 'pinned' },
    { label: 'Completed', value: 'completed' },
]

const FilterBar = () => {
    const dispatch = useDispatch()
    const currentFilter = useSelector(selectFilter)

    return (
        <div className="flex items-center gap-2 px-3 sm:px-5 py-3 border-b border-gray-200 flex-wrap">
            <span className="text-[13px] text-gray-500 font-semibold mr-1">Filter:</span>
            {filters.map(({ label, value }) => (
                <button
                    key={value}
                    onClick={() => dispatch(setFilter(value))}
                    className={`text-[13px] font-bold px-3 py-1 rounded-full border transition-colors duration-200 cursor-pointer ${
                        currentFilter === value
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent'
                            : 'bg-white text-gray-500 border-gray-300 hover:border-blue-400 hover:text-blue-500'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}

export default FilterBar