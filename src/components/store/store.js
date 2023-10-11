import { configureStore } from "@reduxjs/toolkit"

import taskReducer from '../todo/TodoSlice';

const store = configureStore({
    reducer:{
tasks: taskReducer
    }
})

export default store;