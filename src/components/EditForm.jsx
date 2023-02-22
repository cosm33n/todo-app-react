import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name)

  useEffect(() => {
    const closeModalIfEscaped = e => {
      e.key === 'Escape' && closeEditMode()
    }
    window.addEventListener('keydown', closeModalIfEscaped)

    return () => {
      window.removeEventListener('keydown', closeModalIfEscaped)
    }
  }, [closeEditMode])

  const handleFormSubmit = e => {
    e.preventDefault()
    updateTask({ ...editedTask, name: updatedTaskName })
    // console.log(e)
  }
  return (
    <div
      role='dialog'
      aria-labelledby='editTask'
      onClick={e => {
        console.log(e.target)
        console.log(e.currentTarget)

        e.target === e.currentTarget && closeEditMode()
      }}
    >
      <form className='todo' onSubmit={handleFormSubmit}>
        <div className='wrapper'>
          <input
            type='text'
            id='editTask'
            className='input'
            value={updatedTaskName}
            onChange={e => setUpdatedTaskName(e.target.value)}
            required
            autoFocus
            maxLength={40}
            placeholder='Update task'
          />
          <label htmlFor='editTask' className='label'>
            Update task
          </label>
        </div>
        <button
          className='btn'
          aria-label={`Confirm edited task to now read ${updatedTaskName}`}
          type='submit'
        >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  )
}
export default EditForm
