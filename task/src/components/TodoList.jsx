import React, { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
//imported fetchTasks function
import { fetchTasks, addTask as addTaskApi } from "../api/api";

const TodoList = ({ taskList, toggleTaskCompletionProp, deleteTaskProp }) => {
  //initializing the tasks state

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTasks();
        console.log("Tasks from API:", tasks); // Add this line
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks from the API:", error);
      }
    };
    getTasks();
  }, []);

  //func to add a new task to the tasks array
  const addTask = async (newTask) => {
    try {
      const addedTask = await addTaskApi(newTask);
      // Instead of appending to the existing tasks array, create a new array with the added task
      setTasks((prevTasks) => [...prevTasks, addedTask]);
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
        {taskList.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletionProp}
            deleteTask={deleteTaskProp}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default TodoList;
