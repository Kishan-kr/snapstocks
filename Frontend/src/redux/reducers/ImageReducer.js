import { createSlice } from "@reduxjs/toolkit";
import { getLatestImages } from "../actions/ImageAction";

const initialState = {
  images: [],
  page: 0,
  status: 'idle', // idle | pending | failed | completed | pending_next
  error: null
}
const imageSlice = createSlice({
  name: 'images',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLatestImages.pending, (state) => {
      
      state.status = state.page ? 'pending_next' : 'pending'
      state.error = null
    })
    builder.addCase(getLatestImages.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(getLatestImages.fulfilled, (state, action) => {
      state.status = 'completed'
      state.error = action.null
      state.images.push(action.payload.images)
      state.page = action.payload.page
    })
  }
})

export default imageSlice.reducer