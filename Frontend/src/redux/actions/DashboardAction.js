import { createAsyncThunk } from "@reduxjs/toolkit";

export const getImages = createAsyncThunk('dashboard/getImages', 
  async ({userid, page, items}, {rejectWithValue}) => {
    const params = new URLSearchParams()
    if (page)
      params.append('page', page || 1)
    if (items) {
      params.append('items', items || 18)
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/images/users/${userid}?${params}`)
      const responseData = await response.json()

      if(!response.ok) {
        const error = responseData?.error || response.statusText;
        throw new Error(Array.isArray(error) ? error[0].msg : error)
      }
      
      return {images: responseData.data, page: page || 1}

    } catch (error) {
      console.error("Error while getting user images: ", error.message)
      return rejectWithValue(error.message)
    }
  }
)

export const getLikedImages = createAsyncThunk('dashboard/getLikedImages', 
  async ({userid, page, items}, {rejectWithValue}) => {
    const params = new URLSearchParams()
    if (page)
      params.append('page', page || 1)
    if (items) {
      params.append('items', items || 18)
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/images/users/${userid}/likes?${params}`)
      const responseData = await response.json()
  
      if(!response.ok) {
        const error = responseData?.error || response.statusText;
        throw new Error(Array.isArray(error) ? error[0].msg : error)
      }
      
      return {images: responseData.data, page: page || 1}

    } catch (error) {
      console.error("Error while getting user images: ", error.message)
      return rejectWithValue(error.message)
    }
  }
)

export const getUserCollections = createAsyncThunk('dashboard/getUserCollections', 
  async ({userid, page, items}, {rejectWithValue}) => {
    // const params = new URLSearchParams()
    // if (page)
    //   params.append('page', page || 1)
    // if (items) {
    //   params.append('items', items || 18)
    // }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/collections/users/${userid}`)
      const responseData = await response.json()
  
      if(!response.ok) {
        const error = responseData?.error || response.statusText;
        throw new Error(Array.isArray(error) ? error[0].msg : error)
      }
      
      return {images: responseData.data, page: page || 1}

    } catch (error) {
      console.error("Error while getting user images: ", error.message)
      return rejectWithValue(error.message)
    }
  }
)