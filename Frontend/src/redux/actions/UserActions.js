import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const signup = createAsyncThunk('user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const resData = await response.json();

      if (!response.ok) {
        // When the response status is not OK, you can use the response data to provide a more detailed error message.
        const error = resData?.error || response.statusText;
        throw new Error(Array.isArray(error) ? error[0].msg : error);
      }

      return resData.data;
    } catch (error) {
      console.log('Error while signing up: ', error.message);
      return rejectWithValue(error.message);
    }
  });

export const login = createAsyncThunk('user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const resData = await response.json();

      if (!response.ok) {
        // When the response status is not OK, you can use the response data to provide a more detailed error message.
        const error = resData?.error || response.statusText;
        throw new Error(Array.isArray(error) ? error[0].msg : error);
      }

      return resData.data;
    } catch (error) {
      console.log('Error while login: ', error.message);
      return rejectWithValue(error.message);
    }
  });
