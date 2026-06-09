import { faWpforms } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, selectSelectedDate } from '../redux/tasksSlice'

const TaskForm = () => {
    const dispatch = useDispatch()
    const activeDate = useSelector(selectSelectedDate)
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('low')

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = title.trim()
        if (!trimmed) return
        
        const targetDate = activeDate || new Date().toISOString().split('T')[0]
        
        dispatch(
            addTask(
                trimmed,
                priority,
                targetDate
            )
        )
        setTitle('')
        setPriority('low')
    }

    return (
        <div className="w-full max-w-2xl my-2">
            <div className="border border-gray-500 rounded-lg h-full w-full bg-white shadow-sm">
                <div className="py-2 px-5 border-b border-gray-300">
                    <FontAwesomeIcon icon={faWpforms} className='text-[20px] text-cyan-500 mr-2' />
                    <h3 className="inline text-[18px] text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text font-bold capitalize ">
                        task form
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 p-4 sm:p-5 flex-wrap">
                    <div className="input w-full sm:flex-1">
                        <label htmlFor="taskName" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Task Description</label>
                        <input
                            type="text"
                            className='block w-full border-2 border-gray-400 rounded-lg py-1.5 px-3 mt-2 focus:outline-none transition-colors duration-200 focus:border-blue-900'
                            placeholder='Enter your description...'
                            id="taskName"
                            name='taskName'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="priority w-full sm:w-auto">
                        <label htmlFor="priority" className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Priority</label>
                        <select
                            className='border-2 w-full sm:w-auto border-gray-400 rounded-lg py-1.5 px-3 mt-2 focus:outline-none transition-colors duration-200 focus:border-blue-900'
                            name="priority"
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <button
                        className='bg-orange-500 text-white font-bold w-full sm:w-auto py-2 px-5 rounded cursor-pointer sm:mt-7 transition-colors duration-200 hover:bg-blue-700 h-[42px]'
                        type="submit"
                    >
                        Add task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskForm