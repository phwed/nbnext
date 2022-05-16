import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",
  user: null,
  username: null,
  loginLoading: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: INITIAL_STATE,
  reducers: {
    // set current user
    setUser: (state, action) => {
      state.ACTION_TYPE = setUser.toString();
      state.user = action.payload;
    },

    // set current username
    setUsername: (state, action) => {
      state.ACTION_TYPE = setUsername.toString();
      state.username = action.payload;
    },

    // clear current user
    clearUser: (state) => {
      state.ACTION_TYPE = clearUser.toString();
      state.user = null;
      state.username = null;
    },

    clearUsername: (state) => {
      state.ACTION_TYPE = clearUsername.toString();
      state.username = null;
    },

    // set login loading
    setLoginLoading: (state, action) => {
      state.ACTION_TYPE = setLoginLoading.toString();
      state.loginLoading = action.payload;
    },

    resetActionType: (state) => {
      state.ACTION_TYPE = resetActionType.toString();
    },
  },
});

export const {
  resetActionType,
  setUser,
  setUsername,
  clearUser,
  clearUsername,
  setLoginLoading,
} = authSlice.actions;

export default authSlice.reducer;
