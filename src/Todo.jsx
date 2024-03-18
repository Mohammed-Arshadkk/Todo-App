import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todo = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const AddButton = async () => {  
    try { 
    const response = await axios.post('http://localhost:3000/sendMessage',{input}) 
        setTodos([...todos,response.data])
    } catch (error) {
        console.log(error);
    } 
  }

  useEffect (() => {
    const storedTodos = localStorage.getItem('Todos');
    if(storedTodos) {
        setTodos(JSON.parse(storedTodos))
    }
  },[])

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])


  return (
    <div className={`bg-${darkMode ? 'gray-800' : 'gray-100'} h-screen text-${darkMode ? 'white' : 'black'}`}>
      <div className={`flex items-center justify-between px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <h1 className="font-bold text-4xl">Todo App</h1>
        <button
          className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className={` ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} flex flex-col items-center justify-start h-full px-4 py-8`}>

        <div className="w-full flex items-center justify-center space-x-4 mb-4">
          <input
            type="text"
            className={`px-4 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
            placeholder="Add your item"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={AddButton}
            className={`px-4 py-2 rounded-md ${darkMode ? 'bg-green-500' : 'bg-green-400'}`}
          >
            Add
          </button>
        </div>

        <div className="flex justify-around gap-3 pt-10 w-full">
          <div className={`w-1/3 rounded-md p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <h1 className="font-bold text-3xl text-center">Todo</h1>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
            </ul>
          </div>
          <div className={`w-1/3 rounded-md p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <h1 className="font-bold text-3xl text-center">On Progress</h1>
          </div>
          <div className={`w-1/3 rounded-md p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <h1 className="font-bold text-3xl text-center">On Set</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
