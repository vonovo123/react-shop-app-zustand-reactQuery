import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : {
      email: "",
      token: "",
      id: "",
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, token, id } = action.payload;
      state.email = email;
      state.token = token;
      state.id = id;
      localStorage.setItem("user", JSON.stringify(state));
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = "";
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
