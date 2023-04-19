import { Tasks } from "../models/task";
import { Users } from "../models/user";
import axiosClient from "./axiosClient";

export const userApi = {
  getAllUser(): Promise<Users[]> {
    const url = "/users";
    return axiosClient.get(url);
  },

  getUserTask(userId: string): Promise<Tasks[]> {
    const url = `/users/${userId}/todos`;
    return axiosClient.get(url);
  },
};
