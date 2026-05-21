import './App.css'
import StatsBar from './components/StatsBar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {

  return (

    <div className='flex-center flex-col min-h-screen w-full bg-slate-50 p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 md:gap-8'>

      <div className="text-center mb-2">

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">

          <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-blue-600">
            Task Management
          </span>

        </h1>

        <div className="h-1.5 w-20 bg-linear-to-r from-cyan-500 to-blue-600 mx-auto mt-4 rounded-full"></div>

      </div>

      <div className="w-full flex flex-col items-center gap-6">

        {/* Stats dashboard at the top */}
        <StatsBar />

        <TaskForm />

        <TaskList />

      </div>

    </div>

  )

}

export default App
