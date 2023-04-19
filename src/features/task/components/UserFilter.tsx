import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Users } from "../../../models/user";
import { userApi } from "../../../api/userApi";

export interface IUserFilterProps {
  selectedUser: (userId: string) => any;
}

export function UserFilter({ selectedUser }: IUserFilterProps) {
  const [user, setUser] = useState("");
  var [userList, setUserList] = useState<Users[]>([]);

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

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
    selectedUser(event.target.value as string);
  };

  return (
    <div className="user_filter">
      <p className="filter_title">User</p>

      <FormControl className="filter" fullWidth>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="Users"
          onChange={handleChange}
          className="filter_select"
        >
          {userList.map((user, key) => {
            return (
              <MenuItem key={key} value={user.id}>
                {user.name}{" "}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
