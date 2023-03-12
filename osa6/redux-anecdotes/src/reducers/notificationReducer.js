import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      state = content
      return state
    },
    clearNotification(state, action) {
      state = ''
      return state
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer