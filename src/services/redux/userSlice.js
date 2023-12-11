import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isAuthenticated: false,
  applicationType: "",
  searchParams: null,
  count: null,
  notificationId: null,
  isRead: null,
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
    setNotiCount: (state, action) => {
      state.count = action.payload;
    },
    setNotificationId: (state, action) => {
      state.count = action.payload;
    },
    setIsRead: (state, action) => {
      state.isRead = action.payload;
    },
  },
});

export const {
  setUserData,
  logout,
  setApplicationTypeToSlice,
  setSearchParams,
  setNotiCount,
  setNotificationId,
  setIsRead,
} = userSlice.actions;
export default userSlice.reducer;