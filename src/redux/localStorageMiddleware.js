    export const localStorageMiddleware = (store) => (next) => (action) => {
        const result = next(action)
        try {
            const state = store.getState().tasks
            localStorage.setItem('tasks-state', JSON.stringify(state))
        } catch (e) {
            console.warn('Could not save to localStorage:', e)
        }
        return result
    }
