import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import otpReducer from "./slices/otp";
import authReducer from "./slices/auth";

export const store = configureStore({
    reducer: { otpReducer, authReducer },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

import { setOtp, clearOtp } from "./slices/otp";
import { setAuth, clearAuth } from "./slices/auth";

export {
    setOtp,
    clearOtp,
    setAuth,
    clearAuth,
    type AppDispatch,
    type RootState,
    type AppThunk,
};
