import { useEffect, useState } from "react";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CircularProgress from "@mui/material/CircularProgress";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoadingButton from "@mui/lab/LoadingButton";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { Tasks } from "../../../models";
import { tasksApi } from "../../../api/taskApi";
import { userApi } from "../../../api/userApi";

export interface ITasksListProps {
  selectedUser: string;
}

export function TasksList({ selectedUser }: ITasksListProps) {
  var [userTasks, setUserTasks] = useState<Tasks[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [taskDone, setTaskDone] = useState<Tasks[]>([]);

  useEffect(() => {
    getUserTasks();
  }, [selectedUser]);

  const getUserTasks = async () => {
    if (!selectedUser) return;
    let timer;

    setIsFetching(true);
    try {
      const res = await userApi.getUserTask(selectedUser);

      if (res) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          userTasks = res;

          const tasksSort = userTasks.sort(
            (a, b) => Number(a.completed) - Number(b.completed)
          );

          setUserTasks(tasksSort);

          setIsFetching(false);
        }, 1000);

        const doneTaskList = res.filter((tasks) => tasks.completed === true);
        setTaskDone(doneTaskList);
      }
    } catch (error) {
      console.log("🚀 ~ file: Task.tsx:41 ~ getUserTask ~ error:", error);
    }
  };

  const handleMarkDone = async (taskId: string) => {
    const newTasks = userTasks.map((tasks) => {
      if (tasks.id === taskId) {
        return { ...tasks, isMarkDone: true };
      }
      return tasks;
    });

    setUserTasks(newTasks);

    try {
      const res = await tasksApi.updateTask(taskId, true);
      if (res) {
        const newTasks = userTasks.map((tasks) => {
          if (tasks.id === taskId) {
            return { ...tasks, isMarkDone: false, completed: true };
          }
          return tasks;
        });

        const completedTaskList = newTasks.filter(
          (tasks) => tasks.completed === true
        );

        const tasksSort = newTasks.sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        );

        setUserTasks(tasksSort);
        setTaskDone(completedTaskList);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: TaskList.tsx:66 ~ handleMarkDone ~ error:",
        error
      );
    }
  };

  return (
    <div className="task_list">
      <p className="tasklist_title">Tasks</p>

      <List className="task_list_container">
        {isFetching ? (
          <div className="task_list_waiting">
            <CircularProgress />
          </div>
        ) : userTasks.length === 0 ? (
          <div className="task_list_empty">
            <p>No Data</p>
          </div>
        ) : (
          userTasks.map((tasks, key) => {
            return (
              <ListItem key={key} disablePadding className="task_list_item">
                <ListItemIcon className="items_icon">
                  {tasks.completed ? (
                    <TaskAltOutlinedIcon
                      className="icon"
                      color="success"
                      fontSize="small"
                    />
                  ) : (
                    <IndeterminateCheckBoxOutlinedIcon
                      className="icon"
                      color="warning"
                      fontSize="small"
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  className="items_content"
                  primary={`${tasks.title}`}
                  secondary={
                    tasks.completed ? null : (
                      <LoadingButton
                        className="items_content_button"
                        loading={tasks.isMarkDone}
                        loadingPosition="start"
                        variant="outlined"
                        onClick={() => handleMarkDone(tasks.id!)}
                        startIcon={
                          <AssignmentTurnedInIcon
                            className="button_icon"
                            color="success"
                          />
                        }
                      >
                        Mark done
                      </LoadingButton>
                    )
                  }
                />
              </ListItem>
            );
          })
        )}
      </List>

      <div className="task_list_done">Done {taskDone.length}/20 tasks.</div>
    </div>
  );
}
