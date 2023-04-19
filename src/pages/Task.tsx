import "./Task.scss";

import { useEffect, useState } from "react";

import { Paper } from "@mui/material";
import { TasksList } from "../features/task/components/TaskList";
import { UserFilter } from "../features/task/components/UserFilter";
import { Users } from "../models";
import { userApi } from "../api/userApi";

export interface ITaskProps {}

export function Task(props: ITaskProps) {
  var [userList, setUserList] = useState<Users[]>([]);
  var [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      const res = await userApi.getAllUser();

      userList = await res;

      await setUserList(userList);
    } catch (error) {
      console.log("🚀 ~ file: Task.tsx:29 ~ fetchAllUser ~ error:", error);
    }
  };

  const handleChange = (userId: string) => {
    selectedUser = userId;

    setSelectedUser(selectedUser);
  };

  return (
    <Paper className="task" elevation={12}>
      <div className="task_container">
        <UserFilter userList={userList} selectedUser={handleChange} />

        <TasksList selectedUser={`${selectedUser}`} />
      </div>
    </Paper>
  );
}
