import React, { useState, useEffect } from "react";

function TodoList() {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [removedTasks, setRemovedTasks] = useState([]);

  // Récupérer les tâches du localStorage au montage du composant
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleNewTaskChange = (e) => setNewTask(e.target.value);

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask("");
    handleCloseModal();
  };

  const handleTaskRemove = async (taskIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, index) => index !== taskIndex);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setRemovedTasks((prevRemovedTasks) => {
      const taskToRemove = tasks[taskIndex];
      const updatedRemovedTasks = [...prevRemovedTasks, taskToRemove];
      localStorage.setItem("removedTasks", JSON.stringify(updatedRemovedTasks));
      return updatedRemovedTasks;
    });
  };

  return (
    <>
      <div className="container">
        <h1 className="mainTitle">To-Do</h1>
        <button className="submit" onClick={handleOpenModal}>
          + New Task
        </button>
        {showModal && (
          <div className="modalBackground" onClick={handleCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="close" onClick={handleCloseModal}>
                X
              </button>
              <form onSubmit={handleNewTaskSubmit}>
                <textarea
                  className="taskEdit"
                  placeholder="enter your new task :"
                  value={newTask}
                  onChange={handleNewTaskChange}
                />
                <button className="newtask" type="submit">
                  +
                </button>
              </form>
            </div>
          </div>
        )}
        <ul className="todoList">
          {tasks.map((task, index) => (
            <li key={index} className="taskItem">
              <input
                className="checkbox"
                type="checkbox"
                onChange={() => handleTaskRemove(index)}
              />
              {task}
            </li>
          ))}
          <hr />
          <ul className="removedTasks">
            {removedTasks.map((task, index) => (
              <li key={index} className="taskItemRemove">
                {task}
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </>
  );
}

export default TodoList;
