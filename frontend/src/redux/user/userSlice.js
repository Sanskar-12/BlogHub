import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProfileSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    deleteProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess:(state)=>{
      state.loading=false;
      state.currentUser=null;
      state.error=null
    },
    signOutFail:(state,action)=>{
      state.loading=false;
      state.error=action.payload
    }
  },
});

export const {
  signInFail,
  signInStart,
  signInSuccess,
  updateProfileFail,
  updateProfileStart,
  updateProfileSuccess,
  deleteProfileFail,
  deleteProfileSuccess,
  deleteProfileStart,
  signOutSuccess,
  signOutFail
} = userSlice.actions;

export default userSlice.reducer;
