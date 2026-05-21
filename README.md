# ✅ Task Manager — React & Redux

A clean, responsive task management application built with React and Redux Toolkit. Designed to help you organize, prioritize, and track your tasks efficiently — with instant filtering, inline editing, persistent storage, and a live stats dashboard. Built as part of a technical assessment for a Frontend Developer role.

---

## ✨ Features

### 📋 Task Management

- Add tasks with a title and priority level (High, Medium, Low).
- Edit any task inline — update the title or change the priority without leaving the page.
- Delete individual tasks or clear everything with the **Delete All** button.
- Toggle task completion with a checkbox — completed tasks are visually struck through.

### 🔍 Filtering

- Filter your task list by priority: **All**, **High**, **Medium**, or **Low**.
- Filter state is managed globally via Redux for consistency across the app.

### 📊 Stats Dashboard

- **Total Tasks** — live count of all tasks with a completed breakdown.
- **Completion Rate** — percentage of completed tasks with an animated progress bar.
- **By Priority** — real-time count of High, Medium, and Low priority tasks.

### 💾 Persistence

- All tasks and filter state are saved to `localStorage` automatically after every action via a custom Redux middleware.
- Data is rehydrated on page load as `preloadedState` — your tasks survive refreshes and browser restarts.

### 🎨 Design

- Clean, minimal UI with a cyan-to-blue gradient accent throughout.
- Fully responsive — stacked single-column layout on mobile, side-by-side on tablet and desktop.
- Smooth color transitions and hover states on all interactive elements.
- Priority badges color-coded: 🔴 High · 🟡 Medium · 🟢 Low.

---

## 🛠 Tech Stack

- **React 18** with functional components and hooks (`useState`, `useSelector`, `useDispatch`)
- **Redux Toolkit** — `createSlice`, `configureStore`, `nanoid`
- **React Redux** — `Provider`, `useSelector`, `useDispatch`
- **Tailwind CSS** — utility-first responsive styling
- **Font Awesome** — icons for actions and UI elements
- **localStorage** — custom middleware for state persistence

---

## 📁 Project Structure

```
react-task-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── StatsBar.jsx        # Live stats dashboard (total, completion, priority counts)
│   │   ├── FilterBar.jsx       # Priority filter buttons connected to Redux
│   │   ├── TaskForm.jsx        # Add task form — dispatches addTask to Redux
│   │   ├── TaskList.jsx        # Reads filtered tasks from Redux, renders TaskItem list
│   │   └── TaskItem.jsx        # Single task row — toggle, edit, delete all via Redux
│   ├── redux/
│   │   ├── store.js                    # Configures store, loads preloadedState from localStorage
│   │   ├── tasksSlice.js               # All actions, reducers, and selectors
│   │   └── localStorageMiddleware.js   # Auto-saves state after every dispatch
│   ├── App.jsx                 # Root layout — composes all components
│   └── index.jsx               # Entry point — wraps App in Redux <Provider>
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdelrouaf/react-task-manager.git

# Navigate to the project folder
cd react-task-manager

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔄 Redux Data Flow

```
User Action (click / submit)
        ↓
Component dispatches an action
  (addTask / editTask / deleteTask / toggleTask / setFilter / deleteAllTasks)
        ↓
tasksSlice reducer updates state
        ↓
localStorageMiddleware saves state to localStorage
        ↓
useSelector re-renders subscribed components
```

## 🌙 Live Demo

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌙_Live_Demo-Visit_Site-d4a574?style=for-the-badge&labelColor=1a1a2e)](https://task-management-list-six.vercel.app/)

### 👉 [**Task Management**](https://task-management-list-six.vercel.app/)

</div>
