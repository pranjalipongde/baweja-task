import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const AddTodoForm = ({ addTaskToList }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = async () => {
    if (taskTitle.trim() === "") return;

    const newTask = {
      title: taskTitle,
      completed: false,
    };

    try {
      // Make a separate call to add the task to the API
      const addedTask = await addTaskToList(newTask);

      // Clear the input field
      setTaskTitle("");
    } catch (error) {
      console.error("Error adding task to the API:", error);
    }
  };

  return (
    <Flex direction="row" mb="4" gap={4}>
      <Input
        type="text"
        placeholder="Add a new task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        mb="2"
        bg="white"
        border="none"
        width="40vw"
      />
      <Button colorScheme="blue" px="40px" onClick={handleAddTask}>
        Add
      </Button>
    </Flex>
  );
};

export default AddTodoForm;
