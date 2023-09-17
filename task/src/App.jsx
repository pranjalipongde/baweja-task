import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, Heading } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import {
  fetchTasks,
  addTask as addTaskApi,
  toggleTaskCompletion,
  deleteTask,
} from "./api/api";

function App() {
  const [apiTasks, setApiTasks] = useState([]); // Tasks fetched from the API
  const [localTasks, setLocalTasks] = useState([]); // Locally added tasks

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    const fetchTasksFromApi = async () => {
      try {
        const tasksFromApi = await fetchTasks();

        // Log the tasks received from the API
        console.log("Tasks from API:", tasksFromApi);

        // Set the API tasks state
        setApiTasks(tasksFromApi);
      } catch (error) {
        console.error("Error fetching tasks from the API:", error);
      }
    };

    fetchTasksFromApi();
  }, []);

  const addTaskToList = async (newTask) => {
    console.log("adding task:", newTask);

    try {
      // Make a separate call to add the task to the API
      const addedTask = await addTaskApi(newTask);

      // Log the task added to the API
      console.log("Task added to the API:", addedTask);

      // Update the local state with the added task
      setLocalTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (error) {
      console.error("Error adding task to the API:", error);
    }
  };

  // Combine API tasks and locally added tasks
  const combinedTasks = [...apiTasks, ...localTasks];

  // Function to toggle task completion
  const toggleTaskCompletionApp = async (taskId) => {
    try {
      // Check if the task is an API task or a local task
      const isApiTask = apiTasks.some((task) => task.id === taskId);
      const isLocalTask = localTasks.some((task) => task.id === taskId);

      if (isApiTask) {
        // Toggle the completion of an API task
        const updatedTask = await toggleTaskCompletion(taskId, apiTasks);
        setApiTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      } else if (isLocalTask) {
        // Toggle the completion of a local task
        const updatedTasks = localTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setLocalTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  // Function to delete a task
  const deleteTaskApp = async (taskId) => {
    try {
      // Check if the task is an API task or a local task
      const isApiTask = apiTasks.some((task) => task.id === taskId);
      const isLocalTask = localTasks.some((task) => task.id === taskId);

      if (isApiTask) {
        // Delete an API task
        await deleteTask(taskId);
        // Remove the deleted task from the API tasks
        setApiTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
      } else if (isLocalTask) {
        // Delete a local task
        const updatedTasks = localTasks.filter((task) => task.id !== taskId);
        setLocalTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ChakraProvider>
      <Box maxW="100vw" mx="auto" bg="#000" px="60px" py="20px">
        <Heading as="h1" size="xl" mb="4" color="#F2D8D8">
          Todo-List
        </Heading>
        <AddTodoForm addTaskToList={addTaskToList} />
        {/* Pass the combinedTasks and functions to the TodoList component */}
        <TodoList
          taskList={combinedTasks}
          toggleTaskCompletionProp={toggleTaskCompletionApp}
          deleteTaskProp={deleteTaskApp}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
