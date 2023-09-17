const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

//fetch all tasks

export const fetchTasks = async () => {
  const response = await fetch(BASE_URL);
  const tasks = await response.json();
  return tasks;
};

//add a new task
export const addTask = async (newTask) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const addedTask = await response.json();
    console.log("Task added successfully:", addedTask);
    return addedTask;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error; // Re-throw the error for further handling in your app
  }
};

//update a task (mark as complete)
// export const updateTask = async (taskId, updatedTask) => {
//   const response = await fetch(`${BASE_URL}/${taskId}`, {
//     method: "PUT",
//     headers: {
//       "Content-type": "application/json;",
//     },
//     body: JSON.stringify(updatedTask),
//   });
//   const updated = await response.json();
//   return updated;
// };
export const toggleTaskCompletion = async (taskId, completed) => {
  try {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json;",
      },
      body: JSON.stringify({ completed }),
    });
    const updated = await response.json();
    return updated;
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};

//delete a task
export const deleteTask = async (taskId) => {
  await fetch(`${BASE_URL}/${taskId}`, {
    method: "DELETE",
  });
};
