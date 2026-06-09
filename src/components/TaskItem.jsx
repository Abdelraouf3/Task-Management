import { faCheck, faClose, faPen, faTrashCan, faArrowUp, faArrowDown, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTask, editTask, deleteTask, togglePinTask, updateTaskRepeat, moveTaskUp, moveTaskDown, selectSelectedDate } from '../redux/tasksSlice'

const TaskItem = ({ task }) => {
    const dispatch = useDispatch()

    const selectedDate = useSelector(
        selectSelectedDate
    )

    const [isEdited, setIsEdited] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editPriority, setEditPriority] = useState(task.priority)

    const handleSave = () => {
        const trimmed = editTitle.trim()
        if (!trimmed) return
        dispatch(editTask({ id: task.id, title: trimmed, priority: editPriority }))
        setIsEdited(false)
    }

    const handleCancel = () => {
        setEditTitle(task.title)
        setEditPriority(task.priority)
        setIsEdited(false)
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 p-3 mx-1 sm:mx-2 mb-2 border border-transparent transition-colors duration-200 hover:border-gray-300 rounded-lg bg-gray-50/50">
            {!isEdited ? (
                <>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <input
                            type="checkbox"
                            checked={task.completedDates?.includes(selectedDate)}
                            onChange={() => dispatch(toggleTask(task.id))}
                            className="cursor-pointer"
                        />
                        <div className="min-w-0 flex-1 pl-1">
                            <h3 className={`text-[15px] sm:text-[16px] font-bold text-gray-700 break-words ${task.completedDates?.includes(selectedDate) ? 'line-through text-gray-400 font-semibold' : ''}`}>
                                {task.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className={`border border-gray-300 font-bold text-[11px] uppercase px-2 py-0.5 rounded ${task.priority === 'high' && 'bg-red-100 text-red-600'} ${task.priority === 'medium' && 'bg-yellow-100 text-yellow-600'} ${task.priority === 'low' && 'bg-green-100 text-green-600'}`}>
                                    {task.priority}
                                </span>
                                {task.repeat !== 'none' && (
                                    <span className="text-[11px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded font-semibold capitalize">
                                        ♻ {task.repeat}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-auto">
                        {!task.completedDates?.includes(selectedDate) && (
                            <>
                                <button title="Move Up" className="cursor-pointer p-1 text-gray-400 hover:text-gray-700" onClick={() => dispatch(moveTaskUp(task.id))}>
                                    <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                                </button>
                                <button title="Move Down" className="cursor-pointer p-1 text-gray-400 hover:text-gray-700" onClick={() => dispatch(moveTaskDown(task.id))}>
                                    <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
                                </button>
                            </>
                        )}
                        
                        <button title="Pin Everyday" className="cursor-pointer p-1" onClick={() => dispatch(togglePinTask(task.id))}>
                            <FontAwesomeIcon icon={faThumbtack} className={`${task.pinned ? 'text-orange-500 scale-110' : 'text-gray-300 hover:text-gray-500'}`} />
                        </button>

                        {!task.completedDates?.includes(selectedDate) && (
                            <select 
                                value={task.repeat} 
                                onChange={(e) => dispatch(updateTaskRepeat({ id: task.id, repeat: e.target.value }))}
                                className="text-[11px] border border-gray-300 rounded px-1 py-0.5 bg-white text-gray-600 font-medium focus:outline-none cursor-pointer"
                            >
                                <option value="none">No Repeat</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        )}

                        <button className='cursor-pointer p-1' onClick={() => setIsEdited(true)}>
                            <FontAwesomeIcon icon={faPen} className='text-cyan-600 text-sm' />
                        </button>
                        <button className='cursor-pointer p-1' onClick={() => dispatch(deleteTask(task.id))}>
                            <FontAwesomeIcon icon={faTrashCan} className='text-red-400 text-sm' />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
                        <input
                            type="text"
                            className='block w-full border-2 border-gray-400 rounded-lg py-1.5 px-3 mt-2 focus:outline-none transition-colors duration-200 focus:border-blue-900'
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <select
                            className='border-2 w-full sm:w-auto border-gray-400 rounded-lg py-1.5 px-3 mt-2 focus:outline-none transition-colors duration-200 focus:border-blue-900'
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-2 self-end sm:self-auto mt-1 sm:mt-0">
                        <button className='cursor-pointer p-1' onClick={handleSave}>
                            <FontAwesomeIcon icon={faCheck} className='text-green-600' />
                        </button>
                        <button className='cursor-pointer p-1' onClick={handleCancel}>
                            <FontAwesomeIcon icon={faClose} className='text-red-600' />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default TaskItem