import { createSlice } from "@reduxjs/toolkit";
import { getImages, getLikedImages, getUserCollections } from "../actions/DashboardAction";

const initialState = {
  userid: '',
  images: {
    data : [],
    totalCount: 0,
    page: 0,
    status: 'idle', // pending || failed || completed || pending_next
    error: null
  },
  likedImages: {
    data : [],
    totalCount: 0,
    page: 0,
    status: 'idle', // pending || failed || completed || pending_next
    error: null
  },
  collections: {
    data : [],
    totalCount: 0,
    page: 0,
    status: 'idle', // pending || failed || completed 
    error: null
  },
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getImages.pending, (state) => {
      state.images.status = state.images.page > 0 ? 'pending_next' : 'pending'
      state.images.error = null
    })
    builder.addCase(getImages.rejected, (state, action) => {
      state.images.status = 'failed'
      state.images.error = action.payload
    })
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.images.status = 'completed'
      state.images.data = action.payload.images
      state.images.page = action.payload.page
    })

    builder.addCase(getLikedImages.pending, (state) => {
      state.likedImages.status = 'pending'
      state.likedImages.error = null
    })
    builder.addCase(getLikedImages.rejected, (state, action) => {
      state.likedImages.status = 'failed'
      state.likedImages.error = action.payload
    })
    builder.addCase(getLikedImages.fulfilled, (state, action) => {
      state.likedImages.status = 'completed'
      state.likedImages.data = action.payload.images
      state.likedImages.page = action.payload.page
    })

    builder.addCase(getUserCollections.pending, (state) => {
      state.collections.status = 'pending'
      state.collections.error = null
    })
    builder.addCase(getUserCollections.rejected, (state, action) => {
      state.collections.status = 'failed'
      state.collections.error = action.payload
    })
    builder.addCase(getUserCollections.fulfilled, (state, action) => {
      state.collections.status = 'completed'
      state.collections.data = action.payload.images
      state.collections.page = action.payload.page
    })
  }
})

export default dashboardSlice.reducer