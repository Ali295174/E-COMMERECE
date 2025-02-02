import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./loginService.js";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (inputValues, thunkAPI) => {
    try {
      return await authServices.loginService(inputValues);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (situation) => {
    situation
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function

export default counterSlice.reducer;
