import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useApi from './useApi'; // Import your useApi hook

// Create async thunk action using createAsyncThunk
export const fetchDataAsync = createAsyncThunk(
  'data/fetchData',
  async (options, thunkAPI) => {
    try {
      const { method, endpoint, payload, headers } = options;
      const api = useApi(); // Initialize useApi hook
      const response = await api.fetchData(method, endpoint, payload, headers);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create slice
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
