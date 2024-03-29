import { Todo } from './types/Todo'
  
    interface TodoItemProps {
        todo: Todo
        onDelete: (id: string) => void
        onCompleted: (id: string) => void

    }
  
  function TodoItem({ todo, onDelete, onCompleted }: TodoItemProps) {

    const handleDelete = () => {
      onDelete(todo.id)
    }
  
    const handleComplete = () => {
      console.log('Complete todo')
      onCompleted(todo.id)
    }
  
    return (
      <li>
        <input type='checkbox' onChange={handleComplete} />
        <span>{todo.text}</span>
        <button onClick={handleDelete}>Delete</button>
      </li>
    )
  }

  export default TodoItem