import { createSlice, nanoid } from '@reduxjs/toolkit'

const getTodayString = () => new Date().toISOString().split('T')[0]

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        filter: 'all', // Can be: 'all', 'high', 'medium', 'low', 'pinned', 'completed'
        selectedDate: getTodayString(),
    },
    reducers: {
        addTask: {
            reducer(state, action) {
                state.tasks.push(action.payload)
            },
            prepare(title, priority, assignedDate) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        priority,
                        completed: false,
                        date: assignedDate,
                        pinned: false,
                        repeat: 'none', // 'none', 'daily', 'weekly', 'monthly'
                        order: state.tasks.length, 
                        createdAt: new Date().toISOString(),
                    },
                }
            },
        },

        editTask(state, action) {
            const { id, title, priority } = action.payload
            const task = state.tasks.find((t) => t.id === id)
            if (task) {
                task.title = title
                task.priority = priority
            }
        },

        deleteTask(state, action) {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload)
        },

        toggleTask(state, action) {
            const task = state.tasks.find((t) => t.id === action.payload)
            if (task) {
                task.completed = !task.completed
            }
        },

        togglePinTask(state, action) {
            const task = state.tasks.find((t) => t.id === action.payload)
            if (task) {
                task.pinned = !task.pinned
                // If pinned, also switch to daily as default recurring type
                task.repeat = task.pinned ? 'daily' : 'none'
            }
        },

        updateTaskRepeat(state, action) {
            const { id, repeat } = action.payload
            const task = state.tasks.find((t) => t.id === id)
            if (task) {
                task.repeat = repeat
                task.pinned = repeat !== 'none'
            }
        },

        setFilter(state, action) {
            state.filter = action.payload
        },

        setSelectedDate(state, action) {
            state.selectedDate = action.payload
        },

        previousDay(state) {
            const current = new Date(state.selectedDate)
            current.setDate(current.getDate() - 1)
            state.selectedDate = current.toISOString().split('T')[0]
        },

        nextDay(state) {
            const current = new Date(state.selectedDate)
            current.setDate(current.getDate() + 1)
            state.selectedDate = current.toISOString().split('T')[0]
        },

        // Arrow sorting logic: working inside active display boundaries
        moveTaskUp(state, action) {
            const id = action.payload
            const activeDate = state.selectedDate
            
            // Re-create the visible, uncompleted array matching today's view context
            const visibleTasks = state.tasks
                .filter(t => !t.completed && (t.date === activeDate || t.pinned))
                .sort((a, b) => a.order - b.order)

            const index = visibleTasks.findIndex(t => t.id === id)
            if (index > 0) {
                const currentTask = state.tasks.find(t => t.id === id)
                const targetTask = state.tasks.find(t => t.id === visibleTasks[index - 1].id)
                
                if (currentTask && targetTask) {
                    const tempOrder = currentTask.order
                    currentTask.order = targetTask.order
                    targetTask.order = tempOrder
                }
            }
        },

        moveTaskDown(state, action) {
            const id = action.payload
            const activeDate = state.selectedDate

            const visibleTasks = state.tasks
                .filter(t => !t.completed && (t.date === activeDate || t.pinned))
                .sort((a, b) => a.order - b.order)

            const index = visibleTasks.findIndex(t => t.id === id)
            if (index !== -1 && index < visibleTasks.length - 1) {
                const currentTask = state.tasks.find(t => t.id === id)
                const targetTask = state.tasks.find(t => t.id === visibleTasks[index + 1].id)

                if (currentTask && targetTask) {
                    const tempOrder = currentTask.order
                    currentTask.order = targetTask.order
                    targetTask.order = tempOrder
                }
            }
        },

        deleteCurrentDayTasks(state) {
            const activeDate = state.selectedDate
            state.tasks = state.tasks.filter((t) => t.date !== activeDate || t.pinned)
        },

        deleteAllTasks(state) {
            state.tasks = []
        },
    },
})

export const {
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    togglePinTask,
    updateTaskRepeat,
    setFilter,
    setSelectedDate,
    previousDay,
    nextDay,
    moveTaskUp,
    moveTaskDown,
    deleteCurrentDayTasks,
    deleteAllTasks
} = tasksSlice.actions

export const selectFilter = (state) => state.tasks.filter
export const selectSelectedDate = (state) => state.tasks.selectedDate

// Custom Selector to separate structural layout items cleanly
export const selectTasksByCategories = (state) => {
    const { tasks, filter, selectedDate } = state.tasks

    // Filter baseline matching active date OR pinned rules
    let activeSet = tasks.filter((t) => t.date === selectedDate || t.pinned)

    // Apply FilterBar criteria safely
    if (filter === 'pinned') {
        activeSet = activeSet.filter(t => t.pinned)
    } else if (filter === 'completed') {
        activeSet = activeSet.filter(t => t.completed)
    } else if (filter !== 'all') {
        activeSet = activeSet.filter(t => t.priority === filter)
    }

    const sorted = [...activeSet].sort((a, b) => a.order - b.order)

    return {
        pinnedTasks: sorted.filter(t => t.pinned && !t.completed),
        datedTasks: sorted.filter(t => !t.pinned && !t.completed),
        completedTasks: sorted.filter(t => t.completed)
    }
}

// Scoped Stats Engine matching exactly what you asked for
export const selectStats = (state) => {
    const { tasks, selectedDate } = state.tasks
    const activeDayTasks = tasks.filter((t) => t.date === selectedDate || t.pinned)

    const total = activeDayTasks.length
    const completed = activeDayTasks.filter((t) => t.completed).length
    const completionRate = total ? Math.round((completed / total) * 100) : 0

    return {
        total,
        completed,
        completionRate,
        high: activeDayTasks.filter((t) => t.priority === 'high' && !t.completed).length,
        medium: activeDayTasks.filter((t) => t.priority === 'medium' && !t.completed).length,
        low: activeDayTasks.filter((t) => t.priority === 'low' && !t.completed).length,
    }
}

export default tasksSlice.reducer