import {createSlice} from '@reduxjs/toolkit' 
import { login, signup } from '../actions/UserActions'

const initialState = {
  name: '',
  username: '',
  email: '',
  profilePic: '',
  loggedIn: false,
  status: 'idle', // idle | pending | failed | completed
  error: null
}

const userSlice = createSlice({
  initialState: initialState,
  name: 'User',
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.username = action.payload.username
    },

    updateLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, state => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(signup.fulfilled, state => {
      state.status = 'completed'
      state.error = null
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    })

    builder.addCase(login.pending, state => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'completed'
      state.name = action.payload.name
      state.email = action.payload.email
      state.profilePic = action.payload.profilePic
      state.loggedIn = true
      state.username = action.payload.username
      state.error = null
    })
  }
})

export const { updateUser, updateLoggedIn } = userSlice.actions

export default userSlice.reducer