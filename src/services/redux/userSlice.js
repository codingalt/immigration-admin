import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isAuthenticated: false,
  applicationType: "",
  searchParams: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.data;
      state.isAuthenticated = true;
    },

    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setApplicationTypeToSlice: (state, action) => {
      state.applicationType = action.payload;
    },

    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
  },
});

export const {
  setUserData,
  logout,
  setApplicationTypeToSlice,
  setSearchParams
} = userSlice.actions;
export default userSlice.reducer;