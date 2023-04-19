import "./Task.scss";

import { Paper } from "@mui/material";
import { TasksList } from "../features/task/components/TaskList";
import { UserFilter } from "../features/task/components/UserFilter";
import { useState } from "react";

export interface ITaskProps {}

export function Task(props: ITaskProps) {
  var [selectedUser, setSelectedUser] = useState<string>("");

  const handleChange = (userId: string) => {
    selectedUser = userId;

    setSelectedUser(selectedUser);
  };

  return (
    <Paper className="task" elevation={12}>
      <div className="task_container">
        <UserFilter selectedUser={handleChange} />

        <TasksList selectedUser={`${selectedUser}`} />
      </div>
    </Paper>
  );
}
