import React, { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
//imported fetchTasks function
import { fetchTasks, addTask as addTaskApi } from "../api/api";

const TodoList = () => {
  //initializing the tasks state
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    getTasks();
  }, []);

  //func to add a new task to the tasks array
  const addTask = async (newTask) => {
    // setTasks([...tasks, newTask]);
    // Send the new task to the API
    try {
      const addedTask = await addTaskApi(newTask);
      setTasks([...tasks, addedTask]); // Update the state with the new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  //func to checkmark a task as complete
  const toggleTaskCompletion = (taskId) => {
    const updateTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updateTasks);
  };

  //func to delete the task
  const deleteTask = (taskId) => {
    const updateTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updateTasks);
  };

  return (
    <Box maxW="100vw" mx="auto">
      <Grid templateColumns="repeat(3, minmax(200px, 1fr))" gap={3}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default TodoList;
