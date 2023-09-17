import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import React from "react";

const TodoItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  return (
    <Box
      bg="white"
      p="6"
      mb="2"
      width="100%"
      borderRadius="md"
      boxShadow="md"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex alignItems="center" width="100%" gap={2}>
        <Checkbox
          isChecked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          mr="2"
        />
        <Text
          textDecoration={task.completed ? "line-through" : "none"}
          fontSize="lg"
          flex="1"
          whiteSpace="nowrap" // Ensure text doesn't wrap to next line
          overflow="hidden" // Hide text overflow
          textOverflow="ellipsis" // Show ellipsis (...) for long text
        >
          {task.title}
        </Text>
        <Button colorScheme="red" size="sm" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoItem;
