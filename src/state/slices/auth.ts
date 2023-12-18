import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../../types";

interface IInitialState {
    isAuth: boolean;
    user: IUserData | null;
}

const initialState: IInitialState = {
    isAuth: false,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<IUserData>) => {
            const user = action.payload;
            state.user = user;
            state.isAuth = user ? true : false;
        },
    },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
