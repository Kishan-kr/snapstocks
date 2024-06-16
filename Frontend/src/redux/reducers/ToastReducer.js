import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOn: false,
  message: '',
  type: '' // success | error | info
}

const toastSlice = createSlice({
  initialState,
  name: 'Toast',
  reducers: {
    showToast: (state, action) => {
      state.isOn = true
      state.message = action.payload.message
      state.type = action.payload.type || 'info'
    },
    resetToast: _ => {
      return initialState
    }
  }
})

export const {showToast, resetToast } = toastSlice.actions
export default toastSlice.reducer