import { useState } from 'react'
import './App.css'
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import useLocalStorage from './hooks/useLocalStorage'

import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', [])

  const [previousFocusEl, setPreviousFocusEl] = useState()

  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const addTask = task => setTasks(p => [task, ...p])

  const deleteTask = id => {
    setTasks(p => p.filter(t => t.id !== id))
  }

  const toggleTask = id => {
    setTasks(p => p.map(t => (t.id === id ? { ...t, checked: !t.checked } : t)))
  }
  const updateTask = task => {
    setTasks(p =>
      p.map(t => (t.id === task.id ? { ...t, name: task.name } : t))
    )
    closeEditMode()
    // TODO: close edit mode
  }

  const closeEditMode = () => {
    setIsEditing(false)
    // todo prev state focus
    previousFocusEl.focus()
  }

  const enterEditMode = task => {
    setEditedTask(task)
    setIsEditing(true)

    // TODO: set focus back to original
    setPreviousFocusEl(document.activeElement)
  }

  return (
    <div className='container'>
      <header>
        <h1>My Task List</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  )
}

export default App
