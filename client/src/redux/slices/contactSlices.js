import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitContactForm = createAsyncThunk(
  'contact/submitContactForm',
  async (formData) => {
    const response = await axios.post('http://localhost:5000/contact', formData);
    return response.data;
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle',
    message: '',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = 'loading';
        state.message = '';
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
