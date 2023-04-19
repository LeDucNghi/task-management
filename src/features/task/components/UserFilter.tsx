import * as React from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Users } from "../../../models/user";

export interface IUserFilterProps {
  userList: Users[];
  selectedUser: (userId: string) => any;
}

export function UserFilter({ userList, selectedUser }: IUserFilterProps) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    selectedUser(event.target.value as string);
  };
  return (
    <div className="user_filter">
      <p className="filter_title">User</p>

      <FormControl className="filter" fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
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
