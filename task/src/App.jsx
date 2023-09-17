import { Box, ChakraProvider, Heading, List } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useEffect, useState } from "react";
import { fetchTasks, addTask as addTaskApi } from "./api/api";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Retrieve tasks from local storage on component mount
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTaskToList = (newTask) => {
    console.log("adding task:", newTask);

    // Update the state immediately with the new task
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Save the updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    // You can choose whether or not to make an API call here
    // If you want to add it to the API, you can call addTaskApi(newTask) here
    // and handle any errors accordingly
  };

  return (
    <ChakraProvider>
      <Box maxW="100vw" mx="auto" bg="#000" px="60px" py="20px">
        <Heading as="h1" size="xl" mb="4" color="#F2D8D8">
          Todo-List
        </Heading>
        <AddTodoForm addTaskToList={addTaskToList} />
        <List>
          <TodoList tasks={tasks} deleteTask={deleteTask} />
        </List>
      </Box>
    </ChakraProvider>
  );
}

export default App;
