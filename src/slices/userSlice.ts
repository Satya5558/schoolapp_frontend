import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticateSchool } from "../services/authService";
import { Credentials, User } from "../types/authTypes";

const initialState: User = {
  token: null,
  name: null,
  roles: null,
  status: null,
};

export const authSchool = createAsyncThunk(
  "auth/school",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await authenticateSchool(credentials);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserDetails: function (state, data) {
      const { token, user, roles } = data.payload;

      state.token = token;
      //state.user = user;
      state.roles = roles;
    },
    resetStatus: function (state) {
      state.status = null;
      state.message = null;
    },
    logout: function (state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authSchool.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(authSchool.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "success";
      state.message = "Logged in successfully";

      const data = action?.payload;
      if (data && data?.status === "success") {
        const { token, roles, schoolDetails } = data;

        state.token = token;
        state.roles = roles;
        state.name = schoolDetails?.name;
        // state = { ...state, ...schoolDetails, token, roles };
        //console.log(state);
      }
    });

    builder.addCase(authSchool.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.message = action.error.message;
      console.log(action.error.message);
    });
  },
});

//exporting actions
export const { setUserDetails, logout, resetStatus } = userSlice.actions;

//exporting reducer
export default userSlice.reducer;
