import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About"
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    console.log(data);
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, );
    const data = await res.json();

    console.log(data);
    return data;
  };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data= await res.json();
    setTasks([...tasks,data]);
    // console.log(task);
    // const id = Math.floor(Math.random()*10000)+1;
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    console.log("delete", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const tasktoToggle = await fetchTask(id)
    const updTask = {...tasktoToggle, reminder: !tasktoToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    console.log("toggle", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
    const index = tasks.findIndex((task) => task.id === id);
    console.log(id, tasks[index].reminder, "reminder toggled");
  };

  return (
    <Router>
    <div className="App">
      <Header
        title={12333}
        onAddPressed={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      
      <Routes>
        <Route path = '/' exact element = {(
        <>
          {showAddTask ? <AddTask onAdd={addTask} /> : ""}
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            ></Tasks>
          ) : (
            "No tasks to show"
          )}
        </>)}/>
        <Route path ='/about' element={<About/>}/> 
      </Routes>
      <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
