import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    reducers: {
        setUser: (state, action) => action.payload,
        userLoggedOut: (state, action) => initialState,
    },
    extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
