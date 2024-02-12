import { configureStore } from '@reduxjs/toolkit'
import sidebarSlice from './sidebarSlice/sidebarSlice'
import userSlice from './userSlice/userSlice'

const store = configureStore({
    reducer: {
        sidebarSlice,
        userSlice
    }
})

export default store