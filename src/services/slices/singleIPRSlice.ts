import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIprById = createAsyncThunk(
  'iprs/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/iprs/${id}/`);
      return response.data;
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateIprById = createAsyncThunk(
  'iprs/updateById',
  async ({ id, data }: { id: string, data: { title: string; status: string; description?: string; start_date?: string; end_date?: string; }}, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/iprs/${id}/`, data);
      return response.data;
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const singleIPRSlice = createSlice({
  name: 'singleIpr',
  initialState: {
    currentIpr: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
extraReducers: (builder) => {
  builder
    .addCase(fetchIprById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchIprById.fulfilled, (state, action) => {
      state.currentIpr = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchIprById.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.loading = false;
    })
    .addCase(updateIprById.fulfilled, (state, action) => {
      state.currentIpr = action.payload;
      state.error = null;
    })
    .addCase(updateIprById.rejected, (state, action) => {
      state.error = action.payload as string | null;
    });
  }
});

export default singleIPRSlice.reducer;
