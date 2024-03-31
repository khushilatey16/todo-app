import React, { useEffect, useState } from 'react';
import './Home.css';
import addIcon from "./add-button.png";
import TaskCard from '../../Components/TaskCard/TaskCard';


function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [category,setCategory] = useState('');

const saveTasksToLS = (tasksToSave) =>{
  localStorage.setItem('tasks',JSON.stringify(tasksToSave));
}

const validateNewTask = () => {
  if (newTask === '') {

    setError('Please enter a task');
    return false;

  } else if (newTask.length < 5) {

    setError('Task should be at least 5 characters long');
    return false;

  } else {

    setError('');
    return true

  }

}

const addTask = () => {
  const validationResult = validateNewTask();
  if (!validationResult) return;

  const newTaskObj = {
    title: newTask,
    category: category,
  };

  const newTasks = [newTaskObj, ...tasks];
  saveTasksToLS(newTasks);
  setTasks(newTasks);
  setNewTask(''); // Clear the input after adding task
};



const deleteTask = (index) => {
  const newTask = tasks;
  newTask.splice(index,1);
  setTasks([...newTask]);
  saveTasksToLS(newTask);



}



  useEffect(()=>{
    const tasks = localStorage.getItem('tasks');
    if(tasks){
      setTasks(JSON.parse(tasks));
    }
  },[])


  
  
  return (
    <div className='app-heading'>
      <h1>ToDo App </h1>

      <div className='task-container'>
        {tasks.map((task, i) => {
          const {title,category} = task;
          return(<TaskCard 
            title={title} 
            category={category}
            key={i} 
            delFunction={deleteTask}
            index={i}
            />)
      })
      }
      </div>
      
      {error && <p className='error-msg'>{error}</p>}

      <div className='input-container'>
        <input
          className='task-input'
          type='text'
          placeholder='Add your task'
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />

<select 
  value={category} onChange={(e) =>
  { setCategory(e.target.value)  }}
  className='category'>

  <option value={'category'}>Category</option>
  <option value={'college'}>College</option>
  <option value={'shopping'}>Shopping</option>
  <option value={'aim'}>AIM</option>
  <option value={'hobby'}>Hobby</option>
</select>







        {/* Add onClick event handler to the button */}
        <img
          className='add-task-btn'
          src={addIcon}
          alt='add'
          type='button'
          onClick={addTask} // Call addTask function when the button is clicked
        />
      </div>
    </div>
  );
}

export default Home;
