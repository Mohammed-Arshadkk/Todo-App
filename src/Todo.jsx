import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [onProgress, setonProgress] = useState([])
  const [set,onSet] = useState([])
  const [input, setInput] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  const AddButton = async () => {
    try {
      const response = await axios.post("http://localhost:3000/sendMessage", {
        input,
      });
      const newToDo = response.data.newTodo;
      console.log(newToDo);
      setTodos([...todos, newToDo]);
      console.log(todos);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDeletion = async (title) =>{
    console.log( 'title aaan mwoneee',title);
    const updatedTodo = todos.filter((todo) => todo.title !== title);
    console.log(updatedTodo)
    setTodos(updatedTodo);
  }

  const handleDeletion2  = async (value) =>{
    console.log('arshad oru friend aano',value);
    const updatedTodo = onProgress.filter((todo) => todo !== value);
    console.log('updatedtodo', updatedTodo);
    setonProgress(updatedTodo)
    console.log(onProgress);
    }

  const moveOnProgress = async (title) => {
    if(title){
       handleDeletion(title)
      setonProgress((set) => [...set, title])
    }
  }

  const moveOnSet = async (value) => {
    if(value){
      handleDeletion2(value);
      onSet((ars) => [...ars, value])
    }
  }

  const BackMoveOnTodo = (title) => {
    console.log(title)
    if(title) {
      const updatedProgress = onProgress.filter((progress ) => progress !== title)
      setonProgress(updatedProgress)
      setTodos([...todos, { title : title}])
    }
  };

  const BackMoveOnProgress = async (value) => {
    if(value){
      const updatedSet = set.filter((item)=> item !== value)
      onSet(updatedSet)
      setonProgress([...onProgress,value]);
      
      }
  }

  return (
    <div
      className={`bg-${darkMode ? "gray-800" : "gray-100"} h-screen text-${
        darkMode ? "white" : "black"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <h1 className="font-bold text-4xl">Todo App</h1>
        <button
          className={`px-4 py-2 rounded-md ${
            darkMode ? "bg-gray-600" : "bg-gray-300"
          }`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div
        className={` ${
          darkMode ? "bg-gray-600" : "bg-gray-300"
        } flex flex-col items-center justify-start h-full px-4 py-8`}
      >
        <div className="w-full flex items-center justify-center space-x-4 mb-4">
          <input
            type="text"
            className={`px-4 py-2 border rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            }`}
            placeholder="Add your item"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={AddButton}
            className={`px-4 py-2 rounded-md ${
              darkMode ? "bg-green-500" : "bg-green-400"
            }`}
          >
            Add
          </button>
        </div>

        <div className="flex justify-around gap-3 pt-10 w-full">
          <div
            className={`w-1/3 rounded-md p-4 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <h1 className="font-bold text-3xl text-center pb-5">Todo</h1>
            {todos &&
              todos.map((todo, index) => (
                <div className="text-white w-full font-semibold flex justify-between rounded-md p-1 mb-2 text-center py-2 bg-gray-600 hover:scale-105" key={index}>
                  <p >{todo.title}</p>
                  <button onClick={()=> {moveOnProgress(todo.title)}} className="w-[20%]">⏩</button>
                </div>
              ))}
          </div>
          <div
            className={`w-1/3 rounded-md p-4 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <h1 className="font-bold text-3xl text-center pb-5">On Progress</h1>
            {
              onProgress && onProgress.map((value,index)=> (
                <div className="text-white w-full font-semibold flex justify-between rounded-md p-1  mb-2 text-center py-2 bg-gray-600 hover:scale-105" key={index}>
                  <button onClick={()=> {BackMoveOnTodo(value)}} className="w-[20%]">⏮</button>
                  <p >{value}</p>
                  <button onClick={()=> {moveOnSet(value)}} className="w-[20%]">⏩</button>
                </div>
              ))
            }
          </div>
          <div
            className={`w-1/3 rounded-md p-4 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <h1 className="font-bold text-3xl text-center pb-5">On Set</h1>
            {
              set && set.map((arshad,index)=> (
                <div className="text-white w-full font-semibold flex justify-between rounded-md p-1  mb-2 text-center py-2 bg-gray-600 hover:scale-105" key={index}>
                  <button onClick={()=> {BackMoveOnProgress(arshad)}} className="w-[20%]">⏮</button>
                  <p >{arshad}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
