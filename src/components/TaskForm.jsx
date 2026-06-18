import { faWpforms } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, selectSelectedDate } from '../redux/tasksSlice'

const TaskForm = () => {
    const dispatch = useDispatch()
    const activeDate = useSelector(selectSelectedDate)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
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
                targetDate,
                description.trim(),
            )
        )
        setTitle('')
        setPriority('low')
        setDescription('')
    }

    return (
        <div className="w-full max-w-4xl">
            <div className="border border-gray-300 rounded-lg h-full w-full bg-white shadow-sm">
                <div className="py-2 px-5 border-b border-gray-300">
                    <FontAwesomeIcon icon={faWpforms} className='text-[20px] text-cyan-500 mr-2' />
                    <h3 className="inline text-[18px] text-transparent bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text font-bold capitalize ">
                        task form
                    </h3>
                </div>
            
                <form onSubmit={handleSubmit} className="p-4 sm:p-5">
                    <div className="input w-full sm:flex-1">
                        <label htmlFor="taskName" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Task Description</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What needs to be done?"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500"
                            />
                    </div>

                    <div className="w-full sm:flex-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                            Description (Optional)
                        </label>
                    
                        <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Add description..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500 resize-none"
                    />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-3"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm