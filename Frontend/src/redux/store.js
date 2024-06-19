import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './reducers/UserReducer'
import ToastReducer from './reducers/ToastReducer'
import ImageReducer from './reducers/ImageReducer'
import FolloweesImageReducer from './reducers/FolloweesImageReducer'
import DashboardReducer from './reducers/DashboardReducer'

const store = configureStore({
  reducer: {
    user: UserReducer,
    toast: ToastReducer,
    images: ImageReducer,
    followeesImages: FolloweesImageReducer,
    dashboard: DashboardReducer
  }
})

export default store