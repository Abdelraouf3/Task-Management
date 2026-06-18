import { faListCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCurrentDayTasks, deleteAllTasks, selectTasksByCategories, selectSelectedDate } from '../redux/tasksSlice'
import FilterBar from './FilterBar'
import TaskItem from './TaskItem'

const TaskList = () => {
    const dispatch = useDispatch()
    const activeDate = useSelector(selectSelectedDate)
    const { pinnedTasks, recurringTasks, datedTasks, completedTasks } = useSelector(selectTasksByCategories)

    const handleDeleteDay = () => {
        if (window.confirm('Are you sure you want to clear tasks recorded for this specific day?')) {
            dispatch(deleteCurrentDayTasks())
        }
    }

    const handleDeleteEverything = () => {
        if (window.confirm('CRITICAL WARNING: This will permanently wipe out ALL historical and pinned tasks across every calendar day. Proceed?')) {
            dispatch(deleteAllTasks())
        }
    }

    const formatSectionHeader = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const totalVisible = pinnedTasks.length + datedTasks.length + completedTasks.length + recurringTasks.length

    return (
        <div className="w-full max-w-4xl">
            <div className="border border-gray-300 rounded-lg h-full w-full bg-white shadow-sm">
                <div className="py-2 px-3 sm:px-5 border-b border-gray-300 flex items-center justify-between flex-wrap gap-2">
                    <div>
                        <FontAwesomeIcon icon={faListCheck} className='text-[18px] sm:text-[20px] text-cyan-500 mr-2' />
                        <h3 className="inline text-[16px] sm:text-[18px] text-transparent bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text font-bold capitalize">
                            task list
                        </h3>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDeleteDay}
                            className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold text-orange-500 border border-orange-200 px-2.5 py-1 rounded-lg hover:bg-orange-50 transition-colors duration-200 cursor-pointer"
                        >
                            Delete Today
                        </button>
                        <button
                            onClick={handleDeleteEverything}
                            className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold text-red-400 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                            <span>Delete Everything</span>
                        </button>
                    </div>
                </div>

                <FilterBar />

                {totalVisible === 0 ? (
                    <p className="text-center text-gray-400 text-[14px] py-10">
                        No tasks found matching current filters. Add one above!
                    </p>
                ) : (
                    <div className="pt-2 pb-2 px-1">
                            {/* 📌 Loop 1: Pinned Tasks Only */}
                        {pinnedTasks.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1">
                                    📌 Pinned Tasks
                                </h4>
                                {pinnedTasks.map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))}
                            </div>
                        )}
                    
                        {/* 🔄 Loop 2: Recurring Tasks Only */}
                        {recurringTasks.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1">
                                    🔄 Recurring Tasks
                                </h4>
                                {recurringTasks.map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))}
                            </div>
                        )}

                        {/* Section 2: Active Dated Tasks */}
                        {datedTasks.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1">
                                    📝 {formatSectionHeader(activeDate)} Tasks
                                </h4>
                                {datedTasks.map(task => <TaskItem key={task.id} task={task} />)}
                            </div>
                        )}

                        {/* Section 3: Completed Tasks Group */}
                        {completedTasks.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider px-3 mb-1.5 flex items-center gap-1">
                                    ✅ Completed
                                </h4>
                                {completedTasks.map(task => <TaskItem key={task.id} task={task} />)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskList