import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationText(state, action) {
      const content = action.payload
      
      return content
    },
    clearNotification(state, action) {
      return ''
    }
  }
}) 

export const { setNotificationText, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(setNotificationText(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time*1000)
    }
}
export default notificationSlice.reducer