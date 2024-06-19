import { createSlice } from "@reduxjs/toolkit";
import { getFolloweesImages } from "../actions/ImageAction";

const initialState = {
  images: [],
  page: 0,
  status: 'idle', // idle | pending | failed | completed | pending_next
  error: null
}

const followeesImageSlice = createSlice({
  name: 'followeesImages',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFolloweesImages.pending, (state) => {
      state.status = state.page ? 'pending_next' : 'pending'
      state.error = null
    })
    builder.addCase(getFolloweesImages.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(getFolloweesImages.fulfilled, (state, action) => {
      state.status = 'completed'
      state.error = action.null
      state.images.push(...action.payload.images)
      state.page = action.payload.page
    })
  }
})

export default followeesImageSlice.reducer