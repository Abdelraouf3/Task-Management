import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import { localStorageMiddleware } from './localStorageMiddleware'

const loadState = () => {
    try {
        const serialized = localStorage.getItem('tasks-state')
        if (!serialized) return undefined
        return { tasks: JSON.parse(serialized) }
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