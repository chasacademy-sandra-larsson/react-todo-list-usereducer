import  { useState, useReducer } from 'react'
import { Todo } from './types/Todo'
import TodoItem from './TodoItem'
import { v4 as uuid } from 'uuid'

// Initial state
const initialTodos: Todo[] = [];


interface TodosAction {
  type: string
  payload: Todo | string
}


//Reducerfunktionen för todos
function todoReducer(todos: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...todos.todos, action.payload as Todo] 
    case 'UPDATE_TODO':
      return todos.map((todo: Todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    case 'DELETE_TODO':
      return todos.filter((todo: Todo) => todo.id !== action.payload) }
    default:
      throw new Error('Invalid action type');
  }
}

 function TodoList() {

  // useReducer tar två argument, reducerfunktionen och initial state, och returnerar nuvarande state todos och dispatchfunktionen
 const [todos, dispatch] = useReducer(todoReducer, initialTodos)

  const [input, setInput] = useState<string>('')

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input) {
      return
    }

    // Add todo - Create a new todo object
    const newTodo: Todo = {
      id: uuid(),
      text: input,
      completed: false,
    }
 
    // Skicka vilken actions som ska ske samt  newTodo till reducerfunktionen
    dispatch({ type: 'ADD_TODO', payload: newTodo })

    // Clear the input
    setInput('')

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInput(text)
  }


  const onCompleted = (id: string) => {

  // Skicka vilken actions som ska ske samt  id till reducerfunktionen
   dispatch({ type: 'UPDATE_TODO', payload: id }) 
     
  }

  const onDelete = (id: string) => {

      // Skicka vilken actions som ska ske samt  id till reducerfunktionen
    dispatch({ type: 'DELETE_TODO', payload: id }) 
    
  }

    return (
      <div className='flex flex-col'>
        <h1>Todolist</h1>
        <form onSubmit={handleSumbit}>
          <input
            type='text'
            placeholder='Add a task'
            value={input}
            onChange={handleChange}
          />
          <button
            type='submit'
            className='w-full py-4 text-xl text-center text-white transition-colors duration-300 bg-green-400 rounded-full hover:bg-green-500 ease px-9 md:w-auto'
          >
            Add
          </button>
        </form>
        <ul>
          {/* todos är nuvarande state, men som gått via dispatch och reducerfunktionen*/}
          {todos.map((todo: Todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onCompleted={onCompleted}
              />
            )
          })}
        </ul>
      </div>
    )
  }



export default TodoList