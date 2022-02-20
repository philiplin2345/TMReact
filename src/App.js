import { useState, useEffect } from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const[tasks,setTasks] = useState([  ]  )

  useEffect(()=>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])


  const fetchTasks= async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    console.log(data);
    return data;
  }

  const addTask = (task) => {
    console.log(task);
    const id = Math.floor(Math.random()*10000)+1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);

  }

  const deleteTask = async (id) => {
    await fetch( `http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
    console.log('delete',id);
    setTasks(tasks.filter(task=> task.id !==id))
  }

  const toggleReminder = (id) =>{
    console.log('toggle',id);
    setTasks(tasks.map(task=>task.id === id ? {...task, reminder:!task.reminder}:task));
    const index = tasks.findIndex(task=>task.id === id)
    console.log(id, tasks[index].reminder,'reminder toggled')

  }
  
  return (
    <div className="App">
      <Header title={12333} onAddPressed = {()=>setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
      {showAddTask?<AddTask onAdd = {addTask}/>:''}
      {tasks.length>0?(
        <Tasks tasks = {tasks} onDelete={deleteTask} onToggle = {toggleReminder} ></Tasks>
      ):'No tasks to show'}
      
    </div>
  );
}

export default App;
