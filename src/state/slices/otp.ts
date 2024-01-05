import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OtpDataType } from "../../types";

interface InitialStateType {
    otp: OtpDataType | null;
}
const initialState: InitialStateType = { otp: null };

export const otpSlice = createSlice({
    name: "otp",

    initialState,

    reducers: {
        setOtp: (state, action: PayloadAction<OtpDataType>) => {
            const data = action.payload;
            state.otp = data;
        },

        clearOtp: (state) => {
            state.otp = null;
        },
    },
});

export const { setOtp, clearOtp } = otpSlice.actions;
export default otpSlice.reducer;
