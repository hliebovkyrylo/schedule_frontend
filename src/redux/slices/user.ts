import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

// Define the authentication state structure
interface AuthState {
  data: any; 
  status: string;
}

// Initialize initial authentication state
const initialState: AuthState = {
  data: null, // Initially there is no authentication data
  status: "loading", // Initial status is set to "loading"
};

// Create an asynchronous thunk to get user data
export const fetchUser = createAsyncThunk('auth/fetchAuthMe', async (userId: any) => { // We get user data by his id
  const response = await axios.get(`/auth/me/${userId}`); // Route for getting user info
  return response.data;
});

// Create an asynchronous thunk to upload image
export const uploadImage = createAsyncThunk('/upload', async (image: any) => {
  const { data } = await axios.post("/image/upload", image); // Route for upload image
  return data;
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling pending, fulfilled and rejected events for various asynchronous thunks
    builder
      // Get user info
      .addCase(fetchUser.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      // Upload image
      .addCase(uploadImage.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(uploadImage.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

// Export the reducer and action creator
export const authReducer = authSlice.reducer;