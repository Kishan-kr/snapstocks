import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './reducers/UserReducer'
import ToastReducer from './reducers/ToastReducer'
import ImageReducer from './reducers/ImageReducer'

const store = configureStore({
  reducer: {
    user: UserReducer,
    toast: ToastReducer,
    images: ImageReducer
  }
})

export default store