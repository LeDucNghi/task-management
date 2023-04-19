import axiosClient from "./axiosClient";

export const tasksApi = {
  updateTask(taskId: string, completed: boolean): Promise<any> {
    const url = `/todos/${taskId}`;
    return axiosClient.patch(url, { completed });
  },
};
