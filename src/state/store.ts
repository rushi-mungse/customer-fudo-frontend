import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import otpInfoReducer from "./slices/otpInfo";
import authReducer from "./slices/auth";

export const store = configureStore({
    reducer: { otpInfoReducer, authReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
