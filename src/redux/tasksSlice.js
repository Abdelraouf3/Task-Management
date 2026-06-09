import { createSlice, nanoid } from '@reduxjs/toolkit'

const getTodayString = () => new Date().toISOString().split('T')[0]

const isCompletedForDate = (
    task,
    selectedDate
) => {
    return (
        task.completedDates?.includes(
            selectedDate
        ) || false
    )
}

const getWeekDay = (dateStr) => {
    const [year, month, day] = dateStr.split('-')
    return new Date(year, month - 1, day).getDay()
}

const getMonthDay = (dateStr) => {
    return Number(dateStr.split('-')[2])
}

const isVisibleForDate = (task, selectedDate) => {
    if (!task) return false

    if (task.pinned) return true

    if (task.repeat === 'daily')
        return true

    if (task.repeat === 'weekly') {
        return (
            getWeekDay(task.date) ===
            getWeekDay(selectedDate)
        )
    }

    if (task.repeat === 'monthly') {
        return (
            getMonthDay(task.date) ===
            getMonthDay(selectedDate)
        )
    }

    return task.date === selectedDate
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        filter: 'all', // Supports: 'all', 'high', 'medium', 'low', 'pinned', 'completed'
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
                        completedDates: [],
                        date: assignedDate,
                        pinned: false,
                        repeat: 'none', // Supported frequencies: 'none', 'daily', 'weekly', 'monthly'
                        order: new Date().getTime(),
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
            const task = state.tasks.find(
                (t) => t.id === action.payload
            )
        
            if (!task) return
        
            const currentDate = state.selectedDate
        
            const exists = task.completedDates?.includes(
                currentDate
            )
        
            if (exists) {
                task.completedDates =
                    task.completedDates.filter(
                        (d) => d !== currentDate
                    )
            } else {
                task.completedDates.push(currentDate)
            }
        },

        togglePinTask(state, action) {
            const task = state.tasks.find((t) => t.id === action.payload)
        
            if (task) {
                task.pinned = !task.pinned
            }
        },

        updateTaskRepeat(state, action) {
            const { id, repeat } = action.payload
            const task = state.tasks.find((t) => t.id === id)
        
            if (task) {
                task.repeat = repeat
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

        moveTaskUp(state, action) {
            const id = action.payload
        
            const visibleTasks = state.tasks
                .filter(
                    (t) =>
                        !isCompletedForDate(
    t,
    state.selectedDate
) &&
                        isVisibleForDate(
                            t,
                            state.selectedDate
                        )
                )
                .sort((a, b) => a.order - b.order)
        
            const index = visibleTasks.findIndex(
                (t) => t.id === id
            )
        
            if (index <= 0) return
        
            const currentTask = state.tasks.find(
                (t) => t.id === id
            )
        
            const targetTask = state.tasks.find(
                (t) => t.id === visibleTasks[index - 1].id
            )
        
            if (!currentTask || !targetTask) return
        
            const temp = currentTask.order
        
            currentTask.order = targetTask.order
            targetTask.order = temp
        },

        moveTaskDown(state, action) {
            const id = action.payload
        
            const visibleTasks = state.tasks
                .filter(
                    (t) =>
                        !isCompletedForDate(
    t,
    state.selectedDate
) &&
                        isVisibleForDate(
                            t,
                            state.selectedDate
                        )
                )
                .sort((a, b) => a.order - b.order)
        
            const index = visibleTasks.findIndex(
                (t) => t.id === id
            )
        
            if (
                index === -1 ||
                index >= visibleTasks.length - 1
            )
                return
        
            const currentTask = state.tasks.find(
                (t) => t.id === id
            )
        
            const targetTask = state.tasks.find(
                (t) => t.id === visibleTasks[index + 1].id
            )
        
            if (!currentTask || !targetTask) return
        
            const temp = currentTask.order
        
            currentTask.order = targetTask.order
            targetTask.order = temp
        },

        deleteCurrentDayTasks(state) {
            const activeDate = state.selectedDate
            state.tasks = state.tasks.filter(
                (t) =>
                    !(
                        t.date === activeDate &&
                        t.repeat === 'none'
                    )
            )
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

// Custom Selector splitting visible task arrays seamlessly into independent category blocks
export const selectTasksByCategories = (state) => {
    const { tasks, filter, selectedDate } = state.tasks

    let activeSet = tasks.filter((t) =>
        isVisibleForDate(t, selectedDate)
    )

    if (filter === 'pinned') {
        activeSet = activeSet.filter((t) => t.pinned)
    } else if (filter === 'completed') {
        activeSet = activeSet.filter((t) => isCompletedForDate(
    t,
    selectedDate
))
    } else if (filter !== 'all') {
        activeSet = activeSet.filter(
            (t) => t.priority === filter
        )
    }

    const sorted = [...activeSet].sort(
        (a, b) => a.order - b.order
    )

    return {
        pinnedTasks: sorted.filter(
            (t) =>
                t.pinned &&
                !isCompletedForDate(
                    t,
                    selectedDate
                )
        ),
        datedTasks: sorted.filter(
            (t) =>
                !t.pinned &&
                !isCompletedForDate(
                    t,
                    selectedDate
                )
        ),
        completedTasks: sorted.filter(
            (t) =>
                isCompletedForDate(
                    t,
                    selectedDate
                )
        ),
    }
}

// Scoped metric builder targeting the visible calendar domain exclusively
export const selectStats = (state) => {
    const { tasks, selectedDate } = state.tasks
    const activeDayTasks = tasks.filter( (t) => isVisibleForDate(t, selectedDate) )

    const total = activeDayTasks.length
    const completed = activeDayTasks.filter( (t) => isCompletedForDate(t, selectedDate) ).length
    const completionRate = total ? Math.round((completed / total) * 100) : 0

    return {
        total,
        completed,
        completionRate,
        high: activeDayTasks.filter((t) => t.priority === 'high' && !isCompletedForDate(
    t,
    selectedDate
)).length,
        medium: activeDayTasks.filter((t) => t.priority === 'medium' && !isCompletedForDate(
    t,
    selectedDate
)).length,
        low: activeDayTasks.filter((t) => t.priority === 'low' && !isCompletedForDate(
    t,
    selectedDate
)).length,
    }
}

export default tasksSlice.reducer