import axios from "axios";

const baseUrl = "https://tasklists.vercel.app/api";

export const getTasks = async () => {
  try {
    const tasks = await axios.get(baseUrl + "/tasks");
    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTask = async (formData) => {
  try {
    const task = {
      id: formData.id,
      title: formData.title,
      status: formData.status,
      priority: formData.priority,
      progress: formData.progress,
    };
    const saveTask = await axios.post(baseUrl + "/tasks", task);
    return saveTask;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTask = async (taskId, taskToUpdate) => {
  try {
    const updatedTask = await axios.put(
      `${baseUrl}/tasks/${taskId}`,
      taskToUpdate
    );
    return updatedTask;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTask = async (_id) => {
  try {
    const deletedTask = await axios.delete(`${baseUrl}/tasks/${_id}`);
    return deletedTask;
  } catch (error) {
    throw new Error(error);
  }
};
