import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import { localStorageMiddleware } from './localStorageMiddleware'

const loadState = () => {
    try {
        const serialized = localStorage.getItem('tasks-state')
        if (!serialized) return undefined
        
        const parsedData = JSON.parse(serialized)
        
        const rawTasks = Array.isArray(parsedData.tasks) ? parsedData.tasks : []
        
        const migratedTasks = rawTasks.map((task, idx) => ({
            id: task.id,
            title: task.title,
            priority: task.priority || 'low',
        
            completedDates:
                task.completedDates ||
                (task.completed
                    ? [task.date]
                    : []),
        
            date: task.date || new Date().toISOString().split('T')[0],
            pinned: task.pinned || false,
            repeat: task.repeat || 'none',
        
            repeatStartDate:
                task.repeatStartDate ||
                task.date ||
                new Date().toISOString().split('T')[0],
        
            order: task.order !== undefined ? task.order : idx,
            createdAt: task.createdAt || new Date().toISOString()
        }))

        return {
            tasks: {
                tasks: migratedTasks,
                filter: parsedData.filter || 'all',
                selectedDate: new Date().toISOString().split('T')[0]
            }
        }
    } catch (e) {
        console.warn('Could not load state from localStorage:', e)
        return undefined
    }
}

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store