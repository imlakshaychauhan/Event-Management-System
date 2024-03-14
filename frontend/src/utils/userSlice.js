import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn:  localStorage.getItem("token") ? true : false,
        loginError: null
    },
    reducers: {
        setIsLoggedInTrue: (state) => {
            // Update isLoggedIn to true
            return { ...state, isLoggedIn: true };
        },
        setIsLoggedInFalse: (state) => {
            // Update isLoggedIn to true
            return { ...state, isLoggedIn: false };
        },
        setLoginError: (state, action) => {
            return { ...state, loginError: action.payload }; // Set loginError to the payload
        },
        clearLoginError: (state) => {
            return { ...state, loginError: null }; // Clear loginError
        },
    }
});

export const { setIsLoggedInTrue, setIsLoggedInFalse, setLoginError, clearLoginError } = userSlice.actions;

export default userSlice.reducer;