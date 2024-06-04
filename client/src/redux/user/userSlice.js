import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error : null,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        loginStart : (state) => {
            state.loading = true
            state.error = null
        },
        loginSucess : (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        loginFailure : (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout : (state) => {
            state.currentUser = null
            state.error = null
            state.loading = false
        },
        deleteStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        deleteSuccess:(state)=>{
            state.currentUser = null
            state.loading = false,
            state.error = null
        },
        deleteFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        updateStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        updateSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        updateFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },

    }
})

export const {loginStart, loginSucess, loginFailure, logout , deleteStart, deleteSuccess, deleteFailure , updateStart, updateSuccess, updateFailure} = userSlice.actions
export default userSlice.reducer
