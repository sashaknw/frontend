const API_URL = "http://localhost:5005"; // Your backend port

export const getAllProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
