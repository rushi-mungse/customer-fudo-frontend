import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "../../types";

interface InitialStateType {
    isAuth: boolean;
    user: UserDataType | null;
}

const initialState: InitialStateType = {
    isAuth: false,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setAuth: (state, action: PayloadAction<UserDataType>) => {
            const user = action.payload;
            state.user = user;
            state.isAuth = user ? true : false;
        },

        clearAuth: (state) => {
            state.user = null;
            state.isAuth = false;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
